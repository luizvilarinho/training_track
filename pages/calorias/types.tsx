export type Alimento= {
    id?:number
    alimento:string
    cal:number
    p:number
    c:number
    g:number
    f:number
    tipo?:TipoALimento
    qnt?:number
    nome?:string
}

export type TipoALimento = {
    id:number,
    tipo:string
}
