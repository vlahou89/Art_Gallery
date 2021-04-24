import { auth } from './../../firebase/utils';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setProducts, setProduct, fetchProductsStart } from './products.actions';
import { handleAddProduct, handleFetchProducts,
  handleFetchProduct, handleDeleteProduct } from './products.helpers';
import productsTypes from './products.types';

//generator function which receives the payload
export function* addProduct({ payload }) {
 
  try {
    const timestamp = new Date();
    //set the fields that we want to add in products document
    yield handleAddProduct({
      // take all the values that destructured from payload
      // productCategory,Product Description, productName, productThumbnail,productPrice
      ...payload,
      //and add 2 new fields, date and Admin User's ID
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp
    });
    yield put(
      fetchProductsStart()
    );


  } catch (err) {
    // console.log(err);
  }

}


export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(
      setProducts(products)
    );

  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put (
      fetchProductsStart()
    );

  } catch (err) {
    // console.log(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(
      setProduct(product)
    );

  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
  ])
}