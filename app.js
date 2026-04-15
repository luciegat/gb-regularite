let scores = [0,0,0,0,0];

function setScore(index, value) {
  scores[index] = value;
}

function save() {
  const total = scores.reduce((a,b) => a + b, 0);
  const note = document.getElementById('note').value;
  const type = document.getElementById('type').value;

  const entry = {
    date: new Date().toLocaleDateString(),
    type,
    total,
    note
  };

  let data = JSON.parse(localStorage.getItem('gbData')) || [];
  data.push(entry);
  localStorage.setItem('gbData', JSON.stringify(data));

  display();
}

function display() {
  const list = document.getElementById('history');
  list.innerHTML = "";

  let data = JSON.parse(localStorage.getItem('gbData')) || [];
  data.slice(-10).reverse().forEach(e => {
    let li = document.createElement('li');
    li.textContent = `${e.date} | ${e.type} | IFG ${e.total}/10`;
    list.appendChild(li);
  });
}

display();