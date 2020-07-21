import React from 'react';
import styled from 'styled-components';
import Homepage from '../homepage';
import UploadArticle from '../uploadArticle';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './style/layout.css';
const { Header, Content, Footer } = Layout;
import { Switch, Route } from 'react-router-dom';

const Title = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const BasicLayout = () => (
  <Layout className="layout">
    <Header className="header">
      <Link to="/">
        <Title>News Scanner</Title>
      </Link>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Search</Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to="/upload">Upload</Link>
        </Menu.Item>

        <Menu.Item key="3">About</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 120px)' }}>
      <div className="site-layout-content">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/upload" component={UploadArticle} />
        </Switch>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      NewsScanner ©2020 Created by Newstar-AI
    </Footer>
  </Layout>
);

export default BasicLayout;
