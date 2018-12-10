import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ListPage, PostPage, EditorPage, NotFountPage} from 'pages';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ListPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/editor" component={EditorPage} />
        <Route component={NotFountPage} />
      </Switch>
    </div>
  );
};

export default App;
