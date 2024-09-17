import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject, OnInit, signal } from '@angular/core';
import { take } from 'rxjs';
import { GithubCardComponent } from '../components/github-card/github-card.component';
import { GithubRepoHttpResponse } from '../models/repos.interface';
import { GithubHttpService } from '../services/github-http.service';

@Component({
  selector: 'app-virtual-scroll',
  standalone: true,
  imports: [GithubCardComponent, ScrollingModule],
  template:`
  <div class="container">
  <cdk-virtual-scroll-viewport itemSize="150" class="viewport">
      <div class="card-container" *cdkVirtualFor="let repo of reposS()">
        <app-github-card [repoS]="repo"></app-github-card>
      </div>
  </cdk-virtual-scroll-viewport>
  </div>
    
  `,
  styles: `
  .container {
    height: calc(100vh - 6rem);
  }
    .card-container {
      margin: 1rem;      
    }
    .viewport {
      height: 100%;
    }
  `
})
export class VirtualScrollComponent implements OnInit {
  
  private _githubSvc = inject(GithubHttpService);
  reposS = signal<GithubRepoHttpResponse[]>([]);

  ngOnInit(): void {
    this._githubSvc.getGithubRepos().pipe(take(1)).subscribe(repos => {
      this.reposS.set(repos);
    });
  }

}
