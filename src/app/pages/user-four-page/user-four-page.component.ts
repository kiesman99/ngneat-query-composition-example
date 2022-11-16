import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SubscribeModule } from '@ngneat/subscribe';
import { PermissionQueryService } from '../../query/permission-query.service';
import { UserQueryService } from '../../query/user-query.service';

@Component({
  selector: 'app-user-four-page',
  standalone: true,
  imports: [CommonModule, SubscribeModule],
  templateUrl: './user-four-page.component.html',
})
export class UserFourPageComponent implements OnInit {
  private userQueryService = inject(UserQueryService);
  private permissionQueryService = inject(PermissionQueryService);

  user$ = this.userQueryService.getCurrentUser('my-id').result$;

  userPermissions$ =
    this.permissionQueryService.permissionsOfUser4('my-id').result$;

  constructor() {}

  ngOnInit() {}
}
