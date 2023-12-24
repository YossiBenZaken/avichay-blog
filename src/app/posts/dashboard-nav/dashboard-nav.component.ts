import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  template: `
    <div class="row text-center">
      <div class="col-md-3 col-6">
        <button mat-raised-button routerLink="/dashboard">סטטיסטיקות</button>
      </div>
      <div class="col-md-3 col-6">
        <button mat-raised-button routerLink="/dashboard/posts">פוסטים</button>
      </div>
      <div class="col-md-3 col-6 margin-mobile-top">
        <button mat-raised-button routerLink="/dashboard/settings">
          הגדרות בלוג
        </button>
      </div>
    </div>
  `,
  styles: [
    `
          @media (max-width: 450px) {
            .margin-mobile-top {
              margin-top: 1em;
            }
          }
        `,
  ],
})
export class DashboardNavComponent {}
