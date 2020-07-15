import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import '../css/Search.css';
import { Container } from '../pages/uploadArticle';
import Result from './Result';

const { Search } = Input;

const SearchComponent = () => {
	const [news, setNews] = useState([]);
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		axios.get('http://10.2.50.231:5000/article/get_all').then(response => {
			console.log(response.data.hits.hits);
			setNews(response.data.hits.hits);
		})
			.catch(error => {
				console.log(errors);
			})
	}, []);

	/*     const handleSearch = () => {
		  const requestOptions = {
			  "content": "HCM"
		  };
		  
		  axios.post('http://10.2.50.231:5000/article/search/content', requestOptions)
			  .then(response => {
				  console.log(response.data.hits.hits);
				  setNews(response.data.hits.hits);
			  })
			  .catch(error => {
				  console.log(error);
			  });
	  };   */

	const updateSearch = e => {
		setSearchInput(e.target.value);
	};

	const getAll = () => {
		axios.get('http://10.2.50.231:5000/article/get_all').then(response => {
			console.log(response.data.hits.hits);
			setNews(response.data.hits.hits);
		})
			.catch(error => {
				console.log(errors);
			})
	}

	const getSearch = (value, e) => {
		setSearchInput('');
		const requestOptions = {
			content: searchInput
		};

		axios
			.post('http://10.2.50.231:5000/article/search/content', requestOptions)
			.then(response => {
				console.log(response.data.hits.hits);
				setNews(response.data.hits.hits);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<Container className="search-component">
			<Search
				placeholder="What are you looking for?"
				value={searchInput}
				onChange={updateSearch}
				onSearch={getSearch}
			/>
			<div className="result">
				{news.map(item => (
					<Result
						key={item._id}
						artTitle={item._source.article_info.article_title}
						artAuthor={item._source.article_info.article_author}
						artContent={item._source.article_info.article_content}
						newsTitle={item._source.newspaper_info.newspaper_title}
						pubTitle={item._source.publication_info.publication_title}
						pubNum={item._source.publication_info.page_num}
					/>
				))}
			</div>
		</Container>
	);
};

export default SearchComponent;
