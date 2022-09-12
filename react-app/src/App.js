import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from './components/users/UsersList';
// import User from './components/users/User';
import { authenticate } from "./store/session";
import HomePage from "./components/HomePage";
import IncompletePage from "./components/Incomplete";
import Search from "./components/Search";
import InitiateTxn from "./components/txnForms/InitiateTxnForm";
import EditIncompleteTxn from "./components/txnForms/EditTxn";
import TxnComments from "./components/TxnComments";
import UserPage from "./components/UserPage";
import SplashPage from "./components/SplashPage";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import Footer from "./components/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
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
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/" exact={true}>
          <SplashPage />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path="/home" exact={true}>
          <HomePage />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/incomplete" exact={true}>
          <IncompletePage />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/search" exact={true}>
          <Search />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/pay" exact={true}>
          <InitiateTxn />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/u/:username" exact={true}>
          <UserPage />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/transactions/:id/edit" exact={true}>
          <EditIncompleteTxn />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/transactions/:id/comments" exact={true}>
          <TxnComments />
          <Footer />
        </ProtectedRoute>
        <Route>
          <PageNotFound />
          <Footer />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
