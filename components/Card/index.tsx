import React from 'react';
import styles from './stylecard.module.css'

type Props = {
    title:string
    containerClass?:string
    children:Array<JSX.Element> | JSX.Element
}


function Card(props: Props) {
    return (
        <div className={styles.card} >
            <section style={{margin:'10px', padding:'15px'}}>
                <h3>{props.title}</h3>
                <article className={props.containerClass}>

                    {props.children}

                </article>
            </section>
        </div>
    );
}


export default Card;
