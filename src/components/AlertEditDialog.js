import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
// Hooks
import { useContext, useState } from "react";
// Contexts
import { TodosContext } from "../contexts/todosContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertEditDialog({ open, handleEditCancel, todo }) {
  // Constants
  const { todos, setTodos } = useContext(TodosContext);
  const [todoUpdate, setTodoUpdate] = useState({
    title: todo.title,
    description: todo.description,
  });
  // Events Handlers
  function handleEditConfirm() {
    const newTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: todoUpdate.title,
          description: todoUpdate.description,
        };
      } else {
        return t;
      }
    });
    setTodos(newTodos);
    handleEditCancel(false);
  }
  // ==== Events Handlers ====

  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={handleEditCancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Edit Task"}</DialogTitle>
      <DialogContent>
        <TextField
          // autoFocus
          required
          margin="dense"
          id="taskTitle"
          name="taskTitle"
          label="Task Title"
          type="text"
          fullWidth
          variant="standard"
          value={todoUpdate.title}
          onChange={(e) =>{
            setTodoUpdate({ ...todoUpdate, title: e.target.value });
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="taskDescription"
          name="taskDescription"
          label="Details"
          type="text"
          fullWidth
          variant="standard"
          value={todoUpdate.description}
          onChange={(e) =>{
            setTodoUpdate({ ...todoUpdate, description: e.target.value });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditCancel}>Close</Button>
        <Button onClick={handleEditConfirm}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
