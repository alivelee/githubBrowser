import React from 'react';
class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Github Browser</h1>
        {this.props.children}
      </div>
    )
  }
}
Main.propTypes = {
  children:React.PropTypes.node
}
export default Main;
