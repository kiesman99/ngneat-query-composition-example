import { inject, Injectable } from '@angular/core';
import { QueryClientService, UseQuery } from '@ngneat/query';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionQueryService {
  private permissionService = inject(PermissionService);
  private useQuery = inject(UseQuery);

  getAllPermissions() {
    return this.useQuery(['permissions'], () => {
      return this.permissionService.loadAllPermissions();
    });
  }
}
