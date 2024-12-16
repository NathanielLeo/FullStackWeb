import React from 'react'
import  LayoutFrontend  from './Layouts/frontend'
import { NotFound } from './Pages/frontend/NotFound';
import { useRoutes } from 'react-router-dom';
import RouterFrontend from './Router/Routerfrontend';
import Dashboard from './Layouts/backend';
import RouterBackend from './Router/RouterBackend';
import ProtectedRoute from './Pages/Backend/Auth/ProtectedRoute';
import Login from './Pages/Backend/Auth';
// import { LayoutBackend } from './Layouts/backend'

function App () {
  let element = useRoutes([
  {
    path:"/",
    element: <LayoutFrontend />,
    children: RouterFrontend
  }, 
  {
    path: "/admin",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: RouterBackend,
  },
  {
      path: "/login",
      element: <Login />,
  },
  { 
    path:"*",
    element: <NotFound />
  },

  ]); 
  return element;

}

export default App  
