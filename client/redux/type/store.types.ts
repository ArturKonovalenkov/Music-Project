
type tracksType = {
  id: number,
  src: string,
  preview:string,
  title:string,
  duration: number,
 }

  export type stateType = {
     tracks: tracksType[]
     input:string,
     isPlaying:boolean,
     currentTrack:null,
     currentTime:number,
     visiblePlayBar: boolean
   };

