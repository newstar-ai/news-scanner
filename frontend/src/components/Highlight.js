import React from 'react';

const Highlight = ({ searchInput, text }) => {
    const createHighlight = () => {
        text = ' ' + text

        const querystr = `[., *+\-?^\${}()|[\\]]+${searchInput}[., *+\-?^\${}()|[\\]]+`;
        const reg = new RegExp(querystr, 'gim');
        const finalStr = `${text.replace(reg, function(str) {return `${str[0]}<mark class="hl-class">${str.slice(1, str.length-1)}</mark>${str[str.length-1]}`})}`;
        return finalStr;
    }

    return (
        <span dangerouslySetInnerHTML={{__html: createHighlight()}}></span>
    );
}

export default Highlight;
