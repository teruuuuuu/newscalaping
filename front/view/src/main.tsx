import * as React from "react";
import * as ReactDOM from 'react-dom';

import StoreConfig from './store/store-config';
import { Provider } from 'react-redux'

import './assets/bootstrap/css/bootstrap.min.css'
import './assets/css/main.css'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as injectTapEventPlugin from 'react-tap-event-plugin'

import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import FirstComponent from './components/page/first-component';
import ListComponent from './components/page/list-component';
import CrawlIndex from './components/page/crawler/crawl-index';

import TabsExample from './components/workspace/tabs-example';
import DialogExample from './components/workspace/dialog-example';

injectTapEventPlugin()

const store = StoreConfig({});
ReactDOM.render(
  <div style={{color: "#555"}}>
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ CrawlIndex as any } />
          <Route exact path="/first" component={ FirstComponent as any } />
          <Route exact path="/list" component={ ListComponent as any } />
          <Route exact path="/tab" component={ TabsExample as any } />
          <Route exact path="/dialog" component={ DialogExample as any } />
        </Switch>
      </BrowserRouter>
      </MuiThemeProvider>
    </Provider >
  </div>
    ,document.getElementById("app")
);
