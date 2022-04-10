import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/styles/style.css';
import App from './App';
import { AuthProvider } from './Context/AuthContext';

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById('root'));