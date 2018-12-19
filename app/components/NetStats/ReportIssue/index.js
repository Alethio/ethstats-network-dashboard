import React from 'react';
import Container from 'components/ListYourNode/Container';
import IconContainer from './IconContainer';
import Icon from 'components/Icon';

export default class ReportIssue extends React.PureComponent {
  render() {
    return (
      <a target="_blank"
        href="https://github.com/Alethio/ethstats-cli/issues/new/choose"
        rel="noopener noreferrer"
        style={{
          marginRight: '16px',
        }}
      >
        <Container noMargin>
          <IconContainer>
            <Icon name="git" className="white-hover"/>
          </IconContainer>
          Report issue
        </Container>
      </a>
    );
  }
}
