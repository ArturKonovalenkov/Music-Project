import React, { useEffect} from 'react'
import { audio, formatDuration } from '../../../Tracks/Tracks';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import { RootState } from '@reduxjs/toolkit/query';
import { setCurrentTime } from '../../../../redux/slice/Tracks.slice';

export default function TimeControl() {
    const dispatch = useDispatch()

    const currentTrack = useSelector((state: RootState) => state.tracks.currentTrack);
    const currentTime = useSelector((state: RootState) => state.tracks.currentTime);
  
    const {duration} = currentTrack || {}
  
    const formatedCurrentTime = formatDuration(currentTime)
  
    const sliderCurrenttime = Math.round((currentTime / duration || 0) * 100)
  
    const handlerChangeCurrentTime = (_, value: number)=>{
      const time = Math.round((value/100) * duration)
      dispatch(setCurrentTime(time))
      audio.currentTime = time
  }
  
    useEffect(()=>{
      const time = setInterval(()=>{
          dispatch(setCurrentTime(audio.currentTime))
      },1000)

      return ()=>{
          clearInterval(time)
      }

  },[])

  return (
    <>
      <p>{formatedCurrentTime}</p>
      <Slider step={1} min={0} max={100} value={sliderCurrenttime} onChange={handlerChangeCurrentTime}/>
    </>
  )
  }
