import {  } from 'react'
import Main from './Components/MainTracks/Main'
import style from './App.module.scss'
import PlayBar from './Components/PlayBar/PlayBar'

function App() {


  return (
    <div className={style.wrapper}>
      <Main/>
      <PlayBar/>
    </div>
  )
}

export default App
