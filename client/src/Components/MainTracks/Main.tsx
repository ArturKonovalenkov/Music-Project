import { useEffect} from 'react'
import style from "./Main.module.scss"
import OneTrack from './OneTracks/OneTrack';
import { Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/type/type';
import { setInput } from '../../../redux/slice/Tracks.slice';
import { musicAll } from '../../../redux/Thunk/Music.thunk';

export default function Main() {

  const dispatch = useDispatch()
  
  const tracks = useSelector((state: RootState)=> state.tracks.tracks)
  const input = useSelector((state: RootState)=> state.tracks.input)

  useEffect(() => {
    dispatch(musicAll(input))
  }, [input])

  return (
    <div className={style.search}>
        <Input className={style.input}  placeholder='Поиск треков' value={input} onChange={(e)=> dispatch(setInput(e.target.value)) } />
        <div className={style.list}>
            {tracks.map((track)=> <OneTrack key={track.id} track={track}/> )}
        </div>
    </div>
  )
}
