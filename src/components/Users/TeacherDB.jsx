import { useRef } from 'react';

const Teacher = props => {
    const fileDescription = useRef();
  
    const submitHandler = (event) => {
      event.preventDefault();
  
      props.uploadFile(fileDescription.current.value);
    };
    
    return (
      <div className="container-fluid text-center mt-3">
        <div className="row justify-content-md-center">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">            
              <div className="card mb-3 mx-auto bg-secondary" style={{ maxWidth: '512px' }}>
                <h2 className="text-white text-monospace bg-secondary"><b>Share File</b></h2>
                  <form onSubmit={submitHandler} >
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
                    <input type="file" onChange={props.captureFile} className="text-white text-monospace mt-2"/>
                    <button type="submit" className="btn-primary btn-block col-12 mt-2"><b>UPLOAD</b></button>
                  </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
    
}

export default Teacher;