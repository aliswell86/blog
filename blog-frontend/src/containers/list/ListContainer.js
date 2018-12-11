import React, { Component } from 'react';
import PostList from 'components/list/PostList';
import Pagination from 'components/list/Pagination';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from 'store/modules/list';

class ListContainer extends Component {

  getPostList = () => {
    const {tag, page, ListActions} = this.props;
    ListActions.getPostList({page, tag});
  }

  componentDidMount() {
    this.getPostList();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.page !== this.props.page || prevProps.tags !== this.props.tag) {
      this.getPostList();
      //스크롤바 맨위로
      document.documentElement.scrollTop = 0;
    }
  }

  render() {
    const {loading, posts, lastPage, page, tag} = this.props;
    if(loading) return null;

    return (
      <div>
        <PostList posts={posts}/>
        <Pagination page={page} tag={tag} lastPage={lastPage}/>
      </div>
    );
  }

}

export default connect(
  (state) => ({
    lastPage: state.list.get('lastPage'),
    posts: state.list.get('posts'),
    loading: state.pender.pending['list/GET_POST_LIST']
  }),
  (dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(ListContainer);
