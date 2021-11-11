import moment from 'moment';

import { convertBytes } from '../../utils';

const Coe_FileList = props => {
  return(
    props.files.map((file, key) => {
      return(
        <tbody style={{ 'fontSize': '14px' }} key={key}>
          <tr>
            <td><input type="radio" name="File"></input></td>
            <td>{file.fileId}</td>
            <td>{file.fileName}</td>
            <td>{file.fileDescription}</td>
            <td>{file.fileType}</td>
            <td>{convertBytes(file.fileSize)}</td>
            <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
            <td>
              <a
                href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                rel="noopener noreferrer"
                target="_blank">
                {file.fileHash.substring(0,10)}...
              </a>
            </td>
          </tr>
        </tbody>
      );
    })
  );  
};

export default Coe_FileList;

