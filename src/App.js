import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import SignIn from './components/SignIn';
import SignUp from './Register/Form';
import Table from './components/Table';
import UserManagement from './components/UserManagement';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component=
            {Home} />
          <Route path='/sign-in' exact component=
            {SignIn} />
          <Route path='/admin/dashboard' exact component=
            {Table} />
          <Route path='/admin/usermanagement' exact component=
            {UserManagement} />
          <Route path='/Sign-Up' exact component=
            {SignUp} />
        </Switch>
      </Router>
    </>
  );
}
///Change
export default App;
