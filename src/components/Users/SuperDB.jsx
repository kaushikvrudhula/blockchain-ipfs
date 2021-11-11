import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

function SuperDB() {
  const [hashcode, setHashcode] = useState(null);
  async function getHash() {
    const docSnap = await getDoc(doc(db, 'Files', 'paper'));
    if (docSnap) {
      setHashcode(docSnap.data().hash);
    } else {
      console.log('No such document!');
    }
  }
  useEffect(() => {
    getHash();
  }, []);
  return (
    <div>
      <a
        href={'https://ipfs.infura.io/ipfs/' + hashcode}
        rel="noopener noreferrer"
        target="_blank"
      >
        View Paper Here{/* {.substring(0, 10)}... */}
      </a>
    </div>
  );
}

export default SuperDB;
