const redux = require("redux");
const reduxThunk = require("redux-thunk").default;
const axios = require("axios").default;
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const createLogger = reduxLogger.createLogger;

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const fetchUsersRequest = () => {
  return { type: FETCH_USERS_REQUEST };
};
const fetchUsersSuccess = (users) => {
  return { type: FETCH_USERS_SUCCESS, payload: users };
};
const fetchUsersFailure = (error) => {
  return { type: FETCH_USERS_FAILURE, payload: error };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const fetchUsers = () => {
  return async function (dispatch) {
    try {
      dispatch(fetchUsersRequest());
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      const users = data.map((user) => user.id);
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

const logger = createLogger({});

const store = createStore(reducer, applyMiddleware(reduxThunk, logger));

const unsubscribe = store.subscribe(() => {});
store.dispatch(fetchUsers());
unsubscribe();
