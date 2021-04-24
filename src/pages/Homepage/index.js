import React from "react";
import Main from "../../components/Main/Main";
import Newsletter from "../../components/Newsletter";
import Directory from "./../../components/Directory";
import "./styles.scss";

const Homepage = (props) => {
  return (
    <section className="homepage">
      <Main />
      <Directory />
      <Newsletter />
    </section>
  );
};

export default Homepage;
