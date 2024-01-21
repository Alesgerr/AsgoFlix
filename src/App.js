import "./App.css";
import Router from "./routes/Router";
import { Toaster } from "react-hot-toast";
function App() {

  return (
    <div className="App">
      <Router />
      <Toaster
        position="top-right"
        containerClassName="Toaster"
        toastOptions={{
          // Define default options
          className: "",
          duration: 1500,
          style: {
            background: "#fff",
            color: "#000",
          },

          // Default options for specific types
          success: {
            duration: 1500,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
