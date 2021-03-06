import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
	useGodspeedContextImmutable,
	useGodspeedContextSearch,
} from "../src/context";

const DEBUG = false;

// @TODO REVISE FOR STATE REFACTOR; where already done is noted
const SearchField = (props) => {
	const { placeholder } = props;

	const { key, search, selection } = useGodspeedContextImmutable();
	const { enter, escape } = key;
	const { blur, focus, updateSearch } = search;
	const { next, previous } = selection;
	const { focused, phrase } = useGodspeedContextSearch();

	// Focus or blur search field based on state
	const searchFieldRef = useRef(null);
	useEffect(() => {
		const focusedInState = focused;
		const focusedInDOM = searchFieldRef.current === document.activeElement;
		DEBUG &&
			console.log({
				focusedInState,
				focusedInDOM,
			});
		if (focusedInState && !focusedInDOM) {
			DEBUG && console.log("input should focus");
			searchFieldRef.current.focus();
		} else if (!focusedInState && focusedInDOM) {
			DEBUG && console.log("input should blur");
			searchFieldRef.current.blur();
		}
	}, [focused]);

	// dispatch hotkey handlers
	const handleKeyDown = (event) => {
		switch (event.key) {
			case "ArrowDown":
				next();
				break;

			case "ArrowUp":
				previous();
				break;

			case "Enter":
				enter();
				break;

			case "Escape":
				escape();
		}
	};

	/**
	 * Handle clicks by grabbing focus if it isn't already focused
	 */
	const handleClick = () => {
		DEBUG && console.log("handleClick()");
		if (!focused) {
			DEBUG && console.log("focus()");
			focus();
		}
	};

	// update captured component's state when input element value changes
	const handleChange = (event) => {
		updateSearch(event.target.value);
	};

	const handleOnBlur = (event) => {
		if (focused) {
			DEBUG && console.log("handleOnBlur() calling blur()");
			blur();
		}
	};

	const handleOnFocus = () => {
		if (!focused) {
			DEBUG && console.log("handleOnFocus() calling focus()");
			focus();
		}
	};

	return (
		<input
			onBlur={() => handleOnBlur()}
			onClick={() => handleClick()}
			onChange={(event) => handleChange(event)}
			onFocus={() => handleOnFocus()}
			onKeyDown={(event) => handleKeyDown(event)}
			placeholder={placeholder}
			ref={searchFieldRef}
			value={phrase}
		/>
	);
};
SearchField.defaultProps = {
	placeholder: "",
};
SearchField.propTypes = {
	placeholder: PropTypes.string,
};

export default SearchField;
