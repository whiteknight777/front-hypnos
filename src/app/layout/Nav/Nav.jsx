import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation, useNavigate  } from "react-router-dom";
import {adminUrls, gerantUrls, clientUrls} from '../PrivateRoutes'
import {ImHome} from 'react-icons/im'
import { UserContext } from '../../../contexts/userProvider';

const { Sider } = Layout;

function Nav() {
  
  const { userStore } = React.useContext(UserContext);
  const { userInfos } = userStore;
  const isMounted = React.useRef(false);
  const location = useLocation(); 
  const nav = useNavigate()
  const [currentKey, setKey] = React.useState([])
  // const [loading, setLoading] = React.useState(true)

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

  // console.log(currentKey)
  // console.log(loading)

  const getActiveKey = () => {
    const urls = dynamicNav();
    let current = 0;
    if(urls.length === 0) {
      setKey([current.toString()])
      if(location.pathname !== '/' && userInfos === undefined){
        nav('/')
      }
    }else{
      urls.forEach((item, key) => {
        if(location.pathname === item.url){
          current = key+1
        }
      });
      if([current.toString()] !== currentKey){
        setKey([current.toString()])
      }
    }
  }

  React.useEffect(() => {
    isMounted.current = true;
    if(isMounted.current){
      getActiveKey()
    }
    // eslint-disable-next-line
    return () => {
      isMounted.current = false;
    }
    
    //eslint-disable-next-line
  }, [userInfos, userStore])

  return ( 
      <Sider trigger={null} className="sider-nav">
        <div className="logo"/>
        {isMounted.current ? (
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