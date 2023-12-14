import style from "./OneTrack.module.scss"
import { IconButton } from '@mui/material'
import { Pause, PlayArrow } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTrack, setIsPlaying, setVisiblePlayBar } from '../../../../redux/slice/Tracks.slice'
import cn from "classnames"
import {audio,formatDuration} from "../../../Tracks/Tracks"
import { RootState } from '../../../../redux/type/type'

interface TrackType {
  id: number;
  src: string;
  preview:string;
  title:string;
  duration: number;
  artists:string;
 }

export default function OneTrack({track}: { track: TrackType }) {
  const dispatch = useDispatch()

  const {id, src, preview, title, duration, artists} = track

  const isPlaying = useSelector((state: RootState)=> state.tracks.isPlaying)
  const currentTrack = useSelector((state: RootState) => state.tracks.currentTrack);


  const isCurrentTrack = currentTrack  && currentTrack.id === id;
  
  const handlerToggle = (track: TrackType) => {
    if (isCurrentTrack) {
      if (isPlaying) {
        audio.pause();
        dispatch(setIsPlaying(false));
      } else {
        audio.play();
        dispatch(setIsPlaying(true));
      }
    } else {
      dispatch(setIsPlaying(true));
      dispatch(setCurrentTrack(track));
      audio.src = src;
      audio.currentTime = 0;
      audio.play();
      dispatch(setVisiblePlayBar(true))
      
    }
  };
    
  return (
    <div className={cn(style.track, isCurrentTrack && style.playing)}>
      <IconButton onClick={()=>handlerToggle(track)}>
      {isCurrentTrack && isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img className={style.preview} src={preview} alt="not-icon" />
      <div className={style.credits}>
        <b>{title}</b>
        <p>{artists}</p>
      </div>
      <p>{formatDuration(duration)}</p>
    </div>
  )
}
