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
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [artistName, setArtistName] = useState([]);
  const [artistEmail, setArtistEmail] = useState([]);
  const [artistPhone, setArtistPhone] = useState([]);
  const [artistWebsite, setArtistWebsite] = useState([]);

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateWebsite, setUpdateWebsite] = useState("");

  useEffect(() => {
    console.log("useEffect Hook!!!");

    db.firestore()
      .collection("artists")
      .orderBy("datetime","desc")
      .onSnapshot((snapshot) => {
        console.log("Firebase Snap!");
        setArtists(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().artistName,
              email: doc.data().artistEmail,
              phone: doc.data().artistPhone,
              website: doc.data().artistWebsite,
              datatime: doc.data().datatime,
            };
          })
        );
      });
  }, []);

  const resetArtist = () => {
    setArtistName("");
    setArtistEmail("");
    setArtistPhone("");
    setArtistWebsite("");
  };

  const addArtist = (event) => {
    event.preventDefault();
    db.firestore().collection("artists").add({
      artistName,
      artistEmail,
      artistPhone,
      artistWebsite,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    });
    resetArtist("");
  };

  const deleteArtist = (id) => {
    db.firestore()
      .collection("artists")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

  const openUpdateDialog = (artist) => {
    setOpen(true);
    setToUpdateId(artist.id);
    setUpdate(artist.name);
    setUpdateEmail(artist.email);
    setUpdatePhone(artist.phone);
    setUpdateWebsite(artist.website);
  };

  const editArtist = () => {
    db.firestore().collection("artists").doc(toUpdateId).update({
      artistName: update,
      artistEmail: updateEmail,
      artistPhone: updatePhone,
      artistWebsite: updateWebsite,
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" className="table">
      <div className="tableList">
        <h2 data-selector="add-new-title">Add New Artist</h2>
        <form noValidate>
          <Table>
            <TableCell>
              <FormInput
                type="text"
                name="name"
                placeholder="Full Name"
                autoFocus
                value={artistName}
                data-selector="name"
                onChange={(event) => setArtistName(event.target.value)}
              />
            </TableCell>
            <TableCell>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={artistEmail}
                data-selector="email"
                onChange={(event) => setArtistEmail(event.target.value)}
              />
            </TableCell>
            <TableCell>
              <FormInput
                type="text"
                name="phone"
                placeholder="Phone"
                value={artistPhone}
                data-selector="phone"
                onChange={(event) => setArtistPhone(event.target.value)}
              />
            </TableCell>
            <TableCell>
              <FormInput
                type="text"
                name="website"
                placeholder="Website"
                value={artistWebsite}
                data-selector="website"
                onChange={(event) => setArtistWebsite(event.target.value)}
              />
            </TableCell>
          </Table>
          <Button
            type="submit"
            variant="contained"
            color="orange"
            fullWidth
            onClick={addArtist}
            disabled={!artistName}
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
                <b>Website</b>
              </TableCell>
              <TableCell align="left">
                <b>Update</b>
              </TableCell>
              <TableCell align="left">
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody align="center" data-selector="artists-details-table-body">
            {artists.map((artist) => (
              <TableRow key={artist.id} data-id={artist.id}>
                {/* LISTED ARTIST DETAILS */}
                <TableCell component="td" scope="row" width="25%" align="left">
                  {artist.name}
                </TableCell>
                <TableCell component="td" scope="row" width="25%" align="left">
                  {artist.email}
                </TableCell>
                <TableCell component="td" scope="row" width="20%" align="left">
                  {artist.phone}
                </TableCell>
                <TableCell component="td" scope="row" width="20%" align="left">
                  {artist.website}
                </TableCell>

                {/* /* EDIT ARTIST */}
                <TableCell width="5%">
                  <IconButton
                    className="updateButton"
                    aria-label="Edit"
                    data-selector="editBtn"
                    onClick={() => openUpdateDialog(artist)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>

                {/* DELETE ARTIST */}
                <TableCell width="5%">
                  <IconButton
                    className="deleteButton"
                    aria-label="delete"
                    data-selector="deleteBtn"
                    onClick={() => deleteArtist(artist.id)}
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
                label="Update Website"
                type="text"
                fullWidth
                name="updateWebsite"
                value={updateWebsite}
                data-selector="updateWebsite"
                onChange={(event) => setUpdateWebsite(event.target.value)}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={editArtist} data-selector="updateSubmit">Save</Button>
            </DialogActions>
          </Dialog>
        </Table>
      </TableContainer>
    </Container>
  );
}
export default Artists;
