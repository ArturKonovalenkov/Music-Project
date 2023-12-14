
type tracksType = {
  id: number,
  src: string,
  preview:string,
  title:string,
  duration: number,
  artists:string
 }

  export type stateType = {
     tracks: tracksType[]
     input:string,
     isPlaying:boolean,
     currentTrack: tracksType | null, 
     currentTime:number,
     visiblePlayBar: boolean
   };

