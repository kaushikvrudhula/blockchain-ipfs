import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import { AuthProvider } from './Context/AuthContext';

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById('root'));