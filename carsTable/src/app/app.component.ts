import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';

/**
 * The component is responsible for navigation and the download indicator.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  /**
   * Does the resolver load.
   */
  public loading: boolean;

  /**
   * Navigation links.
   */
  public navLinks = [
    { path: '/table', label: 'Table' },
    { path: '/formCar', label: 'Car Form' },
    { path: '/login', label: 'login' },
  ];

  /**
   * At the Navigation start show loading when the resolver loads data hide loading.
   *
   * @param router Angular router.
   * @param router.events Events navigation.
   */
  public constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

  }

}
