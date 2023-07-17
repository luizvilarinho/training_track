export function toBrLocaleDate(data:string){
    const [y, m, d] = data.split('-')
    return `${d}/${m}/${y}`
}

export function toEUALocaleDate(data:string){
    //console.log("DATA", data)
    const [d,m,y] = data.split('/')
    return `${y}-${m}-${d}`
}
