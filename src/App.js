import "./App.css";
import TodoList from "./components/TodoList";
import MySnackBar from "./components/MySnackBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { SnackBarProvider } from "./contexts/SnackBarContext";
// Hooks
import { useState } from "react";
// Others
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: ["PlayfairDisplay", "Arial", "sans-serif"].join(","),
  },
});

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          backgroundColor: "#282c34",
          height: "100vh",
        }}
      >
        <MySnackBar />
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
