import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import checkBoxIcon from '../../static/icons/checkbox.svg'
import { DataManager } from '../../utilities/DataManager'
const IntrBlock = ({intr_name, list, setList, ...props}) => {
    const handleClick = ()=>{
        if(list.includes(intr_name)) {
           DataManager.updateList(list, 'remove', intr_name).then((data)=>{
            setList([...data]);
           });
        } else {
           DataManager.updateList(list, 'add', intr_name).then((data)=>{
            setList([...data]);
           });
        }
    }
  return (
    <div className='IntrBlock' onClick={handleClick}>
        <div className='Checkbox-el'>
            {list.includes(intr_name)&&<img src={checkBoxIcon} alt="" />}
        </div>
        <div className='Intr-name-container'>
            <p className='Intr-name'>
                {intr_name}
            </p>
        </div>
    </div>
  )
}

export default IntrBlock