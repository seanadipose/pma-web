import { Component } from '@angular/core';

@Component({
  selector: 'pma-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <pma-navigation>
      <router-outlet></router-outlet>
    </pma-navigation>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Progressive Mental Alignment';
}
