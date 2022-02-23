import React from 'react';

const Rank = ({name, entries}) => { /* Input of name and entries from the id and throws info onto rank */
    return (
        <div>
            <div className='white f3'>
            {`${name}, your current entry count is...`}
            </div>
            <div className='white f1'>
            {entries}
            </div>
        </div>
    );
} 

export default Rank;