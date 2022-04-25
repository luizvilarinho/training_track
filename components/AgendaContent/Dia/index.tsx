import React, { useState } from 'react';

type Props = {
    day:string
    className: string
}

function Dia(props: Props) {

    const [workedClass, setWorkedClass] = useState('');

    return (
        <>
            <div className={`${props.className} ${workedClass}` } data-dia={props.day} onClick={()=>{
                workedClass === 'worked' ? setWorkedClass('') : setWorkedClass('worked')
            }}></div>
        </>
    );
}

export default Dia;