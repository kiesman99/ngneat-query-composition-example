import { inject, Injectable } from '@angular/core';
import { UseQuery } from '@ngneat/query';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserQueryService {
  private userService = inject(UserService);
  private useQuery = inject(UseQuery);

  getCurrentUser(userId: string) {
    return this.useQuery(['user', userId], () => {
      return this.userService.getCurrentUser();
    });
  }
}
