import { useState } from 'react';
import CoeFileList from '../Content/CoeFileList';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import Dropdown from '../Content/Dropdown';

const Coe = (props) => {
  let [course, setCourse] = useState('#');
  const [index, setIndex] = useState(null);
  async function uploadData() {
    try {
      let arr = props.files.filter((file) => file.fileDescription === course);
      await setDoc(doc(db, 'Files', 'paper'), {
        hash: arr[index].fileHash,
      });
      window.alert('File sent successfully');
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="bodyWrap">
      <center>
        <h4>Coe Selection and View Portal</h4>
      </center>
      <div className="dropPos">
        <Dropdown setCourse={setCourse} />
      </div>
      <div className="mt-3 text-center CoeDB ">
        {course === '#' ? (
          <div className="courseName justify-content-md-center">
            <h4>please select a course</h4>
          </div>
        ) : (
          <div
            className="row justify-content-md-center"
            style={{ width: '95vw' }}
          >
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
                        <th scope="col" style={{ width: '230px' }}>
                          Description
                        </th>
                        <th scope="col" style={{ width: '200px' }}>
                          File Name
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
                    <CoeFileList
                      course={course}
                      files={props.files}
                      setIndex={setIndex}
                    />
                  </table>
                )}

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
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coe;
