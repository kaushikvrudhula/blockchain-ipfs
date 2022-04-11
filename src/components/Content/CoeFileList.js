import moment from 'moment';
import { useEffect } from 'react';

import { convertBytes } from '../../utils';

const CoeFileList = ({ files, setIndex }) => {
  useEffect(() => {
    console.log(files);
  }, []);
  return files.map((file, key) => {
    return (
      <tbody style={{ fontSize: '14px' }} key={key}>
        <tr>
          <td>
            <input
              type="radio"
              name="File"
              value={key}
              onChange={(e) => {
                console.log(e.target.value);
                setIndex(e.target.value);
              }}
            ></input>
          </td>
          <td>{file.fileId}</td>
          <td>{file.fileName}</td>
          <td>{file.fileDescription}</td>
          <td>{file.fileType}</td>
          <td>{convertBytes(file.fileSize)}</td>
          <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
          <td>
            <a
              href={'https://ipfs.infura.io/ipfs/' + file.fileHash}
              rel="noopener noreferrer"
              target="_blank"
            >
              View
            </a>
          </td>
        </tr>
      </tbody>
    );
  });
};

export default CoeFileList;
