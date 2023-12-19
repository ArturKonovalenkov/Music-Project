import { useEffect, useState } from 'react'
import { audio } from '../../../function/function';
import { Slider } from '@mui/material';
import { VolumeOff, VolumeUp } from '@mui/icons-material';
import style from "../PlayBar.module.scss"

const VOLUME_STORAGE_KEY = 'prevVolume';

export default function ControlValume() {
  
  const [volume, setVolume] = useState(() => {
    const storedPrevVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
    return storedPrevVolume ? parseFloat(storedPrevVolume) : 100;
  });
  console.log("🚀 ~ file: ControlValume.tsx:15 ~ const[volume,setVolume]=useState ~ volume:", volume)

    const [inVolume, setInVolume] = useState(false);


    const handleValume = (event, newValue) => {
        setVolume(newValue);

        audio.volume = newValue / 100; 
      };

      const handlerValumeOff = () => {
        if (volume === 0) {
            setInVolume(false)
            audio.volume = volume / 100;

        } else {
            setInVolume(true)
            setVolume(0);
            audio.volume = 0;
        }
    };
    useEffect(() => {
      audio.volume = volume / 100;
      localStorage.setItem(VOLUME_STORAGE_KEY, volume.toString());
      setInVolume(audio.volume === 0);
  }, [volume]);



  return (
         <>
         {inVolume ?  <VolumeOff onClick={handlerValumeOff}/> : <VolumeUp onClick={handlerValumeOff}/>}
         <Slider className={style.volume_slider} step={1} min={0} max={100} value={volume} onChange={handleValume} />
         </> 
             

  )
}
