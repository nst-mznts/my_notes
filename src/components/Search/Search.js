import React from 'react';
import './Search.scss';
import { LiaSearchSolid } from "react-icons/lia";

function Search ({ handleSearchNote }) {
    return (
        <div className='search'>
            <input onChange={(event) => handleSearchNote(event.target.value)} type='text' placeholder='Search'/>
            <LiaSearchSolid size='1.2em' />
        </div>
    )
};

export default Search;