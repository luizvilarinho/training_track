import type { NextPage } from 'next'
import styles from './homeCardCalorias.module.css'
import Link from "next/link";
import React from "react";

type Props = {
    calculo:{
        success:boolean,
        cal:number,
        p:number,
        c:number,
        g:number,
        f:number
    }
}
const HomeCardCalorias:  React.FC<Props> = (props: Props) => {
    return (
        <div className={`${styles.homeCardCalorias}`}>

            <table>
                <thead>
                <tr>
                    <th><span>Prot.</span></th>
                    <th><span>Carb.</span></th>
                    <th><span>Gord.</span></th>
                    <th><span>Fibr.</span></th>
                    <th className={styles.none}></th>
                    <th><span>Cal</span></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.calculo.p}</td>
                        <td>{props.calculo.c}</td>
                        <td>{props.calculo.g}</td>
                        <td>{props.calculo.f}</td>
                        <td></td>
                        <td>{props.calculo.cal}</td>
                    </tr>
                </tbody>
            </table>

            <div className={`${styles.btnContainer} align--center`}>
                <Link href={'/calorias'}>
                    <button>adicionar</button>
                </Link>
            </div>
        </div>
    )
}

export default HomeCardCalorias;
