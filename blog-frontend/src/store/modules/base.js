import {createAction, handleActions} from 'redux-actions';
import {pender} from 'redux-pender';
import {Map} from 'immutable';
import * as api from 'lib/api';

const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';

const CHANGE_PASSWORD_INPUT = 'base/CHANGE_PASSWORD_INPUT';
const LOGIN = 'base/LOGIN';

export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const changePasswordInput = createAction(CHANGE_PASSWORD_INPUT);
export const login = createAction(LOGIN, api.login);

const initialState = Map({
  // 모달의 가시성(보이는지안보이는지) 상태
  modal: Map({
    remove: false,
    login: false
  }),
  loginModal: Map({
    password: '',
    error: false
  }),
  logged: false // 현재 로그인 상태
});

export default handleActions({
  [SHOW_MODAL]: (state, action) => {
    const {payload: modalName} = action;
    return state.setIn(['modal', modalName], true);
  },
  [HIDE_MODAL]: (state, action) => {
    const {payload: modalName} = action;
    return state.setIn(['modal', modalName], false);
  },
  [CHANGE_PASSWORD_INPUT]: (state, action) => {
    const { payload: value } = action;
    return state.setIn(['loginModal', 'password'], value);
  },
  ...pender({
    type: LOGIN,
    onSuccess: (state, action) => {  // 로그인 성공 시
      return state.set('logged', true);
    },
    onError: (state, action) => {  // 에러 발생 시
      return state.setIn(['loginModal', 'error'], true)
                  .setIn(['loginModal', 'password'], '');
    }
  })
}, initialState);
