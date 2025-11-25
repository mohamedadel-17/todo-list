import "./App.css";
import TodoList from "./components/TodoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { useState } from "react";
// Others
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: ["PlayfairDisplay", "Arial", "sans-serif"].join(","),
  },
});

const initialTodos = [
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
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#282c34",
          height: "100vh",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
