import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const EditorPage = () => {
    const [title, setTitle] = useState('');

    useEffect(()=>{
        console.log(title);
    }, [title])
  return (
    <div className='editor-root'>
        <div className='editor-header' >

        </div>
        <div className='editor'>
            <div className='editor-content'>
                <div className='editor-title-input'>
                    <div className='editor-title-editable text-box' contentEditable={true} onKeyUp={(e)=>{setTitle(e.target.textContent); }}>
                        
                    </div>
                    {<div className={`editor-title-placeholder`} style={{display:title.length!==0&&'none'}}>
                        Title
                    </div>}
                </div>
                <div className='editor-body-textarea text-box' contentEditable={true}>
                    {/* <div>
                        <div className='editor-img-container'>
                            <img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA16DRTX.img?w=800&h=415&q=60&m=2&f=jpg" alt="" />
                        </div>
                    </div> */}
                    

                </div>
            </div>
            
        </div>
    </div>
  )
}

export default EditorPage