import React, { useState, useRef, useEffect } from 'react'

const List = () => {

    const [right, setRight] = useState([{key:false, value:4},{key:false, value:5},{key:false, value:6},{key:false, value:7}])
    const [left, setLeft] = useState([{key:false, value:1},{key:false, value:2},{key:false, value:3}])

    const inputRef = useRef(null)

    const sendToLeft = () => {
        let newData = right.filter((item) => item.key === true).map((item) => {
            item.key = false
            return item
        })
        setRight(right.filter((item) => item.key === false))
        setLeft([...left, ...newData])
    }

    const changeCheckbox = (side, index) => {
        if(side == "left") {
            setLeft(prevState =>  prevState.map((item, i) => (i == index ? {...item, key : !item.key} : item)))
        } else {
            setRight(prevState =>  prevState.map((item, i) => (i == index ? {...item, key : !item.key} : item)))
        }
    }

    return (
        <div style={{color:'black', padding:'200px', display:'flex'}}>
            <div style={{padding:'20px', border:'2px solid black', borderRadius:'20%', width:'200px', height:'200px'}}>
            {left?.map((item, index) => {
                    return (
                        <div key={index} style={{display:'flex'}}>
                        <input type="checkbox" value={left[index]?.key} onClick={() => changeCheckbox("left", index)} />
                        <p>{item.value}</p>
                        </div>
                    )
                })}
            </div>
            <div style={{padding:'20px', borderRadius:'20%', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <button onClick={sendToLeft} className='savebtn' > &gt; </button>
                <button onClick={sendToLeft} className='savebtn' > &lt; </button>
            </div>
            <div style={{padding:'20px', border:'2px solid black', borderRadius:'20%', width:'200px', height:'200px'}}>
                {right?.map((item, index) => {
                    return (
                        <div key={index} style={{display:'flex'}}>
                        <input ref={inputRef}  value={left[index]?.key} type="checkbox" onClick={() => changeCheckbox("right", index)} />
                        <p>{item.value}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List
