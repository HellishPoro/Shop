import React from 'react';
import ReactDOM from 'react-dom/client';
import { Shop } from './shop';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<Shop />
		</Provider>
	</BrowserRouter>,
);
