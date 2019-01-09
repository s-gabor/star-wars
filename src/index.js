const baseURL = 'https://swapi.co/api/';
const ulResult = document.getElementById('ul-result');
const divSearch = document.getElementById("searchField");
let resultsArray;


const addChildToParent = (child, parent, data) => {
	let childElement = document.createElement(child);
	let textNode = document.createTextNode(data);
	childElement.appendChild(textNode);
	parent.appendChild(childElement);
}


const fetchAndDisplayData = (selection) => {
	resultsArray = [];
	let url = baseURL + selection;
	fetch(url)
			.then(results => results.json())
			.then(resultsParsed => {
				// load first 10 items
				let first10items = resultsParsed.results;
				for (let item of first10items) {
					let data;
					selection.toLowerCase() === 'films' ? data = item.title : data = item.name;
					addChildToParent('li', ulResult, data);
					resultsArray.push(data);
				}
				// load the remaining items (if more than 10)
				for (i = 10; i < resultsParsed.count; i++) {
					let url = baseURL + selection + '/' + i;
					fetch(url)
						.then(result => result.json())
						.then(item => {
							if (item.detail !== 'Not found') {
								addChildToParent('li', ulResult, item.name);
								resultsArray.push(item.name);
							}
						})
				}
			})
}


divSearch.style.display = "none";
document.getElementById('filters').addEventListener('change', (event) => {
	divSearch.style.display = "flex";
	ulResult.innerHTML = '';
	document.querySelector('body > h3').innerHTML = '';
	let selection = event.target.value;
	document.querySelector('#searchField > input')
		.setAttribute('placeholder', 'search for ' + selection);
	fetchAndDisplayData(selection);
});


document.querySelector('#searchField > input').addEventListener('keyup', (event) => {
	let resultsArrayFiltered = [];
	if (event.target.value.length > 0) {
		// display filtered array
		ulResult.innerHTML = '';
		for (let item of resultsArray) {
			if (item.toLowerCase().includes(event.target.value.toLowerCase())) {
				resultsArrayFiltered.push(item);
				}	
		}
		for (let item of resultsArrayFiltered) {
			addChildToParent('li', ulResult, item);
		}
	} else {
		// display full array
		ulResult.innerHTML = '';
		for (let item of resultsArray) {
			addChildToParent('li', ulResult, item);
		}
	}
});




























