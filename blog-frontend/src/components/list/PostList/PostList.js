import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

const PostItem = () => {
  return (
    <div className={cx('post-item')}>
      <h2><Link to="/">타이틀</Link></h2>
      <div className={cx('date')}>2018-12-10</div>
      <p>내용</p>
      <div className={cx('tags')}>
        <Link to="/">#태그</Link>
        <Link to="/">#태그</Link>
        <Link to="/">#태그</Link>
      </div>
    </div>
  );
};
const PostList = () => (
  <div className={cx('post-list')}>
    <PostItem/>
    <PostItem/>
    <PostItem/>
    <PostItem/>
  </div>
);

export default PostList;
