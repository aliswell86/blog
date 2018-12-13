import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ListPage, PostPage, EditorPage, NotFountPage} from 'pages';
import BaseContainer from 'containers/common/BaseContainer';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ListPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/editor" component={EditorPage} />
        <Route component={NotFountPage} />
      </Switch>
      <BaseContainer/>
    </div>
  );
};

export default App;
