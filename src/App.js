import "./App.less";
import PrivateRoute from "./Routes/PrivateRoute";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Container/Authentication/Login/Login";
import SignUp from "./Container/Authentication/SignUp/SignUp";
import NotFound from "./Container/404/404";
import Dashboard from "./Container/Dashboard/dashboard";
const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/SignUp" component={SignUp} />
        {/* <Route path="/Wof" component={Dashboard} /> */}
        <PrivateRoute path="/Wof" component={Dashboard} />
        <Route path="/404" component={NotFound} /> 
        <Redirect from='*' to='/404' />
      </Switch>
    </>
  );
};

export default App;
