import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import App from './App';
import {BrowseNewsView }from './components/news/BrowseNewsView';
import { BrowseChannelView } from './components/news/BrowseChannelView';
import { StatsNewsView } from './components/news/StatsNewsView';

const AppRoutes = (
	<Route path="/" component={App} >
		<IndexRoute component={BrowseNewsView} />
		<Route path="news/browse(/:pageNo(/:orderBy(/:desc)))" component={BrowseNewsView} />
		<Route path="channel/browse" component={BrowseChannelView} />
		<Route path="news/stats" component={StatsNewsView} />
	</Route>
);

export default AppRoutes;

