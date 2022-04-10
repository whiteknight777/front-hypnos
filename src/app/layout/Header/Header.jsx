import React from 'react';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import {RiLoginBoxLine, RiRotateLockLine} from 'react-icons/ri'

function HeaderMenu() {
    const nav = useNavigate()
    return ( 
        <div className="container">
            <div className="space"></div>
            <div className="actions-group">
                <Button className="connexion-btn" size="large" shape="round"
                onClick={() => {
                    nav('/connexion', { replace: true })
                }}>
                 <RiRotateLockLine className="nav-icon"/> Connexion
                </Button>
                <Button className="subscription-btn" size="large" shape="round"
                onClick={() => {
                    nav('/inscription', { replace: true })
                }}>
                <RiLoginBoxLine className="nav-icon"/> S'inscrire
                </Button>
            </div>
        </div>
    );
}

export default HeaderMenu;