import * as React from 'react';
import './App.css';
import { routes } from './routes';
import { createBrowserHistory } from 'history';

//// Create browser history
//export const history = createBrowserHistory();

const App: React.FC = () => {
	return <div className="App">{routes}</div>;
}

export default App;
