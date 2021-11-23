import React from "react";
import NavBar from "./components/ui/navBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
    return (
        <>
            <NavBar/>
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route path="/login/:type?" component={Login}/>
                        <Route path="/users/:userId?/:edit?" component={Users}/>
                        <Route path="/" component={Main}/>
                        <Redirect to="/"/>
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>
            <ToastContainer/>
        </>
    );
};

export default App;
