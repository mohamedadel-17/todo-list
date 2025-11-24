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
import { useState } from "react";
import { useContext } from "react";
// Contexts
import { TodosContext } from "../contexts/todosContext";
// Others
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");

  const todosList = todos.map((todo) => <Todo key={todo.id} todo={todo} />);

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
