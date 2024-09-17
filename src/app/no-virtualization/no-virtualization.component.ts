import { Component, inject, OnInit, signal } from '@angular/core';
import { GithubHttpService } from '../services/github-http.service';
import { GithubRepoHttpResponse } from '../models/repos.interface';
import { GithubCardComponent } from '../components/github-card/github-card.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-no-virtualization',
  standalone: true,
  imports: [GithubCardComponent],
  template: `
    <div class="cards-container">
      @for(repo of reposS(); track $index) {
        <div class="card-container">
        <app-github-card [repoS]="repo"></app-github-card>
        </div>        
      }
    </div>
  `,
  styles: `
    .card-container {
      margin: 1rem;
    }
  `
})
export class NoVirtualizationComponent implements OnInit {
  private _githubSvc = inject(GithubHttpService);
  reposS = signal<GithubRepoHttpResponse[]>([]);

  ngOnInit(): void {
    this._githubSvc.getGithubRepos().pipe(take(1)).subscribe(repos => {
      this.reposS.set(repos);
    });
  }

}
