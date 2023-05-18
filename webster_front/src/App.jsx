import React, { useState, useEffect } from 'react';
import './App.css'
import {fabric} from 'fabric'
import { useRoutes } from './utils/useRouts';
import { useSelector } from 'react-redux';
import useAuth from './utils/useAuth';

export default function App() {
  const {user} = useSelector((state) => state.user)
  useAuth()
  const routes = useRoutes(Boolean(user?.id))
  return(
    <div>
      {routes}
    </div>
  );
}

