import { inject, Injectable } from '@angular/core';
import { filterSuccess, QueryClientService, UseQuery } from '@ngneat/query';
import { map, switchMap } from 'rxjs';
import { Permission } from '../models/permission.model';
import { PermissionService } from '../services/permission.service';
import { UserQueryService } from './user-query.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionQueryService {
  private permissionService = inject(PermissionService);
  private useQuery = inject(UseQuery);

  private userQueryService = inject(UserQueryService);

  getAllPermissions() {
    return this.useQuery(['permissions'], () => {
      return this.permissionService.loadAllPermissions();
    });
  }

  // no isLoading, isError available
  permissionsOfUser(userId: string) {
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

}
