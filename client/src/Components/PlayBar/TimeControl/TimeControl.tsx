import  { useEffect} from 'react'
import { audio, formatDuration } from '../../../function/function';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import { RootState } from '../../../../redux/type/type';
import { setCurrentTime } from '../../../../redux/slice/Tracks.slice';

export default function TimeControl() {
    const dispatch = useDispatch()

    const currentTrack = useSelector((state: RootState) => state.tracks.currentTrack);
    const currentTime = useSelector((state: RootState) => state.tracks.currentTime);
  
    const {duration} = currentTrack || {}
  
    const formatedCurrentTime = formatDuration(currentTime)
  
    const sliderCurrenttime = Math.round(((currentTime || 1) / (duration || 1) || 0) * 100)
  
    const handlerChangeCurrentTime = (event: Event, value: number | number[])=>{
      event.preventDefault()
      const time = Math.round((value as number / 100) * (duration || 1))
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
