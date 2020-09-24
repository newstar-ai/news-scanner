import React from "react";
import Highlighter from "react-highlight-words";

const Highlight = ({ searchInput, text }) => {
    return (
        <Highlighter
            highlightClassName="hl-class"
            searchWords={[searchInput]}
            textToHighlight={text}
            autoEscape
        />  
    )
}

export default Highlight;