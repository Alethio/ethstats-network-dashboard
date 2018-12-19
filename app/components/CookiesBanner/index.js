import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Accept from './Accept';
import Container from './Container';
import Content from './Content';
import Text from './Text';


class CookiesBanner extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
  };
  render() {
    return (
      <Container>
        <Content>
          <Text>
            By using this site, you agree to our use of cookies, which we use to analyse
            our traffic in accordance with our <Link to={'/privacy-policy'} target={'_blank'}> Privacy Policy</Link>. We also share information
            about your use of our site with our analytics partners.
          </Text>
          <Accept onClick={this.props.onClick}>Accept</Accept>
        </Content>
      </Container>
    );
  }
}


export default CookiesBanner;
