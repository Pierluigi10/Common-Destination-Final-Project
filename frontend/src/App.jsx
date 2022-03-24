import { BrowserRouter as Router } from "react-router-dom";
import "./styles/App.scss";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import * as scrollbarAnimation from "./functions/scrollbarAnimation.jsx";
import { useTheme } from "./ThemeContext.js";

function App() {
  const { menuAccountToggle, setMenuAccountToggle } = useTheme();
  scrollbarAnimation.ScrollbarAnimation();

  return (
    <Router>
      <div
        className="App"
        onClick={() => {
          if (menuAccountToggle) setMenuAccountToggle(false);
        }}
      >
        <Navbar />
        <Main />
      </div>
    </Router>
  );
}

export default App;
