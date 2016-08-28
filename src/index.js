import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router';
import Repos from './components/repos';
import List from './components/list';
import Main from './components/main';
import User from './components/user';
import './styles/index.css';
ReactDOM.render(
  <Router
    history={browserHistory}
    onUpdate={()=>window.scrollTo(0,0)}
  >
    <Route path="/" component={Main}>
      <IndexRoute component={List} />
      <Route path="/repos/:repo" component={Repos} />
      <Route path="/user/:user" component={User} />
    </Route>
  </Router>,
  document.getElementById('root')
);
