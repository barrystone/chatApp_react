import React from "react";
import ReactDOM from "react-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "shards-ui/dist/css/shards.min.css";
import "./index.css";

import LandingScreen from "./screens/LandingScreen";

// Custom debugging setting, if show error just comment it (in .gitignore).
import "./logrocket";

const App = () => <LandingScreen />;

ReactDOM.render(<App />, document.getElementById("app"));
