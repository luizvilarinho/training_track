import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

interface Iprops {
  show: boolean
  mensagem: string
}

const InlineAlert: React.FC<Iprops> = ({show, mensagem}:Iprops) => {
  
  return (
    <>
        {show ? 
                <div className="red-alert-message">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <span style={{marginLeft:'10px'}}>{mensagem}</span>
                </div>
                
            :
            void(0)}
     
    </>
  )
}

export default InlineAlert;