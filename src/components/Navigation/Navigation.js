import React from "react";
import './Navigation.scss';
import Search from '../Search/Search';
import navigationLinks from '../../data/navigationLinks';

function Navigation({ setSearchText, onActive }) {

    const handleLinkActive = (event) => {
        onActive(event.target.id);

        const activeLink = navigationLinks.find(link => link.active === true);
		activeLink.active = false;
        const link = navigationLinks.find(link => link.id === event.target.id);
        link.active = true;
		
        // navigationLinks.forEach(link => {
        //     if (link.id === event.target.id) {
        //         link.active = true;
        //     } else {
        //         link.active = false;
        //     }
        // }); // TODO: find()
    };

    return (
        <header className="sidebar-navigation">
            <Search handleSearchNote={setSearchText}/>
            <ul className='navigation' id='navigationLinks' onClick={(event) => handleLinkActive(event)}>
                {navigationLinks.map((link, index) => {
                    return <li 
                    key={index} 
                    className={`navigation-link ${link.active ? ' active' : ''}`}
                    id={link.id}
                    >
                        <span className='active-link'></span>
                        {link.icon}
                        {link.name}
                    </li>
                })}
            </ul>
        </header>
    );
}

export default Navigation;