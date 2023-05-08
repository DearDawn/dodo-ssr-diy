import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { readFileSync } from 'fs';
import { getCompName } from './utils.js';
import { PageMap } from './pages/index.js';
import { getInitialData } from './api.js';

const app = express();

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
app.get('/api/test', (req, res) => {
  console.log('[dodo] ', 'test')
  res.send(JSON.stringify({
    data: 'hello world!',
    status: 0,
    message: 'success'
  }))
})

app.get('/*', async (req, res) => {
  const { pathName, compoName } = getCompName(req.path)
  const PageComp = PageMap[compoName]

  if (!PageComp) {
    res.send("404")
    return
  }

  const isCSR = req.url.includes('__csr=1')
  const App = (await PageComp()).default
  const list = isCSR ? [] : await App.getInitialData() || []
  const appString = isCSR ? '' : ReactDOMServer.renderToString(<App list={list} />);
  const styleStr = readFileSync(path.join(__dirname, `../dist/src_pages_${pathName}_js.css`)).toString('utf-8')
  const APP_DATA = {
    props: list,
    ...(await getInitialData())
  }

  res.send(`
    <html>
      <head>
        <title>My SSR App</title>
        <style>${styleStr}</style>
        <script src="/dist/js.js" defer></script>
        <script>window.__APP__=${JSON.stringify(APP_DATA)}</script>
      </head>
      <body>
        <div id="root">${appString}</div>
      </body>
    </html>
  `);
});

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});