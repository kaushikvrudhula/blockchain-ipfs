import moment from 'moment';
import { useEffect } from 'react';

import { convertBytes } from '../../utils';

const CoeFileList = ({ course, files, setIndex }) => {
  useEffect(() => {
    console.log(files, course);
  }, []);
  return files
    .filter((file) => file.fileDescription.toString() === course)
    .map((file, key) => {
      return (
        <tbody style={{ fontSize: '16px' }} key={key}>
          <tr>
            <td className="td-radio">
              <input
                type="radio"
                name="File"
                id={course + key}
                value={key}
                onChange={(e) => {
                  console.log(e.target.value);
                  setIndex(e.target.value);
                }}
              ></input>
              <label htmlFor={course + key}></label>
              <div className="check">
                <div className="inside"></div>
              </div>
            </td>
            <td className="col-1">{file.fileDescription}</td>
            <td className="col-5">{file.fileName}</td>
            <td className="col-1" style={{ maxWidth: '150px' }}>
              <div data-title={file.fileType}>
                <div className="text-truncate">{file.fileType}</div>
              </div>
            </td>
            <td className="col-1">{convertBytes(file.fileSize)}</td>
            <td className="col-2">
              {moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}
            </td>
            <td className="col-1">
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
