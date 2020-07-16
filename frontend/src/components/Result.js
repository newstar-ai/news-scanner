import React from 'react';
import { Card } from 'antd';
import '../css/Result.css';

const Result = ({ artAuthor, artContent, artTitle, newsTitle, pubNum, pubTitle }) => {
	return (
		<div className="result">
			<Card
				title={artTitle}
				headStyle={{ fontSize: 30, color: 'black' }}
				style={{ width: '100%' }}>
				<h2>{artAuthor}</h2>
				<h3>{newsTitle} - {pubTitle} - {pubNum}</h3>
				<p>{artContent}</p>
			</Card>
		</div>
	);
};

export default Result;

