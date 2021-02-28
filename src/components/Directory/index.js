import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import ShopSculptures from "./../../assets/shopSculptures.jpg";
import ShopPaintings from "./../../assets/shopPaintings.jpg";
import ShopOffers from "./../../assets/shopOffers.jpg";

import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <h2>
        <Link className="linkShop" to="/shop">
          Explore Our Products
        </Link>
      </h2>
      <div className="row">
        <Grid container>
          <div
            className="item"
            style={{
              backgroundImage: `url(${ShopPaintings})`,
            }}
          >
            <div className="shopLink">
              <Link className="linkText" to="/shop/paintings">
                Paintings
              </Link>
            </div>
          </div>

          <div
            className="item"
            style={{
              backgroundImage: `url(${ShopSculptures})`,
            }}
          >
            <div className="shopLink">
              <Link className="linkText" to="/shop/sculptures">
                Sculptures
              </Link>
            </div>
          </div>

          <div
            className="item"
            style={{
              backgroundImage: `url(${ShopOffers})`,
            }}
          >
            <div className="shopLink">
              <Link className="linkText" to="/shop/offers">
                Offers
              </Link>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default Directory;
