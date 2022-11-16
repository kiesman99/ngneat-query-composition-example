import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SubscribeModule } from '@ngneat/subscribe';
import { Permission } from '../../models/permission.model';
import { PermissionQueryService } from '../../query/permission-query.service';
import { UserQueryService } from '../../query/user-query.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, SubscribeModule],
  templateUrl: './user-page.component.html',
})
export class UserPageComponent {
  private userQueryService = inject(UserQueryService);
  private permissionQueryService = inject(PermissionQueryService);

  user$ = this.userQueryService.getCurrentUser('my-id').result$;

  permissions$ = this.permissionQueryService.getAllPermissions().result$;

  permissionById(
    permissions?: Permission[],
    id?: string
  ): Permission | undefined {
    if (!permissions || !id) {
      return undefined;
    }
    return permissions.find((permission) => permission.id === id);
  }
}
