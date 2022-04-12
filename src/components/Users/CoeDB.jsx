import { useState } from 'react';
import CoeFileList from '../Content/CoeFileList';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { Alert } from 'bootstrap';

const Coe = (props) => {
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

  return (
    <div className="bodyWrap">
      <center>
        <h4>Coe Selection and View Portal</h4>
      </center>
      <div className="mt-3 text-center CoeDB ">
        <div className="row justify-content-md-center" style={{width:'95vw'}}>
          <main
            role="main"
            className="ml-auto mr-auto col-lg-11"
            style={{ maxWidth: '1024px' }}
          >
            <div className="content">
              {!props.isLoading && (
                <table className="table table-sm table-striped table-dark table-bordered posTable">
                  <thead style={{ fontSize: '15px' }}>
                    <tr className="text-white">
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
                        View
                      </th>
                    </tr>
                  </thead>
                  <CoeFileList files={props.files} setIndex={setIndex} />
                </table>
              )}
              <div className="Send_Wrap">
                <button
                  className="button-5 Send slide"
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
      <br />
      <h5 className='text-truncate'>
        Note :- Use the view link to traverse through the content of the files.{' '}
      </h5>
    </div>
  );
};

export default Coe;
