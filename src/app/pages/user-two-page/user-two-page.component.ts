import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SubscribeModule } from '@ngneat/subscribe';
import { PermissionQueryService } from '../../query/permission-query.service';
import { UserQueryService } from '../../query/user-query.service';

@Component({
  selector: 'app-user-two-page',
  standalone: true,
  imports: [CommonModule, SubscribeModule],
  templateUrl: './user-two-page.component.html',
})
export class UserTwoPageComponent implements OnInit {
  private userQueryService = inject(UserQueryService);
  private permissionQueryService = inject(PermissionQueryService);

  user$ = this.userQueryService.getCurrentUser('my-id').result$;

  permissions$ = this.permissionQueryService.permissionsOfUser1('my-id');

  constructor() {}

  ngOnInit() {}
}
