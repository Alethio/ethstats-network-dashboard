import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { netstatsApiUrl } from 'utils/helpers';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import { hideConnectNodeModal as hideConnectNodeModalAction} from 'actions/global';
import Icon from 'components/Icon';
import Content from './Content';
import FlexRow from './FlexRow';
import CloseIconContainer from './CloseIconContainer';
import CloseIcon from './CloseIcon';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Subtitle from './Subtitle';
import Title from './Title';
import Text from './Text';
import Button from './Button';
import ErrorIcon from './ErrorIcon';

class ConnectNodeModal extends React.Component {
  constructor() {
    super();

    this.state = {
      gethMode: false,
      nodeName: '',
      email: '',
      success: null,
      apiError: null,
      nodeNameError: null,
      emailError: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }
  handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.props.hideConnectNodeModal();
    }
    if (event.keyCode === 13 && event.target.className.includes('connectNodeInput')) {
      this.handleSubmit();
    }
  };
  handleClickOutside = evt => {
    this.props.hideConnectNodeModal();
  };
  goGethMode = () => {
    this.setState(
      {
        gethMode: true,
      }
    );
  };
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit = event => {
    if (this.checkFields()) {
      const user = {
        nodeName: this.state.nodeName,
        accountEmail: this.state.email,
      };
      axios.post(`${netstatsApiUrl()}/nodes`, user)
        .then(res => {
          if (res.data.body.success) {
            this.setState({
              success: true,
              apiError: false,
              nodeNameError: false,
              emailError: false,
            });
          } else {
            this.setState({
              success: false,
              apiError: res.data.body.errors[0],
              nodeNameError: false,
              emailError: false,
            });
          }
        });
    }
  };
  checkFields() {
    if (this.state.nodeName && this.state.nodeName.length !== 0) {
      const nameRe = /^[a-zA-Z0-9-_]{3,64}$/;
      if (!nameRe.test(this.state.nodeName)) {
        this.setState({
          apiError: '',
          emailError: '',
          nodeNameError: 'Try renaming your node using letters (aA to zZ), digits and "-" or "_", to form a name of 3 to 64 characters.'
        });
        return false;
      }
      if (this.state.email && this.state.email.length !== 0) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.state.email)) {
          this.setState(
            {
              emailError: 'Please make sure you use a valid e-mail address.',
              nodeNameError: '',
              apiError: '',
            }
          );
          return false;
        } else {
          return true;
        }
      } else {
        this.setState(
          {
            emailError: 'Please enter your e-mail address.',
            nodeNameError: '',
            apiError: '',
          }
        );
        return false;
      }
    } else {
      this.setState(
        {
          nodeNameError: 'Please enter a name for your node.',
          emailError: '',
          apiError: '',
        }
      );
      return false;
    }
  }
  render() {
    return (
      <Content>
        <CloseIconContainer onClick={() => {this.props.hideConnectNodeModal();}}>
          <CloseIcon/>
        </CloseIconContainer>
        <LeftSection>
          <Subtitle>Option 1</Subtitle>
          <Title>Connect through<br/>EthstatsCli.</Title>
          <Text>This is a NodeJS application that creates a connection between EthStats and your Ethereum node, allowing us to extract and send data to our
            servers. Find out more <a href="https://github.com/Alethio/ethstats-cli" target="_blank" rel="noopener noreferrer">here</a> and download it using the link below:</Text>
          <div>
            <a href="https://www.npmjs.com/package/ethstats-cli"
               target="_blank"
               rel="noopener noreferrer"
            >
              <Button maxWidth="135px">Get EthtatsCli<Icon name="exit" className="rotated icon"/></Button>
            </a>
          </div>
        </LeftSection>
        <RightSection>
          <Subtitle>Option 2</Subtitle>
          <Title>Join EthStats using a<br/>Geth node</Title>
          {this.state.gethMode ?
            <div>
              <FlexRow>
                <input name="nodeName" className="connectNodeInput" placeholder="Node name" onChange={this.handleChange}/>
                { this.state.nodeNameError && <ErrorIcon><Icon name="error"/></ErrorIcon> }
              </FlexRow>
              <FlexRow>
                <input name="email" className="connectNodeInput lastOne" placeholder="Email" onChange={this.handleChange}/>
                { this.state.emailError && <ErrorIcon><Icon name="error"/></ErrorIcon> }
              </FlexRow>
              { this.state.success ?
                <Text className="no-padding">
                  Node was registered! You will receive an email with next steps.
                </Text> :
                <FlexRow>
                  <Button maxWidth="132px" minWidth="132px" onClick={this.handleSubmit}>Register node<Icon name="add_circle" className="icon"/></Button>
                  { this.state.nodeNameError && <Text className="error">{this.state.nodeNameError}</Text> }
                  { this.state.emailError && <Text className="error">{this.state.emailError}</Text> }
                  { this.state.apiError && <Text className="error">{this.state.apiError}</Text> }
                </FlexRow>
              }
            </div> :
            <div>
              <Text className="no-right-padding">If you are running a Geth Ethereum node, this is the reporting URL of an EthStats service (nodename:secret@host:port).<br/>To use this method you must first register your node on EthStats, to receive a secret access key.</Text>
              <Button maxWidth="155px" onClick={this.goGethMode}>Connect via Geth<Icon name="add_circle" className="icon"/></Button>
            </div>
          }
        </RightSection>
      </Content>
    );
  }
}

ConnectNodeModal.propTypes = {
  hideConnectNodeModal: PropTypes.func,
};


const mapDispatchToProps = (dispatch) => {
  return {
    hideConnectNodeModal: () => dispatch(hideConnectNodeModalAction()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(onClickOutside(ConnectNodeModal));
