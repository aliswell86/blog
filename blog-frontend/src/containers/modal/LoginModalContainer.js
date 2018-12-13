import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
import LoginModal from 'components/modal/LoginModal';

class LoginModalContainer extends Component {

  handleCancel = () => {
    const {BaseActions} = this.props;
    BaseActions.hideModal('login');
  }

  handleChange = (e) => {
    const {value} = e.target;
    const {BaseActions} = this.props;
    BaseActions.changePasswordInput(value);
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleLogin()
    }
  }

  handleLogin = async () => {
    const {BaseActions, password} = this.props;

    try {
      await BaseActions.login(password);
      BaseActions.hideModal('login');
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const {visible, error, password} = this.props;
    const {handleCancel, handleChange, handleKeyPress, handleLogin} = this;

    return (
      <LoginModal
        visible={visible}
        onCancel={handleCancel}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onLogin={handleLogin}
        error={error}
        password={password}/>
    );
  }

}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'login']),
    password: state.base.getIn(['loginModal', 'password']),
    error: state.base.getIn(['loginModal', 'error'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(LoginModalContainer);
