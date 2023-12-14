import style from "./PlayBar.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { Pause, PlayArrow, SkipNext } from '@mui/icons-material';
import { setCurrentTime, setCurrentTrack, setIsPlaying, setVisiblePlayBar } from '../../../redux/slice/Tracks.slice';
import {audio, formatDuration} from "../../Tracks/Tracks"
import TimeControl from './TimeControl/TimeControl';
import { RootState } from '@reduxjs/toolkit/query';
import { useState } from "react";



export default function PlayBar() {

    const dispatch = useDispatch()

    const isPlaying = useSelector((state: RootState)=> state.tracks.isPlaying)
    const currentTrack = useSelector((state: RootState) => state.tracks.currentTrack);
    const visiblePlayBar = useSelector((state: RootState)=> state.tracks.visiblePlayBar)
    const tracks = useSelector((state: RootState)=> state.tracks.tracks)

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
      const handlerNext = () =>{
        console.log("ok");
          const currentIndex = tracks.findIndex((track)=> track.id === currentTrack.id)
          console.log("🚀 ~ file: PlayBar.tsx:39 ~ handlerNext ~ currentIndex:", currentIndex)
          if (currentIndex !== -1 && currentIndex + 1 < tracks.length) {
            dispatch(setCurrentTrack(tracks[currentIndex + 1])) ;
            dispatch(setIsPlaying(true));
            audio.src = currentTrack.src;
            audio.currentTime = 0;
            audio.play();
          }
        }
        
        audio.onended = () => {
          // Здесь вы можете реализовать логику для автоматического переключения на следующий трек
          handlerNext();
      };
  return (
    visiblePlayBar && 
      <div className={style.playbar}>
        <img className={style.preview} src={preview} alt="" />
        <IconButton onClick={handleToggle}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={handlerNext}>
        <SkipNext />
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
