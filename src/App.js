import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import BrowRouter from './routers/browRouter';
function App(props) {
  return (
    <Router>
      <BrowRouter />
    </Router>
  );
}

export default App;