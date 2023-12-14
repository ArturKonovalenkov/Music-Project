import style from "./PlayBar.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import { setIsPlaying, setVisiblePlayBar } from '../../../redux/slice/Tracks.slice';
import {audio, formatDuration} from "../../Tracks/Tracks"
import TimeControl from './TimeControl/TimeControl';
import { RootState } from '@reduxjs/toolkit/query';



export default function PlayBar() {

    const dispatch = useDispatch()

    const isPlaying = useSelector((state: RootState)=> state.tracks.isPlaying)
    const currentTrack = useSelector((state: RootState) => state.tracks.currentTrack);
    const visiblePlayBar = useSelector((state: RootState)=> state.tracks.visiblePlayBar)

    const {title, artists, preview, duration} = currentTrack || {}

    const handleToggle = () => {    
        if (isPlaying) {
            audio.pause();
            dispatch(setIsPlaying(false));
          } else {
            audio.play();
            dispatch(setIsPlaying(true));
            dispatch(setVisiblePlayBar(true))
          }
      };

  return (
    visiblePlayBar && 
      <div className={style.playbar}>
        <img className={style.preview} src={preview} alt="" />
        <IconButton onClick={handleToggle}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <div className={style.credits}>
          <h4>{title}</h4>
          <p>{artists}</p>
        </div>
        <div className={style.slider}>
           <TimeControl/>
          <p>{formatDuration(duration)}</p>
        </div>
      </div>
  )
}
