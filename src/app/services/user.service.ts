import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { User } from '../models/user.model';

const currentUser: User = {
  username: 'johndoe',
  permissionIds: ['2', '4'],
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getCurrentUser() {
    return of(currentUser).pipe(delay(2000));
  }
}
