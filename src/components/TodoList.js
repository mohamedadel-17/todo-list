import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// Components
import Todo from "./Todo";
// Hooks
import { useState } from "react";
// Others
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      title: "First Task",
      description: "This is my first task",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "Second Task",
      description: "This is my second task",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "Third Task",
      description: "This is my third task",
      isCompleted: false,
    },
  ]);

  function handleCheckClick(id) {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  }

  const todosList = todos.map((todo) => (
    <Todo key={todo.id} todo={todo} setTodos={setTodos} handleCheckClick={handleCheckClick} />
  ));

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            ToDoList
          </Typography>
          <Divider />
          {/* Filter Buttons */}
          <ToggleButtonGroup
            exclusive
            aria-label="text alignment"
            style={{ marginTop: "10px" }}
          >
            <ToggleButton value="left">All</ToggleButton>
            <ToggleButton value="center">Completed</ToggleButton>
            <ToggleButton value="right">Uncompleted</ToggleButton>
          </ToggleButtonGroup>
          {/* ==== Filter Buttons ==== */}

          {/* All Todos */}
          {todosList}
          {/* ==== All Todos ====*/}

          {/* Input & Add Button */}
          <div>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid size={8}>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  id="outlined-basic"
                  label="Task title"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Grid>
              <Grid
                size={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#282c34",
                  }}
                  onClick={() => {
                    setTodos([
                      ...todos,
                      {
                        id: uuidv4(),
                        title: titleInput,
                        description: "",
                        isCompleted: false,
                      },
                    ]);
                    setTitleInput("");
                  }}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </div>
          {/* ==== Input & Add Button ==== */}
        </CardContent>
      </Card>
    </Container>
  );
}
