import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation  } from "react-router-dom";
import {adminUrls, gerantUrls, clientUrls} from '../PrivateRoutes'
import {ImHome} from 'react-icons/im'
import { UserContext } from '../../../contexts/userProvider';

const { Sider } = Layout;

function Nav() {
  
  const { userStore } = React.useContext(UserContext);
  const { userInfos } = userStore;
  const location = useLocation(); 
  const [currentKey, setKey] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const dynamicNav = () => {
    switch (userInfos?.role) {
      case "ADMIN":
        return adminUrls
      case "GERANT":
        return gerantUrls
      case "CLIENT":
        return clientUrls
      default:
        return [];
    }
  }

  const getActiveKey = () => {
    const urls = dynamicNav();
    let current = 0;
    if(urls.length === 0) {
      return ['0']
    }

    urls.forEach((item, key) => {
      if(location.pathname === item.url){
        current = key+1
      }else if(location.pathname === "/"){
        current = ['0']
      }
    });
    if([current.toString()] !== currentKey){
      setKey([current.toString()])
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getActiveKey()
    // eslint-disable-next-line
  }, [userInfos])

  return ( 
      <Sider trigger={null} className="sider-nav">
        <div className="logo"/>
        {!loading ? (
        <Menu theme="light" mode="inline" defaultSelectedKeys={currentKey} className="main-nav">
          <Menu.Item key="0" icon={<ImHome className="nav-icon" />}>
            <Link to="/">Accueil</Link>
          </Menu.Item>
          {dynamicNav().map((item, k) => (
            <Menu.Item key={`${k+1}`} icon={item.icon}>
              <Link key={`link-${k+1}`} to={item.url}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
        ): false}
      </Sider>
  );
}

export default Nav;