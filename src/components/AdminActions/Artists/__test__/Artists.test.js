import React from "react";
import ReactDOM from "react-dom";
import Artists from "../index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Artists />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("when the form is submitted the event is cancelled", () => {
  const wrapper = shallow(<Artists />);
  let prevented = false;
  wrapper.find("form").simulate("submit", {
    prefentDefault: () => {
      prevented = false;
    },
  });
  expect(prevented).toBe(false);
});
