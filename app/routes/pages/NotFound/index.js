import React from 'react';
import Container from './Container';
import { Link } from 'react-router';

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<Container className="page-not-found">
      <div className="text">There’s nothing here!
        <div>
          <Link to={'/'}>
            <button className="button not-found">Go to Homepage</button>
          </Link>
        </div>
      </div>
    </Container>);
  }
}
