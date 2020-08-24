import React, {useState} from 'react';

export default  (props) => {
    const offsets = [-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12];
    const [title, stt] = useState("");
    const [timezone, stz] = useState(0);
    const [tags, stg] = useState("");
  
    const set = { 
      title: val => stt(val),
      timezone: val => stz(val),
      tags: val => stg(val)
    }
  
    const handleChange = e => {
      const {name, value} = e.target;
      set[name](value);
    }
  
    const handleSubmit = () => {
      const entry = {title: title, tz: timezone, tags: tags}
      props.handleSubmit(entry);
    }
  
    return (
      <div className="background" onClick={props.handleClick}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <h2>Add new local</h2>
          <div className="d-flex center">
            <input className="title" name="title" type="text" placeholder="Title here" onChange={handleChange} value={title}></input>
            <select className="options" name="timezone" onChange={handleChange}>
              {offsets.map((t)=><option key={t} value={t}>UTC {t > 0 ? `+${t}` : t}</option>)}
            </select>
          </div>
          <input className="tags" name="tags" type="text" onChange={handleChange} value={tags} placeholder="notes"/>
          <button className="btn" onClick={handleSubmit}>Add</button> 
        </div>
      </div>
    );
  }