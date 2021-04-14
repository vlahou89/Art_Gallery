import React from "react";
import ReactDOM from "react-dom";
import Staff from "../index";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, screen, within } from "@testing-library/react"; // highlight-line

Enzyme.configure({ adapter: new Adapter() });

describe("Staff", () => {
  let appWrapper;

  beforeAll(() => {
    appWrapper = shallow(<Staff />);
  });

  it("List with Staff rendering with no issues", () => {
    const tableList = appWrapper.find(".tableList");
    expect(tableList).toHaveLength(1);
  });

  it("FormInput Should capture change correctly onChange", function () {
    const input = appWrapper.find("FormInput").at(0);
    input.simulate("change", { target: { value: "Hello" } });
    //expect what???
  });

  it("Tablecontainer", function () {
    const tableList = appWrapper.find("TableContainer TableRow");
    //expect what???
  });

  it("Button submits form", function () {
    //expect what???
  });

  it("the values are in the table", () => {
    const table = appWrapper.find("Table");
    const Table = ({ values }) => (
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {artists.map(
            ([id, name, email, phone, website, update, deleteEntry]) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{website}</td>
                <td>{update}</td>
                <td>{deleteEntry}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
    const artists = [
      ["123", "name1", "email1", "phone1", "website1", "update1", "delete1"],
      ["234", "name2", "email2", "phone1", "website1", "update1", "delete1"],
    ];
    render(<Table values={artists} />);
    // display values??
  });

  it("Table Container shows correctly", () => {
    const tableList = appWrapper.find("TableContainer TableRow");
    // expect ??
  });

  it("Update Button open Modal on click", () => {
    const updateButton = appWrapper.find(".updateButton");
    const mockCallBack = jest.fn();
    const button = shallow(
      <updateButton onClick={mockCallBack}>Ok!</updateButton>
    );
    button.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
    // expect ??
  });

  it("Delete Button deletes Artist by id", () => {
    const deleteButton = appWrapper.find(".deleteButton");
    const mockCallBack = jest.fn();
    const button = shallow(
      <deleteButton onClick={mockCallBack}>Ok!</deleteButton>
    );
    button.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
    // expect ??
  });
});
