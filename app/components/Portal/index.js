import React from 'react';
import ReactDOM from 'react-dom';

class Portal extends React.Component {
  componentDidMount() {
    this.popup = document.createElement('div');
    document.body.appendChild(this.popup);
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
  }

  renderLayer() {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.props.children, this.popup);
  }

  render() {
    return null;
  }
}

export default Portal;
