import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

import HomePage from '../pages/Home'
import User from '../pages/User';
import Role from '../pages/vaitro/Role';
import { PrivateRoute } from './utils'
export const AppRouter = () => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <PrivateRoute path="/nguoi-dung" component={User} />
      <PrivateRoute path="/vai-tro" component={Role} />
      <PrivateRoute path="/home" component={HomePage} />
    </Router>
  )
};
