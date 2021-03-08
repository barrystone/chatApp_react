import React from "react";
import ReactDOM from "react-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "shards-ui/dist/css/shards.min.css";

import "./index.css";

import Chat from "./Chat";
import LandingPage from "./LandingPage";

const App = () => <LandingPage />;

ReactDOM.render(<App />, document.getElementById("app"));
