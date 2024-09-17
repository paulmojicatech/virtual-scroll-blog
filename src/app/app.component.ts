import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GithubCardComponent } from './components/github-card/github-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, GithubCardComponent],
  template: `
    <header class="header">
      <h1>Paul Mojica Technologies</h1>
      <nav>
        <ul>
          <li><a routerLinkActive="active" routerLink="/no-virtualization">No Virtualization</a></li>
          <li><a routerLinkActive="active" routerLink="/virtual-scroll">Virtual Scroll</a></li>
          <li><a routerLinkActive="active" routerLink="/deferred-view">Deferred View</a></li>
        </ul>
      </nav>
    </header>    
    <router-outlet></router-outlet>
  `,
  styles: `
    header {
      h1 {
        margin-left: 1rem;
      }
      nav {
        margin-right: 1rem;
      }
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    nav {
      ul {
        list-style: none;
        display: inline-flex;
        li {
          padding: 0 1rem;
        }
        a {
          color: #45b6fe;
          text-decoration: underline;          
          &.active {
            color: #8fd3fe;
            cursor: initial;
          }
        }
      }
    }
  `
})
export class AppComponent {
  
}
