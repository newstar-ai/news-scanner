import React, {useState, useEffect} from 'react';
import axios from 'axios';

import glass from '../images/glass.svg';
import '../css/Search.css';

const Search = () => {

    const [news, setNews] = useState('')

    const API_URL = 'http://10.2.50.231:5000/article/search/content'
    useEffect(() => {
        axios.get(API_URL).then((response) => {
            setNews(response.data);
            console.log(response.data)
        })
    }, [setNews]);

    return (
        <div className="Search">
            <div className="search-entry">
                <input className="search-bar" type="text" placeholder="What are you looking for?"/>
                <button className="search-button" type="submit"><img className="glass" alt="magnifying glass" src={glass} /></button>
            </div>
            <div className="news">
                <h1>This is news preview</h1>
                <div>
                    {news}
                </div>
            </div>
        </div>
    )
};

export default Search;