const redux = require("redux");

const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE";

const buyCake = () => {
  return {
    type: BUY_CAKE,
    info: "First action",
  };
};

const initialState = {
  num_of_cakes: 10,
};

const reducer = (state = initialState, action) => {
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

const store = createStore(reducer);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Update to state", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
