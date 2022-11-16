import { Component, inject, VERSION } from '@angular/core';
import { QueryClientService } from '@ngneat/query';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private queryClient = inject(QueryClientService);

  invalidate() {
    alert('hello');
    const userId = 'my-id';
    this.queryClient.invalidateQueries(['permissions']);
    this.queryClient.invalidateQueries(['user', userId]);
  }
}
