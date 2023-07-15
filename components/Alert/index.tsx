import React from 'react';

import s from './alert.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faBell } from '@fortawesome/free-solid-svg-icons';

interface Iprops {
  show: boolean
  mensagem: string
}

const Alert: React.FC<Iprops> = ({show, mensagem}:Iprops) => {
  
  return (
    <>
     <div className={`${s.alert} ${show? 'alertShow' : 'alertHide'}`}>
        <p>
          <FontAwesomeIcon icon={faBell} />
          {mensagem}</p>
      </div>
     
    </>
  )
}

export default Alert;