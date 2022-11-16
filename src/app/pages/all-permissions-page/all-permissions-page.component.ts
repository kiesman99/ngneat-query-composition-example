import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SubscribeModule } from '@ngneat/subscribe';
import { PermissionQueryService } from '../../query/permission-query.service';

@Component({
  selector: 'app-all-permissions-page',
  standalone: true,
  imports: [CommonModule, SubscribeModule],
  templateUrl: './all-permissions-page.component.html',
})
export class AllPermissionsPageComponent {
  permissions$ = inject(PermissionQueryService).getAllPermissions().result$;
}
