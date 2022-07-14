/* eslint-disable default-case */
import React, { useState, useEffect }from 'react';
import fire from './fire';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import About from './pages/About';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';


function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
          case 'auth/user-disabled': 
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
        }
      })
  }

  const handleSignup = () => {
    clearErrors();
    fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err => {
      switch (err.code) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email': 
          setEmailError(err.message);
          break;
        case 'auth/weak-password':
          setPasswordError(err.message);
          break;
      }
    })
  }

  const handleLogout = () => {
    fire.auth().signOut()
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs(); 
        setUser(user);
      } else {
        setUser('');
      }
    }) 
  }

  useEffect(() => {
    authListener();
  }, [])

  

  return (
    <BrowserRouter> 
    <div className="App">

      {user ? (
        <>
        <Header />
        <ToastContainer position='top-center' /><Routes>
            <Route path="/" element={<Home handleLogout={handleLogout} />} />
            <Route path="/add" element={<AddEdit />} />
            <Route path="/update/:id" element={<AddEdit />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/about" element ={<About />} />
          </Routes></>
      ) : (
        <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
      )}
    </div>
    </BrowserRouter>
  );
}

export default App;
