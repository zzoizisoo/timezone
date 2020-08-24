import React, {useState} from 'react';
import Tag from './Tag'

export default (props) => {
    const { timezone, align, handleHighlight, handleDelete} = props
    const {id, title, tz, tags, highlight} = timezone
    const [hover, setHover] = useState(false)
    const [_highlight, _setHighlight] = useState(highlight ? highlight : [])
  
    let times = []
    const now = new Date().getUTCHours() + Number(tz);
    for (let i = 0; i < 24 ; i ++){times.push(i + Number(tz))}
    
    const setHighlight = (t) => {
      let h;
      if(_highlight.includes(t)) h = _highlight.filter(i => i !== t)
      else h = [..._highlight, t]
      _setHighlight(h)
      handleHighlight(id, h)
    }

    const toggleTag = () => {
      setHover(!hover)
    }
  
    return <div className={`timezone_unit ${align}`}>
       <div className="title" onClick={toggleTag}>
         <h2>{title}</h2>
       </div> 
       {hover && <Tag id={id} title={title} tags={tags} handleDelete={handleDelete}/>}
       
       {times.map(t => 
          <div onClick={()=>setHighlight(t)} className={`time ${t===now ? 'now':''} ${_highlight && _highlight.includes(t) ? 'highlight': ''}`} key={t}> 
            {t < 0 ? t + 24 : t >= 24 ? t - 24 : t} 
          </div>
        )}
    </div>
  }