import React, {useState} from 'react';

export default (props) => {
    const {id, title, tz, tags, highlight} = props.timezone
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
      props.handleHighlight(id, h)
    }
  
    return <div className={`timezone_unit ${props.align}`}>
       <div className="title" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
         <h2>{title}</h2>
       </div> 
       {hover && <div className="tag">{tags}</div>}


       {times.map(t => 
          <div onClick={()=>setHighlight(t)} className={`time ${t===now ? 'now':''} ${_highlight && _highlight.includes(t) ? 'highlight': ''}`} key={t}> 
            {t < 0 ? t + 24 : t >= 24 ? t - 24 : t} 
          </div>
        )}
    </div>
  }