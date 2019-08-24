import React, { Fragment } from 'react';
import spinner from './spinner.gif';

// arrow function components have a shorthand for return
// can just return the element like this if not doing any logic
const Spinner = () => (
	<Fragment>
		<img
			src={spinner}
			alt='Loading...'
			style={{
				width: '200px',
				margin: 'auto',
				display: 'block'
			}}
		/>
	</Fragment>
);

export default Spinner;
