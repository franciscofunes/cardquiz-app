import React from 'react';
import Flashcard from './Flashcard';

//we are destructuring our props that's why the curly braces, normaly we would call props and then calling in it at the top like props.flashcards, by destructuring we save all that code
//using css grid for responsive
/*inside the div we loop through all over our flashcards and we return the child component Flashcard */
/*the importance of having a key it will only re-render the once that have that actually change*/


export default function FlashcardList({ flashcards }) {
	return (

		<div className='card-grid'>
			{flashcards.map((flashcard) => {
				return <Flashcard flashcard={flashcard} key={flashcard.id} />;
			})}
		</div>
	);
}
