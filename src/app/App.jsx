import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../contexts/userProvider';
import { BaseRoutes } from './BaseRoutes';
import Loader from './layout/Loader/Loader';

function App() {

  return (
    /* Add high level `Suspense` in case if was not handled inside the React tree.  */
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
          <UserProvider>
              <BaseRoutes />
          </UserProvider>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
