import { inject, Injectable } from '@angular/core';
import { QueryClientService, UseQuery } from '@ngneat/query';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserQueryService {
  private userService = inject(UserService);
  private useQuery = inject(UseQuery);

  getCurrentUser() {
    return this.useQuery(['user'], () => {
      return this.userService.getCurrentUser();
    });
  }
}
