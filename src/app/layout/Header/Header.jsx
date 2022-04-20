import React from 'react';
import { Button, Avatar, Modal, Drawer, Divider } from 'antd';
import { useNavigate } from "react-router-dom";
import {RiLoginBoxLine} from 'react-icons/ri'
import {BiUserCircle} from 'react-icons/bi'
import {adminUrls, clientUrls, gerantUrls} from '../PrivateRoutes'
import {BsList} from 'react-icons/bs'
import { UserContext, ActionTypes } from '../../../contexts/userProvider';
import { formatRoles } from '../../../utils/utils';
// import {formatRoles} from ''

function HeaderMenu() {
    const { userStore, dispatch } = React.useContext(UserContext);
    const { isAuthorized, userInfos } = userStore;
    const [visible, setVisible] = React.useState(false);
    const [openMobileMenu, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Voulez-vous vraiment vous déconnecter ?');
    const nav = useNavigate()

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('Vous allez être déconnecté dans quelques instant...');
        setLoading(true);
        setTimeout(() => {
          dispatch({ type: ActionTypes.logout });
          setVisible(false);
          setLoading(false);
          setModalText('Voulez-vous vraiment vous déconnecter ?');
          nav('/', { replace: true })
        }, 1500);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const dynamicDeskContent = () => {
        switch (isAuthorized) {
            case true:
                return (
                    <>
                        <div className="user-infos">
                            <Avatar className="avatar" icon={<BiUserCircle />} />
                            <span className="email">{`${userInfos.email}`}</span>
                        </div>
                        <Button className="loggout-btn" size="large" shape="round"
                            onClick={showModal}
                        >
                            <RiLoginBoxLine className="nav-icon"/> Déconnexion
                        </Button>
                    </>
                )
        
            default:
                return (
                    <>
                        <Button className="subscription-btn" size="large" shape="round"
                            onClick={() => {
                            nav('/inscription', { replace: true })
                        }}>
                            S'inscrire
                        </Button>
                        <Button className="connexion-btn" size="large" shape="round"
                            onClick={() => {
                            nav('/connexion', { replace: true })
                        }}>
                         Connexion
                        </Button>
                    </>
                )
        }
    }

    const dynamicMobileContent = () => {
        switch (isAuthorized) {
            case true:
                return (
                    <>
                        <li onClick={showModal}
                        >Déconnexion</li>
                    </>
                )
        
            default:
                return (
                    <>
                        <li onClick={() => {
                            nav('/inscription', { replace: true })
                            setOpen(false)
                        }}
                        >S'inscrire</li>
                        <li onClick={() => {
                                nav('/connexion', { replace: true })
                                setOpen(false)
                            }}
                        >Connexion</li>
                    </>
                )
        }
    }

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

    

    return ( 
        <div className="container">
            <div className="logo-mobile" 
                onClick={() => {
                    nav('/', { replace: true })
                }}
            />
            <div className="space"></div>
            <div className="actions-group">
               {dynamicDeskContent()}
            </div>
            <div className="mobile-menu">
                <Button className="mobile-menu-btn" size="large" shape="round"
                    onClick={() => {
                    setOpen(true)
                }}>
                    <BsList className="nav-icon"/>
                </Button>
                <Drawer
                title="Menu"
                placement={'right'}
                closable={true}
                onClose={() => {
                    setOpen(false)
                }}
                className="sidebar-mobile-menu"
                visible={openMobileMenu}
                key={'right'}
                >

                {isAuthorized ? (
                    <>
                    <div className="user-infos">
                        <Avatar className="avatar" icon={<BiUserCircle />} />
                        <small>{formatRoles(userInfos.role)}</small>
                        <span className="email">{`${userInfos.email}`}</span>
                    </div>
                    <Divider className="divider"/>
                    </>
                ): false}
                <ul>
                    <li onClick={() => {
                            nav('/', { replace: true })
                            setOpen(false)
                        }}
                    >Accueil</li>
                    {dynamicNav().map((item, k) => (
                        <li key={`mobile-nav-${k+1}`} icon={item.icon} onClick={() => {
                            nav(item.url, { replace: true })
                            setOpen(false)
                        }}>
                            {item.name}
                        </li>
                    ))}
                    <Divider className="divider"/>
                    {dynamicMobileContent()}
                </ul>

                </Drawer>
            </div>
            <Modal
                title="Déconnexion"
                visible={visible}
                onOk={()=> {
                    handleOk()
                }}
                okText="Se déconnecter"
                cancelText="Annuler"
                confirmLoading={loading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    );
}

export default HeaderMenu;