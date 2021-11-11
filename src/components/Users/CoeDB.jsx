import { useEffect, useRef, useState } from 'react';
import Coe_FileList from '../Content/Coe_FileList';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const Coe = (props) => {
  const fileDescription = useRef();
  const [index, setIndex] = useState(null);
  async function uploadData() {
    try {
      await setDoc(doc(db, 'Files', 'paper'), {
        hash: props.files[index].fileHash,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    props.uploadFile(fileDescription.current.value);
  };

  return (
    <div className="mt-3 text-center CoeDB container-fluid">
      <div className="row justify-content-md-center">
        <main
          role="main"
          className="ml-auto mr-auto col-lg-12"
          style={{ maxWidth: '1024px' }}
        >
          <div className="content">
            {!props.isLoading && (
              <table className="table table-sm">
                <thead style={{ fontSize: '15px' }}>
                  <tr className="text-white bg-secondary">
                    <th scope="col" style={{ width: '10px' }}>
                      Send
                    </th>
                    <th scope="col" style={{ width: '10px' }}>
                      Id
                    </th>
                    <th scope="col" style={{ width: '200px' }}>
                      Name
                    </th>
                    <th scope="col" style={{ width: '230px' }}>
                      Description
                    </th>
                    <th scope="col" style={{ width: '120px' }}>
                      Type
                    </th>
                    <th scope="col" style={{ width: '90px' }}>
                      Size
                    </th>
                    <th scope="col" style={{ width: '90px' }}>
                      Date
                    </th>
                    <th scope="col" style={{ width: '120px' }}>
                      Hash/View/Get
                    </th>
                  </tr>
                </thead>
                <Coe_FileList files={props.files} setIndex={setIndex} />
              </table>
            )}
            <div className="Send_Wrap">
              <button
                className="Send slide"
                onClick={() => {
                  if (index || index === 0) {
                    uploadData();
                  } else {
                    console.log('Please select a file to send');
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Coe;
