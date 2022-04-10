import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BaseRoutes } from './BaseRoutes';
import Loader from './layout/Loader/Loader';

function App() {

  return (
    /* Add high level `Suspense` in case if was not handled inside the React tree.  */
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
          <BaseRoutes />
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
