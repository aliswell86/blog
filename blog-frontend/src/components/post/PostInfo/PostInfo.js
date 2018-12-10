import React from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

const PostInfo = () => (
  <div className={cx('post-info')}>
    <div className={cx('info')}>
      <h1>타이틀</h1>
      <div className={cx('tags')}>
        <Link to="/">#태그</Link>
        <Link to="/">#태그</Link>
        <Link to="/">#태그</Link>
      </div>
      <div className={cx('date')}>Dec 12, 2018</div>
    </div>
  </div>
);

export default PostInfo;
