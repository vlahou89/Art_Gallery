import productsTypes from './products.types';

//Create action which will take the product data

export const addProductStart = productData => ({
  // and return a simple action object
  //which will have a type
  type: productsTypes.ADD_NEW_PRODUCT_START,
  //and the payload will be the product data that we passed to it
  payload: productData
});

export const fetchProductsStart = (filters={}) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters
});

export const setProducts = products => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products
});

export const deleteProductStart = productID => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: productID
});

export const fetchProductStart = productID => ({
  type: productsTypes.FETCH_PRODUCT_START,
  payload: productID
});

export const setProduct = product => ({
  type: productsTypes.SET_PRODUCT,
  payload: product
});