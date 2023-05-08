import React from 'react'
import ReactDOM from 'react-dom'
import { hydrateRoot, createRoot } from 'react-dom/client';
import axios from 'axios';
import { getCompName } from './utils.js';
import { PageMap } from './pages/index.js';
axios.defaults.baseURL = "http://localhost:4000"

const domNode = document.getElementById('root');
const { compoName } = getCompName(location.pathname)
const PageComp = PageMap[compoName]

if (!PageComp) {
  location.href.replace('/home')
} else {
  const AppTemp = PageComp
  AppTemp().then(res => {
    const App = res.default
    const Comp = <App list={(window.__APP__ || {}).props} />

    if (location.search.includes('__csr=1')) {
      createRoot(domNode).render(Comp)
    } else {
      hydrateRoot(domNode, Comp);
    }
  })
}

