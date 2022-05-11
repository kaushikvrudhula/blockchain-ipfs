import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import pdfobject from 'pdfobject';

function SuperDB() {
  const [hashcode, setHashcode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getHash = async () => {
    const docSnap = await getDoc(doc(db, 'Files', 'paper'));
    const data = await docSnap.data();
    const hash = await data.hash;
    return hash;
  };
  useEffect(() => {
    let hash;
    (async () => {
      hash = await getHash();
      console.log(hash);
      setHashcode(hash);
      setIsLoading(false);
      pdfobject.embed(`https://ipfs.infura.io/ipfs/${hashcode}`, '#docdiv');
    })();
  }, [hashcode]);
  return (
    <div>
      <div class="text-center w-100 text-dark">
        {isLoading === false ? (
          <div id="docdiv"></div>
        ) : (
          <div>Fetching document</div>
        )}
      </div>
    </div>
  );
}

export default SuperDB;
