import { PiNotepad } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";

const navigationLinks = [
    {
        name: 'All notes',
        id: 'all',
        active: true,
        icon: <PiNotepad className='link-icon' size='2rem'/>
    },
    {
        name: 'Trash',
        id: 'trash',
        active: false,
        icon: <GoTrash className='link-icon' size='2rem'/>
    },
    {
        name: 'Favorites',
        id: 'favorites',
        active: false,
        icon: <FaRegStar className='link-icon' size='2rem'/>
    }
];

export default navigationLinks;