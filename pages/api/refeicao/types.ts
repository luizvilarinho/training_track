import {Decimal} from "@prisma/client/runtime";

export type alimentoType = {
    "nome": string
    "qnt": Decimal
    "cal": number,
    "p": number,
    "c": number,
    "g": number,
    "f": number
    "date": Date
    "tipo": tipoRefeicaoType
}

export type tipoRefeicaoType = {
    id:number,
    tipo: string
}
