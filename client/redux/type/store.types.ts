
type tracksType = {
  id: number,
  src: string,
  preview:string,
  title:string,
  duration: number,
  artists:string
 }
 type inputRegisterType = {
  login: string,
  email: string,
  password:string,
  checkPassword:string,
 }
 type inputLoginType = {
  email: string,
  password:string,
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
     visiblePlayBar: boolean,
     filterTracks: tracksType[],
   };

   export type stateUserType = {
     users:tracksType[],
     inputRegister:inputRegisterType,
     inputLogin:inputLoginType,
     authUser:authType,
  };

