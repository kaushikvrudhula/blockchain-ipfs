import { useRef } from 'react';
import Coe_FileList from '../Content/Coe_FileList';

const Coe = props => {
    const fileDescription = useRef();
  
    const submitHandler = (event) => {
      event.preventDefault();
  
      props.uploadFile(fileDescription.current.value);
    };
    
    return (
      <div className="CoeDB container-fluid text-center mt-3">
        <div className="row justify-content-md-center">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">            
            {!props.isLoading && <table className="table table-sm" >
                <thead style={{ 'fontSize': '15px' }}>
                  <tr className="bg-secondary text-white">
                    <th scope="col" style={{width: '10px'}}>Send</th>
                    <th scope="col" style={{ width: '10px'}}>Id</th>
                    <th scope="col" style={{ width: '200px'}}>Name</th>
                    <th scope="col" style={{ width: '230px'}}>Description</th>
                    <th scope="col" style={{ width: '120px'}}>Type</th>
                    <th scope="col" style={{ width: '90px'}}>Size</th>
                    <th scope="col" style={{ width: '90px'}}>Date</th>
                    <th scope="col" style={{ width: '120px'}}>Hash/View/Get</th>
                  </tr>
                </thead>
                <Coe_FileList files={props.files} />
              </table>}
              <div className="Send_Wrap"><button className="Send slide">Send</button></div>
            </div>
          </main>
        </div>
      </div>
    );
    
}

export default Coe;