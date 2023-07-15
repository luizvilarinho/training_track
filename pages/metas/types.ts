export interface UserData {
    name:string
    email:string
    health_data: HealthData
}

export interface HealthData {
    height: number
    meta_calorias:number
    weight: number
    meta_macros: MacrosBasicos
}

export interface MacrosBasicos{
    p:number
    c: number
    g:number
}

export interface DistribuicaoMacros{
    calorias: number
    p:{
        qnt:number
        porcentagem:number
    }
    c:{
        qnt:number
        porcentagem:number
    }
    g:{
        qnt:number
        porcentagem:number
    }
}