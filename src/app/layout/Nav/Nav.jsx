import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import {RiLayout2Line} from 'react-icons/ri'
import {ImHome} from 'react-icons/im'
import { UserContext } from '../../../contexts/userProvider';

const { Sider } = Layout;

function Nav() {
  
  const { userStore } = React.useContext(UserContext);
  const { userInfos } = userStore;
  const adminUrls = [
    {
      name: "Tableau de bord", 
      url:"/admin/tableau-de-bord", 
      icon: <RiLayout2Line className="nav-icon" />
    }
  ]

  const dynamicNav = () => {
    switch (userInfos?.role) {
      case "ROLE_ADMIN":
        return adminUrls
      default:
        return [];
    }
  }

  return ( 
      <Sider trigger={null} className="sider-nav">
        <div className="logo"/>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} className="main-nav">
          <Menu.Item key="1" icon={<ImHome className="nav-icon" />}>
            <Link to="/">Accueil</Link>
          </Menu.Item>
          {dynamicNav().map((item, k) => (
            <Menu.Item key={`nav-${k+1}`} icon={item.icon}>
              <Link key={`link-${k+1}`} to={item.url}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
  );
}

export default Nav;