import React from 'react';

export default (props)=> {
    const {id, title, tags, handleDelete} = props;
    const onDelete=()=>handleDelete(id)
    
     return  <div className="tag">
        <h3>{title}</h3>
        <div>{tags}</div>
        <div>
            <button className="btn delete" onClick={onDelete} >Delete</button>
        </div>
    </div>
}