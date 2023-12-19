import moment from 'moment'

  export const audio = new Audio()

  export const formatDuration = (seconds: number) => moment.utc(seconds * 1000).format("mm:ss")

  export const searchMusic = (value:string, tracks)=>{
    const lowerCaseValue = value.toLowerCase()
    return tracks.filter((track)=> track.title.toLowerCase().includes(lowerCaseValue) || track.artists.toLowerCase().includes(lowerCaseValue))
    }

    