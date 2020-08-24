import React, {useState, useEffect} from 'react';
import storage from './storage';

import {Header, TimezoneUnit, ModalAdd} from './components'
import './App.css';

function App() {
  const [isModal, toggleModal] = useState(false)
  const [timezones, setTimezones] = useState(storage.local.timezone.get())
  const [align, setAlign] = useState("horizontal")
  
  useEffect(()=>{
     storage.local.timezone.set(timezones)
  }, [timezones])

  useEffect(()=> {
    if(!timezones || timezones.length === 0) toggleModal(true)
  })
  
  const handleToggleModal = () => toggleModal(!isModal)
  const handleToggleAlign = () => {
    setAlign(align === "horizontal" ? "vertical" : "horizontal")
    console.log(align)
  }

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
     <Header onPressAdd={handleToggleModal} onPressAlign={handleToggleAlign} />
      <div className={`contents ${align}`}>
       {timezones && timezones.map(t=> 
        <TimezoneUnit key={t.id} timezone={t} handleHighlight={handleHighlight} align={align}/>
      )}
      </div>
     {isModal && <ModalAdd handleClick={handleToggleModal} handleSubmit={handleSubmit}/> }
    </div>
  );
}

export default App;
