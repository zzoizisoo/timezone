import React from 'react';
import {IoIosAddCircle, IoIosPodium} from 'react-icons/io'

export default ({onPressAdd, onPressAlign}) => {
    return <div className="header">
        <h1>Timezone</h1>
        <div className="header-buttons">
            <button className="arrange" onClick={onPressAlign} >
                <IoIosPodium />
            </button>
            <button className="add" onClick={onPressAdd}>
                <IoIosAddCircle />
            </button>
        </div>
    </div>
}