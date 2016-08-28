import React, { Component } from 'react';
import ajax from 'superagent';
import { IndexLink, Link } from 'react-router';
class repos extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'forks',
      commits:[],
      forks:[],
      pulls:[]

    };
  }
  componentWillMount(){
    this.fetchAPI('commits');
    this.fetchAPI('pulls');
    this.fetchAPI('forks');

  }
  fetchAPI(type){
    const baseURL = 'https://api.github.com/repos/facebook'
    ajax.get(`${baseURL}/${this.props.params.repo}/${type}`)
        .end((err,reponse) => {
          console.dir(reponse.body);
          if (reponse){
              this.setState({
              [type]:reponse.body
            });
          } else {
            console.log(err);
            console.log('error with github with ${type}');
          }
        });
  }
  showCommits(){
    this.setState({
      mode:'commits'
    });
    console.log("set commits");
  }
  showForks(){
    this.setState({
      mode:'forks'
    });
    console.log("set forks");

  }
  showPulls(){
    this.setState({
      mode:'pulls'
    });
    console.log("set pulls");

  }
  renderCommits(){
    return this.state.commits.map(function(commit,index){
      const author = commit.author ? commit.author.login : 'Anonymous';
      return (
        <p key={index}>
          <Link to={`/user/${author}`}>{author}</Link>
          <a href={commit.html_url}>{commit.commit.message}</a>
        </p>
      );
    })
  }
  renderForks(){
    return this.state.forks.map(function(fork,index){
      const owner = fork.owner ? fork.owner.login : 'Anonymous';
      return (
        <p key={index}>
          <Link to={`/user/${owner}`}>{owner}</Link>:forked to
          <a href={fork.html_url}>{fork.html_url}</a>at:{fork.created_at}
        </p>
      );
    })
  }
  renderPulls(){
    return this.state.pulls.map(function(pull,index){
      const user = pull.user ? pull.user.login : 'Anonymous';
      return (
        <p key={index}>
          <Link to={`/user/${user}`}>{user}</Link>
          <a href={pull.html_url}>{pull.body}</a>
        </p>
      );
    })
  }
  selectorMode(e){
    this.setState({
      mode:e.currentTarget.dataset.mode
    });
  }
  render() {
      let content;
      if (this.state.mode === 'commits') {
          content = this.renderCommits();
        } else if (this.state.mode === 'forks') {
          content = this.renderForks();
        } else {
            content = this.renderPulls();
        }
    return (
      <div>
        <p><IndexLink to="/" activeClassName="active">Home</IndexLink> > {this.props.params.repo}</p>
        <button onClick={this.selectorMode.bind(this)} data-mode="commits">Show Commits</button>
        <button onClick={this.selectorMode.bind(this)} data-mode="forks">Show Forks</button>
        <button onClick={this.selectorMode.bind(this)} data-mode="pulls">Show Pulls</button>
        {content}
      </div>
    );
  }
}

export default repos;
