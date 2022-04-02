/**
 * High level router.
 */

import React, {lazy} from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/Home'));
const ErrorPage = lazy(() => import('./pages/Errors/ErrorPage'));

export function BaseRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}
