import { useEffect} from 'react'
import {trackList} from "../../Tracks/Tracks"
import style from "./Main.module.scss"
import OneTrack from './OneTracks/OneTrack';
import { Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/type/type';
import { setInput, setTracks } from '../../../redux/slice/Tracks.slice';

export default function Main() {

  const dispatch = useDispatch()
  
  const tracks = useSelector((state: RootState)=> state.tracks.tracks)
  console.log("🚀 ~ file: Main.tsx:15 ~ Main ~ tracks:", tracks)
  const input = useSelector((state: RootState)=> state.tracks.input)

  useEffect(() => {
    dispatch(setTracks(trackList))
  }, [])

  const searchMusic = (value:string)=>{
    const lowerCaseValue = value.toLowerCase()
    return tracks.filter((track)=> track.title.toLowerCase().includes(lowerCaseValue) || track.artists.toLowerCase().includes(lowerCaseValue))
    }
    
    const searchedMusic = searchMusic(input)

  useEffect(() => {
    dispatch(setTracks(searchedMusic))
  }, [dispatch])




  
  return (
    <div className={style.search}>
        <Input className={style.input} placeholder='Поиск треков' value={input} onChange={(e)=> dispatch(setInput(e.target.value)) } />
        <div className={style.list}>
            {searchedMusic.map((track)=> <OneTrack key={track.id} track={track}/> )}
        </div>
    </div>
  )
}
