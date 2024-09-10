import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { GithubCommitsHttpResponse, GithubRepoHttpResponse } from '../models/repos.interface';
import { GITHUB_API_USERNAME } from '../local.settings';

@Injectable({
  providedIn: 'root'
})
export class GithubHttpService {

  private _http = inject(HttpClient);

  getGithubRepos(): Observable<GithubRepoHttpResponse[]> {    
    return this._http.get<GithubRepoHttpResponse[]>(`https://api.github.com/users/${GITHUB_API_USERNAME}/repos`).pipe(
      catchError(err => {
        console.error('Error fetching Github repos', err);
        return throwError(() => err);
      })
    );
  }

  getGithubCommitsFromRepo(repoName: string): Observable<GithubCommitsHttpResponse[]> {
    return this._http.get<GithubCommitsHttpResponse[]>(`https://api.github.com/repos/${GITHUB_API_USERNAME}/${repoName}/commits`).pipe(
      catchError(err => {
        console.error('Error fetching Github commits', err);
        return throwError(() => err);
      })
    );
  }
}
