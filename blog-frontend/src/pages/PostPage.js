import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import AskRemoveModalContainer from 'containers/modal/AskRemoveModalContainer';
import PostContainer from 'containers/post/PostContainer';

const PostPage = ({match}) => {
  const {id} = match.params;
  return (
    <PageTemplate>
      <PostContainer id={id}/>
      <AskRemoveModalContainer/>
    </PageTemplate>
  );
};

export default PostPage;
