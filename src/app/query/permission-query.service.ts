import { inject, Injectable } from '@angular/core';
import { filterSuccess, QueryClientService, UseQuery } from '@ngneat/query';
import {
  combineLatest,
  filter,
  map,
  skipWhile,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { combineLatestWith } from 'rxjs/operators';
import { Permission } from '../models/permission.model';
import { PermissionService } from '../services/permission.service';
import { UserService } from '../services/user.service';
import { UserQueryService } from './user-query.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionQueryService {
  private permissionService = inject(PermissionService);
  private userService = inject(UserService);
  private useQuery = inject(UseQuery);

  private userQueryService = inject(UserQueryService);

  getAllPermissions() {
    return this.useQuery(['permissions'], () => {
      return this.permissionService.loadAllPermissions();
    });
  }

  // no isLoading, isError available
  permissionsOfUser1(userId: string) {
    return this.userQueryService.getCurrentUser(userId).result$.pipe(
      filterSuccess(),
      map((query) => query.data),
      switchMap((user) =>
        this.getAllPermissions().result$.pipe(
          filterSuccess(),
          map((query) => query.data),
          map((permissions) => {
            return user.permissionIds.reduce((acc, curr) => {
              const permission = permissions.find((perm) => perm.id === curr);
              if (permission) {
                return [...acc, permission];
              }

              return acc;
            }, [] as Permission[]);
          })
        )
      )
    );
  }

  // duplicate all permissions and current user in store
  // make use of UserService in PermissionQueryService
  permissionsOfUser2(userId: string) {
    return this.useQuery({
      queryKey: ['permissions-of-user', userId],
      queryFn: () => {
        return this.permissionService
          .loadAllPermissions()
          .pipe(
            switchMap((permissions) =>
              this.userService
                .getCurrentUser()
                .pipe(
                  map((user) =>
                    this.resolvePermissions(permissions, user.permissionIds)
                  )
                )
            )
          );
      },
    });
  }

  // does currently not work. Do not inspect this one :D
  permissionsOfUser4(userId: string) {
    return this.useQuery(['permissions-of-user', 3, userId], () => {
      return this.userQueryService.getCurrentUser(userId).result$.pipe(
        combineLatestWith(this.getAllPermissions().result$),
        tap(console.log),
        map(([userQuery, permissionsQuery]) => {
          const isLoading = userQuery.isLoading || permissionsQuery.isLoading;
          const isError = userQuery.isError || permissionsQuery.isError;
          const isFetched = userQuery.isFetched && permissionsQuery.isFetched;

          return {
            isLoading,
            isError,
            isFetched,
            data: !isFetched
              ? undefined
              : this.resolvePermissions(
                  permissionsQuery.data,
                  userQuery.data.permissionIds
                ),
          };
        })
      );
      return combineLatest({
        userQuery: this.userQueryService.getCurrentUser(userId).result$,
        permissionsQuery: this.getAllPermissions().result$,
      }).pipe(
        tap(console.log),
        map(({ userQuery, permissionsQuery }) => {
          return {
            isLoading: userQuery.isLoading || permissionsQuery.isLoading,
            isError: userQuery.isError || permissionsQuery.isError,
            isFetched: userQuery.isFetched && permissionsQuery.isFetched,
            data: this.resolvePermissions(
              permissionsQuery.data,
              userQuery.data.permissionIds
            ),
          };
        })
      );
    });
  }

  private resolvePermissions(
    permissions?: Permission[],
    ids?: string[]
  ): Permission[] {
    if (!permissions || !ids) {
      return [];
    }
    return ids.map((id) => permissions.find((perm) => perm.id === id));
  }
}
