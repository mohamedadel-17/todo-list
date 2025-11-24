// Material UI
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
// Icons (material UI)
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// Hooks
import { useContext } from "react";
// Contexts
import { TodosContext } from "../contexts/todosContext";

export default function TodoList({ todo }) {
  const { setTodos } = useContext(TodosContext);
  function ButtonActive() {
    if (todo.isCompleted) {
      return {
        color: "#fff",
        background: "#8bc34a",
        border: "3px solid #8bc34a",
        transition: "all 0.3s ease",
      };
    } else {
      return {
        color: "#8bc34a",
        border: "3px solid #8bc34a",
        transition: "all 0.3s ease",
      };
    }
  }
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          background: "#282c34",
          color: "white",
          marginTop: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            {/* Todo Text */}
            <Grid size={8}>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {todo.title}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                {todo.description}
              </Typography>
            </Grid>
            {/* ==== Todo Text ==== */}
            {/* Buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Check Button */}
              <IconButton
                className="iconButton"
                style={ButtonActive()}
                onClick={() => {
                  setTodos((prevTodos) =>
                    prevTodos.map((t) =>
                      t.id === todo.id
                        ? { ...t, isCompleted: !t.isCompleted }
                        : t
                    )
                  );
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* ==== Check Button ==== */}
              <IconButton
                className="iconButton"
                style={{
                  color: "#1769aa",
                  border: "3px solid #1769aa",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                style={{
                  color: "#b23c17",
                  border: "3px solid #b23c17",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            {/* ==== Buttons ==== */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
