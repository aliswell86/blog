import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';

import CodeMirror from 'codemirror';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

const cx = classNames.bind(styles);

class EditorPane extends Component {

  editor = null;
  codeMirror = null;
  cursor = null; //에디터텍스트 현재 cursor 위치

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true
    });
    this.codeMirror.on('change', this.handleChangeMarkdown);
  }

  componentDidMount() {
    this.initializeEditor();
  }

  handleChange = (e) => {
    const {onChangeInput} = this.props;
    const {value, name} = e.target;
    onChangeInput({name, value});
  }

  handleChangeMarkdown = (doc) => {
    const {onChangeInput} = this.props;
    this.cursor = doc.getCursor();
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // markdown이 변경되면 에디터의 값도 변경해줍니다.
   // 이 과정에서 텍스트 커서의 위치가 초기화되기 때문에,
   // 저장해둔 커서의 위치가 있으면 해당 위치로 설정합니다.
   if(prevProps.markdown !== this.props.markdown) {
     const { codeMirror, cursor } = this;
     if(!codeMirror) return; // 인스턴스가 아직 안 만들어진 경우
     codeMirror.setValue(this.props.markdown);
     if(!cursor) return; // 커서가 없는 경우
     codeMirror.setCursor(cursor);
   }
  }

  render() {
    const {tags, title} = this.props;
    const {handleChange} = this;

    return (
      <div className={cx('editor-pane')}>
        <input
          className={cx('title')}
          placeholder="제목을 입력하세요"
          name="title"
          value={title}
          onChange={handleChange}/>
        <div className={cx('code-editor')} ref={ref => this.editor = ref}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>태그</div>
          <input
            name="tags"
            placeholder="태그를 입력하세요 (쉼표로 구분)"
            value={tags}
            onChange={handleChange}/>
        </div>
      </div>
    );
  }

}

export default EditorPane;
