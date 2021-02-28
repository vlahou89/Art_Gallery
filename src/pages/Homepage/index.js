import React from "react";
import Main from "../../components/Main/Main";
import News from "../../components/News";
import Directory from "./../../components/Directory";
import "./styles.scss";

const Homepage = (props) => {
  return (
    <section className="homepage">
      <Main />
      <Directory />
      <News />
    </section>
  );
};

export default Homepage;
