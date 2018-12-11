import React, { Component } from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from 'store/modules/post';

class PostContainer extends Component {

  initialize = async () => {
    const {PostActions, id} = this.props;

    try {
      await PostActions.getPost(id);
    } catch(e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const {post} = this.props;
    console.log(post);
    return (
      <div>
        <PostInfo/>
        <PostBody/>
      </div>
    );
  }

}

export default connect(
  (state) => ({
    post: state.post,
    loading: state.pender.pending['post/GET_POST']
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(PostContainer);
