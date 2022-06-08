let numbers = document.getElementById('box');
for ( let i = 0; i < 100; i++ ) {
	let span = document.createElement('span');
	span.textContent = i;
	numbers.appendChild(span);
}

let num = numbers.getElementsByTagName('span');
let idx = 0;

function nextNumber() {
	num[idx].style.display = 'none';
	idx = (idx + 1) % num.length;
	num[idx].style.display = 'initial';
}

function prevNumber() {
	num[idx].style.display = 'none';
	idx = (idx - 1 + num.length) % num.length;
	num[idx].style.display = 'initial';
}

document.querySelector('.prev').addEventListener('click', prevNumber);
document.querySelector('.next').addEventListener('click', nextNumber);