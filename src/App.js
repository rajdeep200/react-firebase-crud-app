import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import { db } from "./firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  name: {
    fontSize: '20px',
    color: 'black',
  }
}));

function App() {
  const [students, setStudents] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");
  const classes = useStyles();

  useEffect(() => {
    db.collection("users")
      .onSnapshot((snapshot) => {
        setStudents(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().name
            };
          })
        );
      });
  }, []);

  const addStudent = (e) => {
    e.preventDefault();
    db.collection("users").add({
      name: input
    });
    setInput("");
  };

  const updateStudent = () => {
    db.collection("users").doc(toUpdateId).update({
      name: update,
    });
    setOpen(false);
  };

  const deleteStudent = (id) => {
    db.collection("users").doc(id).delete();
  };

  const openDialog = (student) => {
    setOpen(true);
    setToUpdateId(student.id);
    setUpdate(student.name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <center>
      <h1>Enter Student's Name Below</h1>
      <Container maxWidth="sm">
        <form noValidate className={classes.root} autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />{" "}
          <br></br>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addStudent}
            disabled={!input}
          >
            Add Student
          </Button>
        </form>

        <List component="nav" aria-label="main mailbox folders" dense={true}>
          {students.map((student) => (
            <ListItem key={student.id} className="list__style">
              <ListItemText
                primary={student.name}
                className={classes.name}
              />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => openDialog(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Student Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={update}
              onChange={(e) => setUpdate(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={updateStudent} color="primary">
              Update
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </center>
  );
}

export default App;
