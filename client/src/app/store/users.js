import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../service/localStorage.service";
import history from "../utils/history";
import authService from "../service/auth.service";
import { generateAuthError } from "../utils/generateAuthError";
import userService from "../service/user.service";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: false,
      isLoggedIn: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = false;
      state.dataLoaded = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: usersReducer } = usersSlice;
const {
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
  authRequested,
  usersReceived,
  usersRequested,
  usersRequestFiled
} = actions;

export const logIn =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.logIn({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        console.log(errorMessage);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.push("/");
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthDAta();
  dispatch(userLoggedOut());
  history.push("/");
};

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};

export const getCurrentUserId = () => (state) => {
  return state.users.auth.false ? false : state.users.auth.userId;
};
export const getAuthError = () => (state) => state.users.error;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const consoleState = () => (state) => console.log(state);

consoleState();
export default usersReducer;
