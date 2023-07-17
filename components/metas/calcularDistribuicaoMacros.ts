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

export default function calcularDistribuicaoMacros(macros:DistribuicaoMacros, macro?:string, value?:number) : DistribuicaoMacros{
   
    console.log("CALC", macros, macro,value)
    //quando abre a telae macros == 0
    if((macro === undefined && macros.p.qnt === 0) ||(macro === undefined && macros.p.porcentagem != 0)){
        console.log("CALCif",1)
        macros.p = {
            qnt: Math.round((macros.calorias * 0.4) / 4),
            porcentagem:40
        }  
        macros.c = {
            qnt: Math.round((macros.calorias*0.4) / 4),
            porcentagem:40
        }
        macros.g = {
            qnt: Math.round((macros.calorias*0.2) / 9),
            porcentagem:20
        }

        return macros

    }

    //quando abrena tela e macros != 0
    if(macro === undefined && macros.p.qnt != 0){
        console.log("CALCif",2)
        macros.p = {
            qnt: macros.p.qnt,
            porcentagem:Math.round((macros.p.qnt * 4) * 100 / macros.calorias)
        }  
        macros.c = {
            qnt: macros.c.qnt,
            porcentagem:Math.round((macros.c.qnt * 4) * 100 / macros.calorias)
        }
        macros.g = {
            qnt: macros.g.qnt,
            porcentagem:Math.round((macros.g.qnt * 9) * 100 / macros.calorias)
        }

        return macros
    }

    if(macro === 'p' && value){
        console.log("CALCif",3)
        console.log(macros)
        macros.p = {
            qnt: value,
            porcentagem: Math.round((value * 4) * 100 / macros.calorias)
        }  
        macros.c = {
            qnt: Math.round( (macros.calorias - ((value * 4) + (macros.g.qnt * 9)))/4 ),
            porcentagem: Math.round(100 - ((value * 4) * 100 / macros.calorias + macros.g.porcentagem))
        }
        macros.g = {
            qnt: macros.g.qnt,
            porcentagem:macros.g.porcentagem
        }
    }

    if(macro === 'c' && value){
        console.log("CALCif",4)
        macros.p = {
            qnt: macros.p.qnt,
            porcentagem:macros.p.porcentagem
        }  
        macros.c = {
            qnt: value,
            porcentagem: Math.round((value * 4) * 100 / macros.calorias)
        }
        macros.g = {
            qnt: Math.round((macros.calorias - ((macros.p.qnt * 4) + (value * 4)))/ 9 ),
            porcentagem: Math.round(100 - ((value * 4) * 100 / macros.calorias + macros.p.porcentagem) )
        }
    }
    
    console.log("nenhum if")

    return macros
}