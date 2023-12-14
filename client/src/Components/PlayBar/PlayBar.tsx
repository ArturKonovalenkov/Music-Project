import style from "./PlayBar.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
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
          const currentIndex = tracks.findIndex((track)=> track.id === currentTrack.id)
          console.log("🚀 ~ file: PlayBar.tsx:39 ~ handlerNext ~ currentIndex:", currentIndex)
          if (currentIndex !== -1 && currentIndex + 1 < tracks.length) {
            const nextTrack = tracks[currentIndex + 1]
            dispatch(setCurrentTrack(nextTrack)) ;
            dispatch(setIsPlaying(true));
            audio.src = nextTrack.src;
            audio.currentTime = 0;
            audio.play();
          }
        }

        const handlerPrevious = () =>{
            const currentIndex = tracks.findIndex((track)=> track.id === currentTrack.id)
            if (currentIndex > 0 && currentIndex - 1 < tracks.length) {
              const previousTrack = tracks[currentIndex - 1]
              dispatch(setCurrentTrack(previousTrack)) ;
              dispatch(setIsPlaying(true));
              audio.src = previousTrack.src;
              audio.currentTime = 0;
              audio.play();
            }
          }
        
  return (
    visiblePlayBar && 
      <div className={style.playbar}>
        <img className={style.preview} src={preview} alt="" />
        <IconButton onClick={handlerPrevious}>
          <SkipPrevious />
        </IconButton>
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
