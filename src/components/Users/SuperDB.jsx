import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { Button } from 'react-bootstrap';

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
      <div class="text-center w-100 text-dark">
        <button variant="light" className="fill">
          <a
            className="viewlink"
            href={'https://ipfs.infura.io/ipfs/' + hashcode}
            rel="noopener noreferrer"
            target="_blank"
          >
            View Paper Here{/* .substring(0, 10)}... */}
          </a>
        </button>
      </div>
    </div>
  );
}

export default SuperDB;
