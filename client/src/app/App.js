import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Tasks from "./layouts/tasks";
import AppLoader from "./components/ui/hoc/appLoader";
import LogOut from "./layouts/logOut";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <AppLoader>
        <NavBar />
        <Switch>
          <Route path="/tasks/:userId?/:taskId?" component={Tasks} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </div>
  );
}

export default App;
