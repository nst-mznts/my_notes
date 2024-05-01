import './TagList.scss';
import listOfTags from '../../data/listOfTags';

const TagList = ({ classes, selectedNoteTagIds, setSelectedNoteTagIds }) => {

    const handleSelectedNoteTags = (event) => {
        if (selectedNoteTagIds.includes(event.target.id)) {
            const newSelectedNoteTagIds = selectedNoteTagIds.filter(id => id !== event.target.id);
            setSelectedNoteTagIds(newSelectedNoteTagIds);
        } else {
            const newSelectedNoteTagIds = [...selectedNoteTagIds, event.target.id];
            setSelectedNoteTagIds(newSelectedNoteTagIds);
        }
    }

    return (
        <ul className="header-tags">
            {listOfTags.map((tag, index) => {
                return <li 
                        key={index} 
                        className={tag[classes] + (selectedNoteTagIds.includes(tag.id) ? ' selected' : '')} 
                        id={tag.id} 
                        onClick={(event) => handleSelectedNoteTags(event)}>
                        {tag.tag}
                </li>
            })}
        </ul>
    );
};

export default TagList;