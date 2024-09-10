export interface GithubRepoHttpResponse {
  id: number;
  name: string;
  commits_url: string;
}

export interface GithubCommitsHttpResponse {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    },
    message: string;
  }
}