import React from "react";
import "./Main.scss";
import Container from "@material-ui/core/Container";
import Typed from "react-typed";

function Main() {
  return (
    <div className="mainContainer">
      <Container maxWidth="sm">
        <div className="typedText">
          <Typed strings={["Welcome To Our Gallery..."]} typeSpeed={40} />
        </div>
      </Container>
    </div>
  );
}

export default Main;
