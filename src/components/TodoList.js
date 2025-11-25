// Material UI
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
import { useState, useContext, useEffect, useMemo } from "react";
// Contexts
import { TodosContext } from "../contexts/todosContext";
// Others
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const completedTodos = useMemo(() => {
    console.log("Completed todos: ");
    return todos.filter((todo) => todo.isCompleted);
  }, [todos]);
  const uncompletedTodos = useMemo(() => {
    console.log("UnCompleted todos: ");

    return todos.filter((todo) => !todo.isCompleted);
  }, [todos]);
  let todosToBeRendered = todos;
  if (displayTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType === "uncompleted") {
    todosToBeRendered = uncompletedTodos;
  }
  const todosList = todosToBeRendered.map((todo) => (
    <Todo key={todo.id} todo={todo} />
  ));

  function handleDisplayTodosType(event) {
    setDisplayTodosType(event.target.value);
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storedTodos);
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: "10vh" }}>
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
            value={displayTodosType}
            onChange={handleDisplayTodosType}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="uncompleted">Uncompleted</ToggleButton>
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
                    const newTodos = [
                      ...todos,
                      {
                        id: uuidv4(),
                        title: titleInput,
                        description: "",
                        isCompleted: false,
                      },
                    ];
                    setTodos(newTodos);
                    localStorage.setItem("todos", JSON.stringify(newTodos));
                    setTitleInput("");
                  }}
                  disabled={titleInput === ""}
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
