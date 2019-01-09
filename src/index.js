// const userInput = document.getElementById('searches');
// userInput.onkeyup = event => console.log(event.target.value);
// function updateOutputTitle(value) {
// 	document.getElementsByTagName('h3')[0].textContent = value.toUpperCase();
// }

const baseURL = 'https://swapi.co/api/';
let ulResult = document.getElementById('result');
let selectedFilter;

function fetchAndDisplayResult(url) {
	fetch(url)
			.then(result => result.json())
			.then(result => {
						let resultList = result.results;
						for (i = 0; i < resultList.length; i++) {
							document.getElementsByTagName('li')[i].textContent = resultList[i].name;
						}
					}
				)
}


window.alert = function(title, message){
    var myElementToShow = document.getElementById("my-alert");
    myElementToShow.innerHTML = title + "</br>" + message; 
}

// document.getElementById('searches').addEventListener('keyup', function(event) {
// 	if (event.keyCode === 13) {
// 		selectedFilter = event.target.value;
// 		console.log('searches: ', selectedFilter);
// 		let url = baseURL + selectedFilter;
// 		fetchAndDisplayResult(url)
// 	}
// })


document.getElementById('filters').addEventListener('change', (event) => {
	selectedFilter = event.target.value;
	console.log('filters: ', selectedFilter);
	let url = baseURL + selectedFilter;
	fetchAndDisplayResult(url);
});






ulResult.addEventListener('click', (event) => {
							// console.log(event.target);
							// console.log('click: ', selectedFilter);
							let url = baseURL + selectedFilter + '/' + event.target.value;
							// console.log(url);
							fetch(url)
								.then(result => result.json())
								.then(result2 => {
									let arrItem = Object.entries(result2);
									let output = '';
									for (let i = 0; i < 8; i++) {
										// console.log(entry);
										output += (arrItem[i][0] + ': ' + arrItem[i][1]) + '<br>';
									}
									alert(result2.name + '<br>', output);
								})
								.catch(err => alert('No additional information!'))
							}
						)