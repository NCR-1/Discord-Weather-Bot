// !weather <location>: splits at space, removes whitespace and removes the command to leave only the wanted text [.map() creates array, .filter() is an array function]
function splitText(msg) {
	const data = msg
		.split(' ')
		.map((element) => element.trim())
		.filter(
			(element) =>
				(element !== '') &
				(element !== '!weather') &
				(element !== '!notify') &
				(element !== '!delete')
		);
	return data;
}

export default splitText;
