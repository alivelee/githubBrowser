import React from 'react';
import { IndexLink, Link } from 'react-router';
class List extends React.Component {
  render() {
    return (
      <div>
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        <ul>
          <li><Link to="/repos/react">React Repos</Link></li>
          <li><Link to="/repos/react-native">React Native Repos</Link></li>
          <li><Link to="/repos/jest">Jest Repos</Link></li>
        </ul>
      </div>
    )
  }
}
List.propTypes = {
  params: React.PropTypes.object,
}
export default List;
