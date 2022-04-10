import { useRef } from 'react';

const Teacher = (props) => {
  const fileDescription = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    props.uploadFile(fileDescription.current.value);
  };

  return (
    <div className="wrap">
      <div className="imag_wrap">
        <div className="teacherContainer">
          <center>
            <h4>File Upload Portal</h4>
          </center>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                id="fileDescription"
                type="text"
                ref={fileDescription}
                className="form-control text-monospace"
                placeholder="File description..."
                required
              />
            </div>
            <div className="areaBorder">
              {props.capturedFileName === null ? (
                <h6>Click or Drop in the Area to Upload</h6>
              ) : (
                <h6>{props.capturedFileName}</h6>
              )}
            </div>
            <input
              className="dropArea"
              type="file"
              onChange={props.captureFile}
            />
            <button
              type="submit"
              className="posButton slide btn-primary btn-block col-5 mt-2"
            >
              <b>UPLOAD</b>
            </button>
          </form>
          <br></br>
          <div className="footer-info">
            <center>
              <h6>
                NOTE :- Please double check the files that are being uploaded ,
                as after approving it from metamask the file cannot be taken
                back.
              </h6>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
