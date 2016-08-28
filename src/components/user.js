import React, { Component } from 'react';
import ajax from 'superagent';
import { IndexLink, Link } from 'react-router';
class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      events:[]
    };
  }
  componentWillMount(){
    ajax.get(`https://api.github.com/users/${this.props.params.user}/events`)
        .end((err,res) => {
          if (res) {
            this.setState({
              events:res.body
            });
          } else {
            console.log('error with github',err);
          }
        })
  }
  render() {
    return (
      <div>
        <p><IndexLink to="/" activeClassName="active">Home</IndexLink> > User</p>
        <ul>
        {this.state.events.map(function(event,index){
          const eventType = event.type;
          const repoName = event.repo.name;
          const timeCreate = event.created_at;
          return (
            <li key={index}>
              <strong>{repoName}</strong>:{eventType}
              at {timeCreate}
            </li>
          );
        })}
        </ul>
      </div>
    )
  }
}
User.propTypes = {
  params: React.PropTypes.object,
}
export default User;
