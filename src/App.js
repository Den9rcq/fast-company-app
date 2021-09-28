import React from "react";
import NavBar from "./components/navBar";
import { Switch, Route } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersList from "./components/usersList";

const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/users/:userId?" component={UsersList}/>
                <Route path="/" component={Main}/>
            </Switch>
        </>
    );
};

export default App;
