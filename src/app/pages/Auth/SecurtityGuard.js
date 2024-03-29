import React, { useRef, useEffect, useState, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext, ActionTypes } from '../../../contexts/userProvider';
import { GetUserByToken } from '../../../utils/requests/auth';
import Loader from '../../layout/Loader/Loader';

/*
* User connexion verify
* Check on load if user access token exist 
* if token exist get user informations from API
* update user store and activate guard
*/
function SecurtityGuard(props) {
    const didRequest = useRef(false);
    const { userStore, dispatch } = useContext(UserContext);
    const { isAuthorized, userInfos } = userStore;
    const [showLoaderScreen, setLoaderScreen] = useState(true);
    const accessToken = sessionStorage.getItem('accessToken');

    // We should request user by authToken before rendering component
    useEffect(() => {
        const requestUser = async () => {
            try {
                GetUserByToken(accessToken).then(res => {
                    const { data } = res.data;
                    dispatch({
                        type: ActionTypes.userLoaded,
                        payload: { userInfos: data }
                    });
                });
            } catch (error) {
                dispatch({ type: ActionTypes.logout });
                console.error(error);
            } finally {
                setLoaderScreen(false);
            }

            return () => {
                didRequest.current = true;
            };
        };
        if(userInfos === undefined) requestUser()
        // eslint-disable-next-line
    }, [isAuthorized, accessToken, dispatch]);  

    return showLoaderScreen ? <Loader /> : <Guard userStore={userStore} accessToken={accessToken}>{props.component}</Guard>;
}


/*
* Router Guard
* Check if path contain key words (admin, gerant, user)
* redirect to content or redirect to 403 error page
*/
const Guard = ({children, userStore, accessToken}) => {
    const {pathname} = document.location
    const { isAuthorized, userInfos } = userStore;
    // console.log(userInfos)
    const checkPath = () => {
        if(pathname.search('/admin') === -1 
        && pathname.search('/gerant') === -1
        && pathname.search('/client') === -1
        ){
            return children
        }
        if(isAuthorized || accessToken) {
            if((pathname.search('/admin') !== -1 && userInfos?.role === "ADMIN") || accessToken){
                return children
            }
            if((pathname.search('/gerant') !== -1 && userInfos?.role === "GERANT")|| accessToken){
                return children
            }
            if((pathname.search('/client') !== -1 && userInfos?.role === "CLIENT")|| accessToken){
                console.log('fired in')
                return children
            }
        }
        return <Navigate to="/403" replace={true} />
    }
    return checkPath()
}

export default SecurtityGuard;
