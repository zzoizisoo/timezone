import React, {useState, useEffect} from 'react';
import storage from './storage';
import './App.css';

function App() {
  const [isModal, toggleModal] = useState(false)
  const [timezones, setTimezones] = useState(storage.local.timezone.get())
  
  useEffect(()=>{
     storage.local.timezone.set(timezones)
  }, [timezones])
  
  const handleToggleModal = () => toggleModal(!isModal)

  const handleSubmit = (entry) => {
    const _tz = storage.local.timezone.get()
    const _entry = {id: Date.now(), ...entry, highlight:[]}
    setTimezones(_tz ? [..._tz, _entry] : [_entry])
    handleToggleModal()
  }

  const handleHighlight = (id, h) => {
    const tzn = timezones.reduce((acc, cur)=>{
      if (cur.id === id) {
        cur = {...cur, highlight: h}
      }
      return [...acc, cur];
    }, [])
    setTimezones(tzn)
  }

  return (
    <div className="App">
     <h1>Timezone</h1>
      <div className="scroll row">
       {timezones && timezones.map(t=> <Timezone key={t.id} timezone={t} handleHighlight={handleHighlight}/>)}
      </div>
     <BtnAdd handleClick={handleToggleModal}/>
     {isModal && <Modal handleClick={handleToggleModal} handleSubmit={handleSubmit}/> }
    </div>
  );
}


const Timezone = (props) => {
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

  return <div className="timezone">
     <div className="title" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
       <h2>{title}</h2>
      {hover && <div className="tag">{tags}</div>}
     </div> 

     {times.map(t => 
        <div onClick={()=>setHighlight(t)} className={`time ${t===now ? 'now':''} ${_highlight && _highlight.includes(t) ? 'highlight': ''}`} key={t}> 
          {t < 0 ? t + 24 : t >= 24 ? t - 24 : t} 
        </div>
      )}
  </div>
}



const BtnAdd = ({handleClick}) => {
  return (
    <button className="btnNewDate" onClick={handleClick}>
      Add new timezone
    </button>
  )
}

const Modal = (props) => {
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
        <h2>Modal</h2>
        <div >
          <input name="title" type="text" placeholder="Title here" onChange={handleChange} value={title}></input>
          <select name="timezone" onChange={handleChange}>
            {offsets.map((t)=><option key={t} value={t}>UTC {t > 0 ? `+${t}` : t}</option>)}
          </select>
        </div>
        <input name="tags" type="text" onChange={handleChange} value={tags}/>
        <button onClick={handleSubmit}>Add</button> 
      </div>
    </div>
  );
}

export default App;
