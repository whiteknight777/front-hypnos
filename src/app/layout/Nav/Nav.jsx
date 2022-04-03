import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import {RiLayout2Line, RiLoginBoxLine, RiRotateLockLine} from 'react-icons/ri'


const { Sider } = Layout;

function Nav() {
    return ( 
        <Sider trigger={null} className="sider-nav">
          <div className="logo"/>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} className="main-nav">
            <Menu.Item key="1" icon={<RiLayout2Line className="nav-icon" />}>
              <Link to="/">Accueil</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<RiRotateLockLine className="nav-icon" />}>
              <Link to="/connexion">Connexion</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<RiLoginBoxLine className="nav-icon"/>}>
              <Link to="/inscription">Inscription</Link>
            </Menu.Item>
          </Menu>
        </Sider>
    );
}

export default Nav;