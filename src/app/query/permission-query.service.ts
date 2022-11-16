import { inject, Injectable } from '@angular/core';
import { filterSuccess, QueryClientService, UseQuery } from '@ngneat/query';
import { map, switchMap } from 'rxjs';
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
