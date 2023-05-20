import React, { useState, useEffect } from 'react';
import './App.css'
import {fabric} from 'fabric'
import { useRoutes } from './utils/useRouts';
import { useSelector } from 'react-redux';

export default function App() {
  console.log(localStorage.getItem('jwt'))
  const routes = useRoutes(Boolean(localStorage.getItem('jwt')))
  return(
    <div>
      {routes}
    </div>
  );
}

