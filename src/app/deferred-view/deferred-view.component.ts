import { Component, inject, OnInit, signal } from '@angular/core';
import { GithubCardComponent } from '../components/github-card/github-card.component';
import { GithubHttpService } from '../services/github-http.service';
import { GithubRepoHttpResponse } from '../models/repos.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-deferred-view',
  standalone: true,
  imports: [GithubCardComponent],
  template:`
    <div class="container">
      @for (repo of reposS(); track $index) {
        @defer(on viewport) {
          <div class="card-container">
            <app-github-card [repoS]="repo"></app-github-card>
          </div>
        } @placeholder {
          <span>Loading...</span>
        }
      }
    </div>
  `,
  styles: `
  .container {
    height: calc(100vh - 6rem);
  }
  .card-container {
      margin: 1rem;      
    }
  `
})
export class DeferredViewComponent implements OnInit {
  private _githubSvc = inject(GithubHttpService);
  reposS = signal<GithubRepoHttpResponse[]>([]);

  ngOnInit(): void {
    this._githubSvc.getGithubRepos().pipe(take(1)).subscribe(repos => {
      this.reposS.set(repos);
    });
  }
}
