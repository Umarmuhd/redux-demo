const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const createLogger = reduxLogger.createLogger;

const BUY_CAKE = "BUY_CAKE";
const BUY_ICE_CREAM = "BUY_ICE_CREAM";

const buyCake = () => {
  return {
    type: BUY_CAKE,
    info: "First action",
  };
};

const buyIceCream = () => {
  return {
    type: BUY_ICE_CREAM,
    info: "Second action",
  };
};

const initialCakeState = {
  num_of_cakes: 10,
};

const initialIceCreamState = {
  num_of_ice_creams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        num_of_cakes: state.num_of_cakes - 1,
      };

    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state,
        num_of_ice_creams: state.num_of_ice_creams - 1,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  ice_cream: iceCreamReducer,
});

const logger = createLogger({});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
