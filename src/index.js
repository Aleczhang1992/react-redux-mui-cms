import React from 'react';
import { render } from 'react-dom';

import {Router,browserHistory} from 'react-router';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistoryWithStore, routerReducer,routerMiddleware } from 'react-router-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import {reducer as formReducer} from 'redux-form';

import AppRoutes from './AppRoutes.js';
import rootReducer from './reducers';

injectTapEventPlugin();

const reducer = combineReducers({
  rootReducer,
  routing: routerReducer,
  form: formReducer
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

const store = createStoreWithMiddleware(
  reducer,
  applyMiddleware(routerMiddleware(browserHistory))
);

const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>	
		<div>
			<Router history={history} routes={AppRoutes} />
		</div>
	</Provider>
, document.getElementById('root'));

