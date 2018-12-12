import React, { Component } from 'react';
import AskRemoveModal from 'components/modal/AskRemoveModal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';

class AskRemoveModalContainer extends Component {

  render() {
    const {visible} = this.props;
    
    return (
      <AskRemoveModal visible={visible}/>
    );
  }

}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'remove'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(AskRemoveModalContainer);
