import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  template: `
    <div class="row text-center">
      <div class="col">
        <button mat-raised-button routerLink="/dashboard">סטטיסטיקות</button>
      </div>
      <div class="col">
        <button mat-raised-button routerLink="/dashboard/posts">פוסטים</button>
      </div>
      <div class="col">
        <button mat-raised-button routerLink="/dashboard/store">חנות</button>
      </div>
      <div class="col">
        <button mat-raised-button routerLink="/dashboard/settings">
          הגדרות בלוג
        </button>
      </div>
    </div>
  `,
})
export class DashboardNavComponent {}
