import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import BrowRouter from './routers/browRouter';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import reducers from './components/reducers/reducer';

const store = createStore(reducers, applyMiddleware(thunk))
function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <BrowRouter />
      </Router>
    </Provider>
  );
}

export default App;