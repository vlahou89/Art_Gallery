import React, { useState, useEffect } from "react";
import "./styles.scss";
import db from "../../../firebase/utils";
import firebase from "firebase/app";
import "firebase/firestore";
import Button from "../../../components/forms/Button";
import FormInput from "../../../components/forms/FormInput";
import { Table, TableHead } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
} from "@material-ui/icons";
import {
  TextField,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

function Staff() {
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [employeeEmail, setEmployeeEmail] = useState([]);
  const [employeePhone, setEmployeePhone] = useState([]);
  const [employeeAddress, setEmployeeAddress] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");

  useEffect(() => {
    console.log("useEffect Hook!!!");

    db.firestore()
      .collection("employees")
      .orderBy("datetime", "desc")
      .onSnapshot((snapshot) => {
        console.log("Firebase Snap!");
        setEmployees(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().employeeName,
              email: doc.data().employeeEmail,
              phone: doc.data().employeePhone,
              address: doc.data().employeeAddress,
              datatime: doc.data().datatime,
            };
          })
        );
      });
  }, []);

  const resetEmployee = () => {
    setEmployeeName("");
    setEmployeeEmail("");
    setEmployeePhone("");
    setEmployeeAddress("");
  };

  const addEmployee = (event) => {
    event.preventDefault();
    db.firestore().collection("employees").add({
      employeeName,
      employeeEmail,
      employeePhone,
      employeeAddress,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    });
    resetEmployee("");
  };

  const deleteEmployee = (id) => {
    db.firestore()
      .collection("employees")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

  const openUpdateDialog = (employee) => {
    setOpen(true);
    setToUpdateId(employee.id);
    setUpdate(employee.name);
    setUpdateEmail(employee.email);
    setUpdatePhone(employee.phone);
    setUpdateAddress(employee.address);
  };

  const editEmployee = () => {
    db.firestore().collection("employees").doc(toUpdateId).update({
      employeeName: update,
      employeeEmail: updateEmail,
      employeePhone: updatePhone,
      employeeAddress: updateAddress,
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" className="table">
      <div className="tableList">
        <h2 data-selector="add-new-title">Add New Employee</h2>
        <form noValidate>
          <Table>
            <TableCell>
              <FormInput
                type="text"
                name="name"
                placeholder="Full Name"
                autoFocus
                value={employeeName}
                data-selector="name"
                onChange={(event) => setEmployeeName(event.target.value)}
              />
            </TableCell>
            <TableCell>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={employeeEmail}
                data-selector="email"
                onChange={(event) => setEmployeeEmail(event.target.value)}
              />
            </TableCell>
            <TableCell>
              <FormInput
                type="text"
                name="phone"
                placeholder="Phone"
                value={employeePhone}
                data-selector="phone"
                onChange={(event) => setEmployeePhone(event.target.value)}
              />
            </TableCell>
            <TableCell>
              <FormInput
                type="text"
                name="address"
                placeholder="Address"
                value={employeeAddress}
                data-selector="address"
                onChange={(event) => setEmployeeAddress(event.target.value)}
              />
            </TableCell>
          </Table>
          <Button
            type="submit"
            variant="contained"
            color="orange"
            fullWidth
            onClick={addEmployee}
            disabled={!employeeName}
            data-selector="submitBtn"
            startIcon={<AddCircleOutlineRounded />}
          >
            Submit
          </Button>
        </form>
      </div>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>Full Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Email</b>
              </TableCell>
              <TableCell align="left">
                <b>Phone</b>{" "}
              </TableCell>
              <TableCell align="left">
                <b>Address</b>
              </TableCell>
              <TableCell align="left">
                <b>Update</b>
              </TableCell>
              <TableCell align="left">
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody align="center" data-selector="employee-details-table-body">
            {employees.map((employee) => (
              <TableRow key={employee.id} data-id={employee.id}>
                {/* LISTED EMPLOYEE DETAILS */}
                <TableCell component="td" scope="row" width="25%" align="left">
                  {employee.name}
                </TableCell>
                <TableCell component="td" scope="row" width="25%" align="left">
                  {employee.email}
                </TableCell>
                <TableCell component="td" scope="row" width="20%" align="left">
                  {employee.phone}
                </TableCell>
                <TableCell component="td" scope="row" width="20%" align="left">
                  {employee.address}
                </TableCell>

                {/* /* EDIT EMPLOYEE */}
                <TableCell width="5%">
                  <IconButton
                    aria-label="Edit"
                    data-selector="editBtn"
                    onClick={() => openUpdateDialog(employee)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>

                {/* DELETE EMPLOYEE */}
                <TableCell width="5%">
                  <IconButton
                    aria-label="delete"
                    data-selector="deleteBtn"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    <DeleteOutlineRounded />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <Dialog open={open} onClose={handleClose} data-selector="updateDialog">
            <DialogContent>
              <TextField
                autoFocus
                margin="normal"
                label="Update Name"
                type="text"
                fullWidth
                name="updateName"
                value={update}
                data-selector="updateName"
                onChange={(event) => setUpdate(event.target.value)}
              />
              <TextField
                autoFocus
                margin="normal"
                label="Update Email"
                type="text"
                fullWidth
                name="updateEmail"
                value={updateEmail}
                data-selector="updateEmail"
                onChange={(event) => setUpdateEmail(event.target.value)}
              />
              <TextField
                autoFocus
                margin="normal"
                label="Update Phone"
                type="text"
                fullWidth
                name="updatePhone"
                value={updatePhone}
                data-selector="updatePhone"
                onChange={(event) => setUpdatePhone(event.target.value)}
              />
              <TextField
                autoFocus
                margin="normal"
                label="Update Address"
                type="text"
                fullWidth
                name="updateAddress"
                value={updateAddress}
                data-selector="updateAddress"
                onChange={(event) => setUpdateAddress(event.target.value)}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={editEmployee} data-selector="updateSubmit">Save</Button>
            </DialogActions>
          </Dialog>
        </Table>
      </TableContainer>
    </Container>
  );
}
export default Staff;
