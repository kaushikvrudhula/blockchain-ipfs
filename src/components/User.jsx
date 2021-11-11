import React, { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';

async function printUsers() {
  try {
    const querySnapshot = await getDocs(collection(db, 'Users'));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error(error.message);
  }
}

export function User() {
  useEffect(() => {
    printUsers();
  }, []);
  return (
    <div>
      <h2>Testing users</h2>
    </div>
  );
}
