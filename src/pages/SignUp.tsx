import React, { useState } from 'react';

import firebase from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const navigator = useNavigate();
  const handleSignup = async () => {
    if(!email || !displayName || !password){
        console.log("please fillout all fields")
        return;
    }
    try {
        const responnse = await firebase.auth().createUserWithEmailAndPassword(email,password);
        if(responnse.user) {
            await responnse.user.updateProfile(
                {displayName:displayName}
            )
            const uid = responnse.user.uid;
            const userRef = firebase.database().ref('users/' + uid)
            await userRef.set({
                uid:uid,
                email:email,
                username: displayName
            })
        }
        setEmail("");
        setPassword('');
        setDisplayName('');
        navigator('./login')
    //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //   await updateProfile(userCredential.user, { displayName });
    //   await sendEmailVerification(userCredential.user);
    //   alert('Verification email sent. Please check your inbox and verify your email before logging in.');
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 digonal-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSignup}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign up
        </button>
        <p className="text-center text-gray-600">
            Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login now.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;