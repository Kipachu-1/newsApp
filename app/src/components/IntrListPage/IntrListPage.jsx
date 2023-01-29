import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { IntrPageVisible } from '../../context/MainContex';
import { DataManager } from '../../utilities/DataManager';
import IntrBlock from './IntrBlock'
import IntrBtn from './IntrBtn';

const IntrListPage = () => {
    const {IntrVisible, setIntrVisible} = useContext(IntrPageVisible)
    const [newList, setNewList] = useState([]);
    useEffect(()=>{
        console.log(newList);
    }, [newList])
    useEffect(()=>{
        DataManager.getInterests().then(data=>setNewList([...data]))
    }, [IntrVisible])

    const handleSubmit =()=>{
        DataManager.updateInterests(newList);
        setIntrVisible(false);
    }

  return (
    <AnimatePresence> 
        {IntrVisible &&
        (<motion.div initial={{bottom:'-100%', top:'100%', opacity:0}}
        animate={{bottom:'0', top:'0', opacity:1}}
        exit={{bottom:'-100%', top:'100%', opacity:0}}
        transition={{duration:0.25}}
        className='interest-list-page unselectable'>
            <div>
                <h1>
                    Select Interests
                </h1>
            </div>
            <div className='interest-list'>
            <IntrBlock intr_name={'Science'} list={newList} setList={setNewList}/>
            <IntrBlock intr_name={'Health'} list={newList} setList={setNewList}/>
            <IntrBlock intr_name={'Sports'} list={newList} setList={setNewList}/>
            <IntrBlock intr_name={'Finance'} list={newList} setList={setNewList}/>
            <IntrBlock intr_name={'E-Commerce'} list={newList} setList={setNewList}/>
            <IntrBlock intr_name={'Game'} list={newList} setList={setNewList}/>
            <IntrBlock intr_name={'Environment'} list={newList} setList={setNewList}/>


           
            </div>
            <IntrBtn onClick={handleSubmit}/>
        </motion.div>)
        }
    </AnimatePresence>
  )
}

export default IntrListPage