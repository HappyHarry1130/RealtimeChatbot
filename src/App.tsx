import { ConsolePage } from './pages/ConsolePage';
import './App.scss';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';
import { auth } from './firebaseConfig'; // Assuming you have a firebaseConfig file
import SubscriptionPage from './pages/SubscriptionPage';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Success from './pages/PaymentSuccess';
import Cancel from './pages/PaymentCancel';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store';
import { UseDispatch,  UseSelector } from 'react-redux';
import rootReducer from './redux/reducers/roodReducer.js';
// Function to check if the user is authenticated
const isAuthenticated = () => {
  return auth.currentUser !== null;
};
// const stripePromise = loadStripe('pk_test_51QGHbhKTEcRvi4XYvzqMai394tI42dR9wB9yd2Dhnr1iNdhGJZMOEeLVNMkc67WMFkfUheWAN4ljMinvB1mN4RtP00CGQZ2bpQ');
// Custom component to handle protected routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  const user = useSelector((state: any) => state.user);
  const [isIogined, setIslogined] = useState(false);
  if(user){
    setIslogined(true);
  }
  return (
    <Provider store={store}>
      <div data-component="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={isIogined ? "/home" : "/login"} />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<ProtectedRoute><ConsolePage /></ProtectedRoute>} />
            <Route path="/subscription" element={<SubscriptionPage/>} />
            <Route path="/success" element={<Success/>} />
            <Route path="/cancel" element={<Cancel/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;