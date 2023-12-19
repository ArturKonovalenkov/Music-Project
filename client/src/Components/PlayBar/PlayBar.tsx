import style from "./PlayBar.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { Pause, PlayArrow, Shuffle, SkipNext, SkipPrevious} from '@mui/icons-material';
import {  setCurrentTrack, setIsPlaying, setTracks, setVisiblePlayBar } from '../../../redux/slice/Tracks.slice';
import {audio, formatDuration} from "../../function/function"
import TimeControl from './TimeControl/TimeControl';
import { RootState } from '../../../redux/type/type';
import ControlValume from "./ControlValume/ControlValume";
import { useEffect } from "react";




export default function PlayBar() {

    const dispatch = useDispatch()

    const isPlaying = useSelector((state: RootState)=> state.tracks.isPlaying)
    const currentTrack = useSelector((state: RootState) => state.tracks.currentTrack);
    const visiblePlayBar = useSelector((state: RootState)=> state.tracks.visiblePlayBar)
    const tracks = useSelector((state: RootState)=> state.tracks.tracks)
    console.log("🚀 ~ file: PlayBar.tsx:23 ~ PlayBar ~ tracks:", tracks)

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
          const currentIndex =  tracks.findIndex((track)=> track.id === currentTrack!.id) 
          if (currentIndex !== -1 && currentIndex + 1 < tracks.length ) {
            const nextTrack = tracks[currentIndex + 1]
            dispatch(setCurrentTrack(nextTrack)) ;
            dispatch(setIsPlaying(true));
            audio.src = nextTrack.src;
            audio.currentTime = 0;
            audio.play();
          }
        }
        
        useEffect(() => {
          audio.addEventListener('ended', handlerNext);
          return () => {
          audio.removeEventListener('ended', handlerNext);
      };
    }, [currentTrack, tracks]);

        const handlerPrevious = () =>{
            const currentIndex = tracks.findIndex((track)=> track.id === currentTrack!.id)
            if (currentIndex > 0 && currentIndex - 1 < tracks.length) {
              const previousTrack = tracks[currentIndex - 1]
              dispatch(setCurrentTrack(previousTrack)) ;
              dispatch(setIsPlaying(true));
              audio.src = previousTrack.src;
              audio.currentTime = 0;
              audio.play();
            }
          }

          const shuffleArray = () => {
            const randomTracks = [...tracks];
            for (let i = 0; i < randomTracks.length; i++) {
              const j = Math.floor(Math.random() * (i + 1));
              [randomTracks[i], randomTracks[j]] = [randomTracks[j], randomTracks[i]];
            }
            const currentIndex = randomTracks.findIndex((track) => track.id === currentTrack!.id);
            const splicedTrack = randomTracks.splice(currentIndex, 1)[0];
            randomTracks.unshift(splicedTrack);
            dispatch(setTracks(randomTracks))
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
        <IconButton onClick={shuffleArray}>
          <Shuffle />
        </IconButton>

        <div className={style.credits}>
          <h4>{title}</h4>
          <p>{artists}</p>
        </div>
          <ControlValume/>
        <div className={style.slider}>
           <TimeControl/>
          <p>{duration && formatDuration(duration)}</p>
        </div>
      </div>
  )
}
