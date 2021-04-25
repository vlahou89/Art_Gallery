import productsTypes from "./products.types";
import productTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
  product: {},
};

// pass initial state and take action
const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //we return the state and based on that we return the products
    case productTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case productsTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

//The reducer manages action with type 'SET_PRODUCT'
export default productsReducer;
