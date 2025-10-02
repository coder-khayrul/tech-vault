import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [userInfo,setUserinfo] = useState(null);
  
  const signUpWithEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser)
      setLoader(true);
      if (currentUser) {
        try {

         
          const jwtRes = await fetch("https://app-orbit-server-zeta.vercel.app/jwt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: currentUser.email }),
          });
          const jwtData = await jwtRes.json();
          console.log(jwtData)
          if (jwtData.token) {
            localStorage.setItem("access-token", jwtData.token);
          }


          const profileRes = await fetch("https://app-orbit-server-zeta.vercel.app/me", {
            headers: { Authorization: `Bearer ${jwtData.token}` },
          });
          const profileData = await profileRes.json();

          setUserinfo(profileData); 
        } catch (err) {
          console.error("Auth error:", err);
        }
      } else {
        localStorage.removeItem("access-token");
        setUserinfo(null);
      }
      setLoader(false);
    });

    return () => unSubscribe();
  }, []);

  const loginWithEmailPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const userSignOut = () => {
    return signOut(auth).then(() => {
      localStorage.removeItem("access-token");
      setUser(null);
    });
  };

  const updateUserProfile = async (updatedData) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, updatedData);
      setUser((prev) => ({ ...prev, ...updatedData }));
    }
  };

  const providerInfo = {
    user,
    setUser,
    signUpWithEmailPass,
    loginWithEmailPass,
    signInWithGoogle,
    updateUserProfile,
    userSignOut,
    loader,
    userInfo
  };

  return <AuthContext.Provider value={providerInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
