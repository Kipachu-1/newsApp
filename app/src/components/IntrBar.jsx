import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react'
import { CurrentInterest, IntrPageVisible } from '../context/MainContex';
import { DataManager } from '../utilities/DataManager';

const IntrBar = ({...props}) => {
    const {IntrVisible} = useContext(IntrPageVisible)
    const {setCurInterest} = useContext(CurrentInterest)
    const [intrList, setIntrList] = useState(["Trending"]);
    const [interested, setInterested] = useState('Trending')

    const handleInterest = (intr)=>{
        setInterested(intr)
        if(intr==='Trending'){
          setCurInterest('')
        } else {
          setCurInterest(intr)
        }
    }

    useEffect(()=>{
      DataManager.getInterests().then((data)=>setIntrList([...data]))
    }, [IntrVisible, ])
  return (
    <div className='intr-bar'>
        {intrList.map((item, index)=>{
            return <div key={index} className={`intr-name unselectable ${interested===item&&'intr-name-active'}`} >
            <p className='interest'  onClick={()=>{handleInterest(item)}}>{item}</p>
        </div>
        })}
    </div>
  )
}

export default IntrBar