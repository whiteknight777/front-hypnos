import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BaseRoutes } from './BaseRoutes';

function App({basename}) {
  return (
    /* Add high level `Suspense` in case if was not handled inside the React tree.  */
    <React.Suspense fallback={'...base loading'}>
    {/* Override `basename` (e.g: `homepage` in `package.json`) */}
      <BrowserRouter basename={basename}>
          <BaseRoutes />
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
