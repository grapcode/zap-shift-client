import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

// 💥 google provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // ⚡ display te dekhanor jonn
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⚡1st: signup with email
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ❄️ 2nd: updateProfile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // 🍁 3rd: sendEmailVerification
  const sendEmailVerificationFunc = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  };

  // ⚡ signin with email
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   💥 google signin
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ⚡ handle sign out btn
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 🎯 handle Forgot password
  const sendPasswordResetEmailFunc = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
  // ⚡authInfo
  const authInfo = {
    user,
    setUser,
    registerUser,
    signInUser,
    signInGoogle,
    logOutUser,
    updateUserProfile,
    sendEmailVerificationFunc,
    sendPasswordResetEmailFunc,
    loading,
    setLoading,
  };
  // 💥 user refrash dile jeno signout na hoy
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      // console.log(user);
      setUser(currUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
