import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Permission } from '../models/permission.model';

const permissions: Permission[] = [
  { id: '1', name: 'admin' },
  { id: '2', name: 'read' },
  { id: '3', name: 'write' },
  { id: '4', name: 'bulk' },
];

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  loadAllPermissions() {
    return of(permissions).pipe(delay(4000));
  }
}
