import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {Provider} from 'react-redux';
import configure from 'store/configure';

import App from 'components/App';

const render = (ctx) => {
  const {url} = ctx; //요청 URL
  const store = configure(); //요청 올때마다 새 스토어 생성

  //renderToString은 렌더링결과물을 문자로 생성.
  //서버에서는 BrowserRouter 대신 StaticRouter 사용.
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  return html;
}

export default render;