import React from 'react';
import { Layout } from 'antd';
import Nav from './Nav/Nav'
import './Layout.scss'

const { Content } = Layout;

function MainLayout(props) {
    const {children} = props;
    
    return (
        <Layout className="base-layout">
          <Nav/>
          <Layout className="content-layout">
            <Content
              className="layout-background"
            >
              {children}
            </Content>
          </Layout>
        </Layout>
    );
}

export default MainLayout;