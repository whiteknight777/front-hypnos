/**
 * High level router.
 */

import React, {lazy} from 'react';
import { Routes, Route } from 'react-router-dom';
import SecurtityGuard from './pages/Auth/SecurtityGuard';

const Home = lazy(() => import('./pages/Home/Home'));

const DashboardAdmin = lazy(() => import('./pages/Admin/Dashboard/Dashboard'));
const UsersAdmin = lazy(() => import('./pages/Admin/Users/UsersAdmin'));
const MessagesAdmin = lazy(() => import('./pages/Admin/Messages/MessagesAdmin'));

const DashboardClient = lazy(() => import('./pages/Client/Dashboard'));
const Facilities = lazy(() => import('./pages/Facilities/Facilities'));
const Login = lazy(() => import('./pages/Auth/Login'));
const SignIn = lazy(() => import('./pages/Auth/SignIn'));
const MainLayout = lazy(() => import('./layout/MainLayout'));
const ErrorPage = lazy(() => import('./pages/Errors/ErrorPage'));
const NotAuthorizedPage = lazy(() => import('./pages/Errors/NotAuthorizedPage'));

export function BaseRoutes() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<SecurtityGuard component={<Home />}/>} />
                <Route path="/etablissement/:id" element={<SecurtityGuard component={<Facilities />}/>}/>
                <Route path="/connexion" element={<Login />} />
                <Route path="/inscription" element={<SignIn />} />
                {/* ADMIN */}
                <Route path="/admin/tableau-de-bord" element={<SecurtityGuard component={<DashboardAdmin />}/>}/>
                <Route path="/admin/utilisateurs" element={<SecurtityGuard component={<UsersAdmin />}/>}/>
                <Route path="/admin/messages" element={<SecurtityGuard component={<MessagesAdmin />}/>}/>
                {/* END ADMIN */}
                <Route path="/client" element={<SecurtityGuard component={<DashboardClient />}/>}>
                    <Route path="mon-compte" element={<SecurtityGuard component={<DashboardClient />}/>}/>
                </Route>
                <Route path="/403" element={<SecurtityGuard component={<NotAuthorizedPage />}/>} /> 
                <Route path="*" element={<SecurtityGuard component={<ErrorPage />}/>} /> 
            </Routes>
        </MainLayout>
    );
}
