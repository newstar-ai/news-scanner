import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './pages/homepage';
import UploadArticle from './pages/uploadArticle';
import { Layout } from 'antd';

const { Content } = Layout;
const App = () => (
  <Content>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/upload" component={UploadArticle} />
    </Switch>
  </Content>
);

export default App;
