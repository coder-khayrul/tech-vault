import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    //handle register with email and password
    const signUpWithEmailPass = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoader(false)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const loginWithEmailPass = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

     const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }
    const userSignOut = () => {
        return signOut(auth)
    }
    const updateUserProfile = async(updatedData) => {
            if(auth.currentUser){
                await updateProfile(auth.currentUser,updatedData)
                setUser(...auth.currentUser,...updatedData)
            }
        } 
        
    const userInfo = {
        user,
        setUser,
        signUpWithEmailPass,
        loginWithEmailPass,
        signInWithGoogle,
        updateUserProfile,
        userSignOut,
        loader
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;