import React from 'react';
import { Layout } from 'antd';
import Nav from './Nav/Nav'
import HeaderMenu from './Header/Header'
import './Layout.scss'

const { Header, Content, Footer } = Layout;

function MainLayout(props) {
    const {children} = props;
    
    return (
        <Layout className="base-layout">
          <Nav/>
          <Layout className="content-layout">
            <Header className="header-layout">
              <HeaderMenu />
            </Header>
            <Content
              className="layout-background"
            >
              {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Hypnos ©2022 Created by Desire ARRA</Footer>
          </Layout>
        </Layout>
    );
}

export default MainLayout;