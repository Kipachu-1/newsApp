import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { IntrPageVisible } from '../../context/MainContex';
import { DataManager } from '../../utilities/DataManager';
import Profile from '../Profile';
import IntrBlock from './IntrBlock'
import IntrBtn from './IntrBtn';

const IntrListPage = () => {
    const {IntrVisible, setIntrVisible} = useContext(IntrPageVisible)
    const [newList, setNewList] = useState([]);
    const [categories, setCategories] = useState(['Technology',"Science", "Health", "Sports", "Finance",'Self-Improvement', "E-Commerce", "Game", 'AI',
    'Food', 'Fashion', 'Entertainment', 'Travel', 'History', 'Religion', 'Social Issues', 'Parenting', 'Automotive', 'Gardening',
    'Business', 'Politics', 'Arts', 'Education', 'Lifestyle'])
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
            <div className='intr-list-header'>
                <h1>
                    Select Interests
                </h1>
                <Profile/>
            </div>
            <div className='interest-list'>
                {categories.map((intr)=>{
                    return <IntrBlock intr_name={intr} list={newList} setList={setNewList}/>
                })}
            </div>
            <IntrBtn onClick={handleSubmit}/>
        </motion.div>)
        }
    </AnimatePresence>
  )
}

export default IntrListPage