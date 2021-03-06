import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from '@firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../Firebase';

import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  where,
  query,
} from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setcurrentUser] = useState(null);
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState(null);
  console.log('signed in as ', currentUser);
  function signup(email, password, name, category) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('signed in as ', user);
        //Add User Data to db
        addUserToDb(user, name, category);
        //console.log("User Category : ",category)
        return true;
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        throw errorMessage;
      });
  }

  async function addUserToDb(user, name, category) {
    const usersRef = collection(db, 'Users');
    await setDoc(doc(usersRef, user.email), {
      userName: name,
      category: category,
    });
  }

  function printUsers() {
    const q = query(collection(db, 'Users'), where('category', '==', 'COE'));
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {});
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function login(email, password) {
    console.log('Running Login');
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        return true;
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        throw errorMessage;
      });
  }
  async function getCourse(year) {
    const docSnap = await getDoc(doc(db, 'Subjects', year));
    return docSnap.data().Coursecode;
  }

  async function getRole(role) {
    const docSnap = await getDoc(doc(db, 'Users', role));
    setUser(docSnap.data());
    return docSnap.data().category;
  }
  async function getPhone(email) {
    const docSnap = await getDoc(doc(db, 'Users', email));
    setUser(docSnap.data());
    return docSnap.data().phone;
  }

  function logout() {
    console.log('Running Logout');
    return signOut(auth)
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw error.message;
      });
  }

  async function loggedin() {
    if (await auth.currentUser) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setcurrentUser(user);
        setloading(false);
        console.log('User has signed in');
      } else {
        // User is signed out
        // ...
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loggedin,
    printUsers,
    getRole,
    getPhone,
    getCourse,
    auth,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
