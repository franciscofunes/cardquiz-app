import React, { useState, useEffect, useRef } from 'react';

export default function Flashcard({ flashcard }) {
	const [flip, setFlip] = useState(false);
	const [height, setHeight] = useState('initial');

	//we are gonna use useEffect to help us with the height propertly of the cards
	//we are goona use useRef, for having references of differentes elements on the page
	const frontEl = useRef();
	const backEl = useRef();

	function setMaxHeight() {
		const frontHeight = frontEl.current.getBoundingClientRect().height;
		const backHeight = backEl.current.getBoundingClientRect().height;
		setHeight(Math.max(frontHeight, backHeight, 100));
	}

	//anytime our front element changes
	useEffect(setMaxHeight, [
		flashcard.question,
		flashcard.answer,
		flashcard.options,
	]);

	//for recalculating our height everytime our windows size change
	useEffect(() => {
		window.addEventListener('resize', setMaxHeight);
		return () => window.removeEventListener('resize', setMaxHeight);
	}, []);

	//the idea it's managing the flip of the card as a state
	//so with the event onClick will be toogling from flip to not flip when we click changing the state to true the opposite of the default value pass in the useState hook
	return (
		<div
			className={`card ${flip ? 'flip' : ''}`}
			style={{ height: height }}
			onClick={() => setFlip(!flip)}
		>
			<div className='front' ref={frontEl}>
				{flashcard.question}
				<div className='flashcard-options'>
					{flashcard.options.map((option) => {
						return (
							<div className='flashcard-option' key={option}>
								{option}
							</div>
						);
					})}
				</div>
			</div>
			<div className='back' ref={backEl}>
				{flashcard.answer}
			</div>
		</div>
	);
}
