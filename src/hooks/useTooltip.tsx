import {useState} from 'react';

function UseTooltip() {
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const handleOpen = () => {
		setTooltipOpen(true);
		setTimeout(() => setTooltipOpen(false), 800);
	};
	return {handleOpen, tooltipOpen};
}

export default UseTooltip;
