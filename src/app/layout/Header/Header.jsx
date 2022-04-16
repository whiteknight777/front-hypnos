import React from 'react';
import { Button, Avatar } from 'antd';
import { useNavigate } from "react-router-dom";
import {RiLoginBoxLine} from 'react-icons/ri'
import {FaRegUserCircle} from 'react-icons/fa'
import { UserContext, ActionTypes } from '../../../contexts/userProvider';

function HeaderMenu() {
    const { userStore, dispatch } = React.useContext(UserContext);
    const { isAuthorized, userInfos } = userStore;
    const nav = useNavigate()

    const dynamicContent = () => {
        switch (isAuthorized) {
            case true:
                return (
                    <>
                        <div className="user-infos">
                            <Avatar className="avatar" icon={<FaRegUserCircle />} />
                            <span className="email">{`${userInfos.email}`}</span>
                        </div>
                        <Button className="loggout-btn" size="large" shape="round"
                            onClick={() => {
                            dispatch({ type: ActionTypes.logout });
                        }}>
                            <RiLoginBoxLine className="nav-icon"/> Déconnexion
                        </Button>
                    </>
                )
        
            default:
                return (
                    <>
                        <Button className="connexion-btn" size="large" shape="round"
                            onClick={() => {
                            nav('/connexion', { replace: true })
                        }}>
                         Connexion
                        </Button>
                        <Button className="subscription-btn" size="large" shape="round"
                            onClick={() => {
                            nav('/inscription', { replace: true })
                        }}>
                            S'inscrire
                        </Button>
                    </>
                )
        }
    }

    return ( 
        <div className="container">
            <div className="space"></div>
            <div className="actions-group">
               {dynamicContent()}
            </div>
        </div>
    );
}

export default HeaderMenu;