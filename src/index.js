const baseURL = 'https://swapi.co/api/';
const ulResult = document.getElementById('ul-result');


const addChildToParent = (child, parent, data) => {
	let childElement = document.createElement(child);
	let textNode = document.createTextNode(data);
	childElement.appendChild(textNode);
	parent.appendChild(childElement);
}


const fetchAndDisplayData = (selection) => {
	let url = baseURL + selection;
	fetch(url)
			.then(results => results.json())
			.then(resultsParsed => {
				// load first 10 items
				let first10items = resultsParsed.results;
				for (let item of first10items) {
					addChildToParent('li', ulResult, item.name);
				}
				// load the remaining items
				for (i = 10; i < resultsParsed.count; i++) {
					let url = baseURL + selection + '/' + i;
					fetch(url)
						.then(result => result.json())
						.then(item => {
								if (item.detail !== 'Not found') {
									addChildToParent('li', ulResult, item.name);
								}
							})
				}
			})
}


document.getElementById('filters').addEventListener('change', (event) => {
	let selection = event.target.value;
	document.getElementById('ul-result').innerHTML = '';
	fetchAndDisplayData(selection);
});





