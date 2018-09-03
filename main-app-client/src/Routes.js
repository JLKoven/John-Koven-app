import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NoteHub from "./containers/NoteHub";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import NewGeneral_Stat from "./containers/NewGeneral_Stat";
import General_Stats from "./containers/General_Stats";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import GameHub from "./containers/GameHub";


/*
export default () => //YOU NEED TO INCLUDE CHILDPROPS HERE
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />    //<Route path="/" exact component={Home} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />    //<Route path="/login" exact component={Login} />
    <Route component={NotFound} />
  </Switch>;
*/

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} /> //<Route path="/" exact component={Home} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/noteHub" exact component={NoteHub} props={childProps} />
    <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />
    <AuthenticatedRoute path="/gameHub" exact component={GameHub} props={childProps} />
    <AuthenticatedRoute path="/general_stat/new" exact component={NewGeneral_Stat} props={childProps} />
    <AuthenticatedRoute path="/general_stat/:id" exact component={General_Stats} props={childProps} />
        { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

/*

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route component={NotFound} />
  </Switch>;
*/

//  { /* Finally, catch all unmatched routes */ }
