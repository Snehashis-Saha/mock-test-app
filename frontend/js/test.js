let questions = [];
let current = 0;
let ans = {};
let marked = {};
let time = 0;
let settings = {};

// 🚀 INIT
async function init() {
	const qRes = await fetch('http://localhost:3000/questions');
	const sRes = await fetch('http://localhost:3000/settings');

	let data = await qRes.json();
	settings = await sRes.json();

	questions = data.slice(0, settings.totalQuestions);

	time = settings.timer * 60;

	loadQuestion();
	startTimer();
}

// 📌 LOAD QUESTION
function loadQuestion() {
	let q = questions[current];

	document.getElementById('questionBox').innerHTML = `
    <h2>Q${current + 1}. ${q.question}</h2>
    ${q.code ? `<pre class="bg-black p-2 mt-2">${q.code}</pre>` : ''}
  `;

	let selected = ans[q.id];

	let options = [
		{ text: q.opt1, index: 1 },
		{ text: q.opt2, index: 2 },
		{ text: q.opt3, index: 3 },
		{ text: q.opt4, index: 4 },
	];

	let html = '';
	options.forEach((o) => {
		let isSelected = selected === o.index;

		html += `
      <div onclick="selectAns(${o.index})"
      class="${isSelected ? 'bg-green-500' : 'bg-slate-700'} p-3 mt-2 rounded cursor-pointer">
        ${o.text}
      </div>
    `;
	});

	document.getElementById('optionsBox').innerHTML = html;

	renderPalette();
}

// ✅ SELECT
function selectAns(i) {
	ans[questions[current].id] = i;
	loadQuestion();
}

// ➡ NEXT
function nextQ() {
	if (current < questions.length - 1) current++;
	loadQuestion();
}

// ⬅ PREV
function prevQ() {
	if (current > 0) current--;
	loadQuestion();
}

// ⭐ MARK
function markQ() {
	marked[questions[current].id] = true;
	renderPalette();
}

// 🎨 PALETTE
function renderPalette() {
	let html = '';

	questions.forEach((q, i) => {
		let color = 'bg-red-500';

		if (ans[q.id]) color = 'bg-green-500';
		if (marked[q.id]) color = 'bg-yellow-500';

		html += `
      <div onclick="goQ(${i})"
      class="w-8 h-8 flex items-center justify-center ${color} rounded cursor-pointer">
        ${i + 1}
      </div>
    `;
	});

	document.getElementById('palette').innerHTML = html;
}

// 🔁 GO
function goQ(i) {
	current = i;
	loadQuestion();
}

// ⏱ TIMER
function startTimer() {
	let t = setInterval(() => {
		time--;

		document.getElementById('timer').innerText =
			`${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;

		if (time <= 0) {
			clearInterval(t);
			submitTest();
		}
	}, 1000);
}

// 📤 SUBMIT
function submitTest() {
	localStorage.setItem('answers', JSON.stringify(ans));
	localStorage.setItem('questions', JSON.stringify(questions));
	window.location.href = 'results.html';
}

init();
