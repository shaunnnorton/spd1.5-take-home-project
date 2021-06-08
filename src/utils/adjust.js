const timeadjust = (time,offset) => {
    let splittimes = time.split(":")
    let new_hour = Number(splittimes[0]) + (offset/3600)
    if(new_hour < 0) {
        new_hour += 24
    }
    return `${new_hour}:${splittimes[1]}:${splittimes[2]}`
}


export default timeadjust