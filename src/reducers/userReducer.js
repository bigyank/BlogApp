import loginService from '../services/login';
import signinService from '../services/signin';
import blogService from '../services/blogs';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'SIGNIN':
      return action.data;
    case 'LOGOUT':
      return null;
    case 'SETUSER':
      return action.data;
    default:
      return state;
  }
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    localStorage.setItem('loggedUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({
      type: 'LOGIN',
      data: user,
    });
  };
};

export const signinUser = (credentials) => {
  return async (dispatch) => {
    const user = await signinService.signin(credentials);
    localStorage.setItem('loggedUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({
      type: 'SIGNIN',
      data: user,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    blogService.unsetToken();
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const setUser = () => {
  return (dispatch) => {
    const loggedUserJson = window.localStorage.getItem('loggedUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      blogService.setToken(user.token);
      dispatch({
        type: 'SETUSER',
        data: user,
      });
    }
  };
};

export default reducer;
