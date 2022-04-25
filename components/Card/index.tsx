import React from 'react';

type Props = {
    title:string
    containerClass:string
    children:Array<JSX.Element> | JSX.Element
}

function Card(props: Props) {
    return (
        <section>
            <h3>{props.title}</h3>
            <article className={props.containerClass}>
                
                {props.children}

            </article>
            
        </section>
    );
}

export default Card;