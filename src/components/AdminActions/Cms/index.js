import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "../../../redux/Products/products.actions";
import Modal from "../../Modal";
import FormInput from "../../forms/FormInput";
import FormSelect from "../../forms/FormSelect";
import Button from "../../forms/Button";
import LoadMore from "../../LoadMore";
import CKEditor from "ckeditor4-react";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Cms = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("paintings");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDesc,
      })
    );
    resetForm();
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="admin">
      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Content</h1>
              </th>
            </tr>
            <div className="callToActions">
              <ul>
                <li>
                  <Icon
                    className="fa fa-plus-circle"
                    onClick={() => toggleModal()}
                  />
                </li>
              </ul>
            </div>

            <Modal {...configModal} className="popUpModal">
              <div className="addNewProductForm">
                <form onSubmit={handleSubmit}>
                  <FormSelect
                    options={[
                      {
                        value: "paintings",
                        name: "Paintings",
                      },
                      {
                        value: "sculptures",
                        name: "Sculptures",
                      },
                      {
                        value: "offers",
                        name: "Offers",
                      },
                    ]}
                    handleChange={(e) => setProductCategory(e.target.value)}
                  />

                  <FormInput
                    className="nameInput"
                    placeholder="Item Name Here..."
                    type="text"
                    value={productName}
                    handleChange={(e) => setProductName(e.target.value)}
                  />

                  <FormInput
                    className="priceInput"
                    placeholder="Item Price Here..."
                    label="Price"
                    type="number"
                    min="0.00"
                    max="10000.00"
                    step="0.01"
                    value={productPrice}
                    handleChange={(e) => setProductPrice(e.target.value)}
                  />

                  <FormInput
                    label="Main image URL"
                    type="url"
                    value={productThumbnail}
                    handleChange={(e) => setProductThumbnail(e.target.value)}
                  />

                  <CKEditor
                    onChange={(evt) => setProductDesc(evt.editor.getData())}
                  />

                  <br />

                  <Button type="submit">Add product</Button>
                </form>
              </div>
            </Modal>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tr>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                  <tbody>
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((product, index) => {
                        const {
                          productName,
                          productThumbnail,
                          productPrice,
                          productCategory,
                          documentID,
                        } = product;

                        return (
                          <tr key={index}>
                            <td>
                              <img className="thumb" src={productThumbnail} />
                            </td>
                            <td>{productCategory}</td>
                            <td>{productName}</td>
                            <td>£{productPrice}</td>
                            <td>
                              <IconButton
                                onClick={() =>
                                  dispatch(deleteProductStart(documentID))
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cms;
