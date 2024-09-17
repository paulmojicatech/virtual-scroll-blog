import { Component, inject, input, OnInit, signal } from '@angular/core';
import { GithubCommitsHttpResponse, GithubRepoHttpResponse } from '../../models/repos.interface';
import { GithubHttpService } from '../../services/github-http.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-github-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <div class="card-header">
        <span>{{repoS().name}}</span>
      </div>
      <div class="card-body">      
        <ul>
         @for(commit of commitsS(); track $index) {
          <li>{{commit.commit.message}}</li>
         } @empty {
          <li>No commits found</li>
         }
        </ul>  
      </div>
    </div>
  `,
  styles: `
    .card {
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .card-header {
      font-size: 1.5em;
      padding: 10px;
      font-weight: bold;
      background-color: #f0f0f0f0;
    }
    .card-body {
      overflow: auto
    }
  `
})
export class GithubCardComponent implements OnInit {
  private _githubSvc = inject(GithubHttpService);

  repoS = input.required<GithubRepoHttpResponse>();
  commitsS = signal<GithubCommitsHttpResponse[]>([]);

  ngOnInit(): void {
    const repoName = this.repoS().name;
    this._githubSvc.getGithubCommitsFromRepo(repoName).pipe(take(1)).subscribe(commits => {
      this.commitsS.set(commits);
    })
  }
  
}
