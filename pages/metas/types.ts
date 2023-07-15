interface UserData {
    name:string
    email:string
    health_data: HealthData
}

interface HealthData {
    height: number
    meta_calorias:number
    weight: number
    meta_macros: MacrosBasicos
}

interface MacrosBasicos{
    p:number
    c: number
    g:number
}

interface DistribuicaoMacros{
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