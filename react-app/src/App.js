import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';

import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/users/UsersList';
import User from './components/users/User';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import IncompletePage from './components/Incomplete';
import Search from './components/Search';
import InitiateTxn from './components/txnForms/InitiateTxnForm';
import EditIncompleteTxn from './components/txnForms/EditTxn';
import TxnComments from './components/TxnComments';
import UserPage from './components/UserPage';
import SplashPage from './components/SplashPage';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
      <Route path='/' exact={true} >
          <SplashPage />
          {/* <h1>Welsome to Renmo</h1> */}
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/incomplete' exact={true} >
          <IncompletePage />
        </ProtectedRoute>
        <ProtectedRoute path='/search' exact={true} >
          <Search />
        </ProtectedRoute>
        <ProtectedRoute path='/pay' exact={true} >
          <InitiateTxn />
        </ProtectedRoute>
        <ProtectedRoute path='/u/:username' exact={true} >
          <UserPage />
        </ProtectedRoute>
        <ProtectedRoute path='/transactions/:id/edit' exact={true} >
          <EditIncompleteTxn />
        </ProtectedRoute>
        <ProtectedRoute path='/transactions/:id/comments' exact={true} >
          <TxnComments />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
