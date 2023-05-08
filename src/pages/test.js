import React from 'react'
import '../style.css'
import { getList } from '../api';
import axios from 'axios';

const App = (props) => {
  const { list = [] } = props

  const [info, setInfo] = React.useState({})
  const [selfList, setSelfList] = React.useState(list)

  React.useEffect(() => {
    if (list.length) return

    getList().then(res => setSelfList(res))
  }, [list.length])

  React.useEffect(() => {
    axios.get('/api/test').then(res => {
      console.log('[dodo] ', 'res', res.data)
    })
    setInfo((window.__APP__ || {}).globalData)
  }, [])

  return (
    <div>
      <div>test: {JSON.stringify(info)}</div>
      {selfList.map((it, id) => (
        <div id='inline' key={id} className='inline'>{it}</div>
      ))}
    </div>
  );
};


App.getInitialData = async () => {
  console.log('[dodo] ', '1111', 1111)
  return await getList('test')
}


export default App;
