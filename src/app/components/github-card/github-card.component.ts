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
         }
        </ul>  
      </div>
    </div>
  `,
  styles: `
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
