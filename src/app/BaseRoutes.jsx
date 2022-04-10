/**
 * High level router.
 */

import React, {lazy} from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/Home'));
const Facilities = lazy(() => import('./pages/Facilities/Facilities'));
const Login = lazy(() => import('./pages/Auth/Login'));
const SignIn = lazy(() => import('./pages/Auth/SignIn'));
const MainLayout = lazy(() => import('./layout/MainLayout'));
const ErrorPage = lazy(() => import('./pages/Errors/ErrorPage'));

export function BaseRoutes() {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/etablissement/:id" element={<Facilities />} />
                <Route path="/connexion" element={<Login />} />
                <Route path="/inscription" element={<SignIn />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </MainLayout>
    );
}
