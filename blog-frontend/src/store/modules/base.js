import {createAction, handleActions} from 'redux-actions';
import {pender} from 'redux-pender';
import {Map} from 'immutable';
import * as api from 'lib/api';

const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';

const LOGIN = 'base/LOGIN';
const LOGOUT = 'base/LOGOUT';
const CHECK_LOGIN ='base/CHECK_LOGIN';
const CHANGE_PASSWORD_INPUT = 'base/CHANGE_PASSWORD_INPUT';
const INITIALIZE_LOGIN_MODAL = 'base/INITIALIZE_LOGIN_MODAL';
const TEMP_LOGIN = 'base/TEMP_LOGIN';

export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const changePasswordInput = createAction(CHANGE_PASSWORD_INPUT);
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT, api.logout);
export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
export const initializeLoginModal = createAction(INITIALIZE_LOGIN_MODAL);
export const tempLogin = createAction(TEMP_LOGIN);

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
  [INITIALIZE_LOGIN_MODAL]: (state, action) => {
    // 로그인 모달의 상태를 초기 상태로 설정합니다(텍스트/에러 초기화).
    return state.set('loginModal', initialState.get('loginModal'));
  },
  [TEMP_LOGIN]: (state, action) => {
    return state.set('logged', true);
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
  }),
  ...pender({
    type: CHECK_LOGIN,
    onSuccess: (state, action) => {
      const { logged } = action.payload.data;
      return state.set('logged', logged);
    }
  })
}, initialState);
