
type tracksType = {
  id: number,
  src: string,
  preview:string,
  title:string,
  duration: number,
  artists:string
 }
 type inputType = {
  login: string,
  email: string,
  password:string,
  checkPassword:string,
 }
 type authType = {
  name: string,
  auth: boolean,
 }

  export type stateType = {
     tracks: tracksType[]
     input:string,
     isPlaying:boolean,
     currentTrack: tracksType | null, 
     currentTime:number,
     visiblePlayBar: boolean
   };

   export type stateUserType = {
     users:tracksType[],
     inputs:inputType,
     authUser:authType,
  };

