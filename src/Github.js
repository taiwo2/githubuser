import React, {Component} from "react";
export default class GitHubSearch extends React.Component {
  constructor(props){ 
    super(props); 
    this.refs = React.createRef()
     this.state = { 
      username: '',
      userrepo: '',
     };
  }

  getUser(username) {
     return fetch(`https://api.github.com/users/${username}`)
     .then(response => response.json())
     .then(response => {
       return response;
      })
 }

  getUserRepo(userrepo) {
    return fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(response => {
     return response;
   })
 }

  async handleSubmit(e) {
      e.preventDefault();
      let user = await this.getUser(this.refs.username.value);
      this.setState({ avatar_url: user.avatar_url,
      username: user.login,
      followers: user.followers,
      following: user.following,
       url: user.url,
  });

let repo = await this.getUserRepo(this.refs.username.value);
this.setState({ name: repo.name,
description: repo.description,
git_url: repo.git_url,
stargazers_count: repo.stargazers_count,
forks_count: repo.forks_count,
open_issues_count: repo.open_issues_count,
size: repo.size,

})

}

render() {
  let user;
  if(this.state.username) {
     user = 
     <div className="resultBadge">
       <div className="App">
      <table>
        <tbody>
        <tr>
          <th>Username</th>
          {/* <th>users</th> */}
          <th>Followers</th>
        </tr>
        <tr>
          <td> {this.state.username}</td>
          {/* <td> {this.state.name}</td> */}
          <td> {this.state.followers} </td>
        </tr>
        </tbody>
      </table>
    </div>
       {/* <img src={this.state.avatar_url}/>
       <p className="userInfo">
        Username: <br/>
        {this.state.username} 
       </p> 
       <p className="followerInfo">
        {this.state.followers} Followers
       </p>
       <p className="followingInfo">
         Following {this.state.following} users
       </p> */}
     </div>
 }

 let repo;
   if(this.state.userrepo) {
      repo =
        <div className="repoResults">
           <p>
             {this.state.name}
          </p>
        </div>
    }

      return (
         <div className="GitHubSearch">
           <header className="Search-header">
             <h1>Github User Search </h1>
           </header>
           <form onSubmit={e => this.handleSubmit(e)}>
              <input ref='username' type='text' placeholder='username' />
          </form>
          <div className="Search-intro">
             {user}
          </div>
 <p>
   {repo}
  </p>
 </div>
);
}
}