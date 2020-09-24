import React from 'react';
import styled from 'styled-components';
import { Link, Switch, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from '../home';
import Create from '../create';
import Article from '../article';
import './style/layout.css';

const { Header, Content, Footer } = Layout;

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
          <Link to="/create">Create</Link>
        </Menu.Item>

        <Menu.Item key="3">About</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 120px)' }}>
      <div className="site-layout-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={Create} />
          <Route path="/article/:id/:search" component={Article} />
        </Switch>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      NewsScanner ©2020 Created by Newstar-AI
    </Footer>
  </Layout>
);

export default BasicLayout;
