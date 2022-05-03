import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import './App.css';
//import Home from './App';
import Forms from './form/App';
import Home from './components/pages/Home' ;
import Login from './Signin/Form';
import SignUp from './Register/Form';
import Table from './components/Table';
import UserManagement from './components/UserManagement';
import PersonalDataSheet from './form';
import { createTheme, ThemeProvider } from '@mui/material';
import {Provider} from 'react-redux'
import {store} from './store/index'
import { AdminRoute, AppRoute, UserRoute } from './utilities/Routes';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component=
              {Home} />
            <Route path='/sign-in' exact component=
              {Login} />
            <AdminRoute path='/admin/dashboard' exact component=
              {Table} />
            <AdminRoute path='/admin/usermanagement' exact component=
              {UserManagement} />
            <Route path='/Sign-Up' exact component=
              {SignUp} />
            <Route path='/forms' exact component=
              {Forms} />
            <UserRoute path='/formsnew' exact component=
              {PersonalDataSheet} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
///Change
export default App;
