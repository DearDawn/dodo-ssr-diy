import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client';
import axios from 'axios';
import { getCompName } from './utils.js';
import { PageMap } from './pages/index.js';

const init = async () => {
  const { compoName } = getCompName(location.pathname)
  const PageComp = PageMap[compoName]

  if (!PageComp) {
    location.href.replace('/home')
    return
  }

  const App = (await PageComp()).default
  const Comp = <App list={(window.__APP__ || {}).props} />
  const domNode = document.getElementById('root');

  if (location.search.includes('__csr=1')) {
    createRoot(domNode).render(Comp)
  } else {
    hydrateRoot(domNode, Comp);
  }
}

axios.defaults.baseURL = "http://localhost:4000"
init()