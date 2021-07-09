import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

//for using axios we gonna use useEffect hook so we make sure we do this as soon our page loads

function App() {
	const [flashcards, setFlashcards] = useState([]);
	const [categories, setCategories] = useState([]);

	const categoryEl = useRef();
	const amountEl = useRef();

	//useEffect for fetching the categories from the Trivia API
	useEffect(() => {
		axios.get('https://opentdb.com/api_category.php').then((res) => {
			setCategories(res.data.trivia_categories);
		});
	}, []);

	//useEffect for fetching the data from the API
	//we use the function setFlashcards from the hook to map the resulting information from the request JSON

	//fuction for parsing the HTML given into a string
	function decodeString(str) {
		const textArea = document.createElement('textarea');
		textArea.innerHTML = str;
		return textArea.value;
	}

	//for preventing reloading the page every time we submit the form
	function handleSubmit(e) {
		e.preventDefault();
		axios
			.get('https://opentdb.com/api.php', {
				params: {
					amount: amountEl.current.value,
					category: categoryEl.current.value,
				},
			})
			.then((res) => {
				setFlashcards(
					res.data.results.map((questionItem, index) => {
						const answer = decodeString(questionItem.correct_answer);
						const options = [
							...questionItem.incorrect_answers.map((a) => decodeString(a)),
							answer,
						];
						return {
							id: `${index}-${Date.now()}`,
							question: decodeString(questionItem.question),
							answer: answer,
							options: options.sort(() => Math.random() - 0.5),
						};
					})
				);
			});
	}

	return (
		//we use fragment because we're gonna return more than one element
		<>
			{/*we create a form element for using the filters*/}
			<form className='header' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='category'>Category</label>
					<select id='category' ref={categoryEl}>
						{/*we map into the categories variable of the useState hook at the top, so that we can populate the option tag values*/}
						{categories.map((category) => {
							return (
								<option value={category.id} key={category.id}>
									{category.name}
								</option>
							);
						})}
					</select>
				</div>
				{/*this formgroup its for the amount of questions we want to desplay*/}
				<div className='form-group'>
					<label htmlFor='amount'>Number of Questions</label>
					<input
						type='number'
						id='amount'
						min='1'
						step='1'
						defaultValue={10}
						ref={amountEl}
					></input>
				</div>
				{/*this correspons to the handleSubmit function we area gonna use the useEffect logic for fetching categories from the API*/}
				<div className='form-group'>
					<button className='btn'>Generate</button>
				</div>
			</form>
			<div className='container'>
				<FlashcardList flashcards={flashcards} />
			</div>
		</>
	);
}

export default App;
