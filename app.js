let scores = [null, null, null, null, null];

function setScore(index, value, button) {
  scores[index] = value;

  // Supprimer le vert des autres boutons du même groupe
  const group = button.getAttribute("data-group");
  document
    .querySelectorAll(`button[data-group="${group}"]`)
    .forEach(btn => btn.classList.remove("selected"));

  // Mettre le bouton cliqué en vert
  button.classList.add("selected");
}

function save() {
  const total = scores.reduce((a, b) => a + (b ?? 0), 0);
  const note = document.getElementById("note").value;
  const type = document.getElementById("type").value;

  const entry = {
    date: new Date().toLocaleDateString(),
    type,
    total,
    note
  };

  let data = JSON.parse(localStorage.getItem("gbData")) || [];
  data.push(entry);
  localStorage.setItem("gbData", JSON.stringify(data));

  display();
}

function display() {
  const list = document.getElementById("history");
  list.innerHTML = "";

  let data = JSON.parse(localStorage.getItem("gbData")) || [];

  data.slice().reverse().forEach((e, i) => {
    const realIndex = data.length - 1 - i;

    const li = document.createElement("li");
    li.style.marginBottom = "10px";

    const main = document.createElement("div");
    main.textContent = `${e.date} ${e.type} IFG ${e.total}/10`;

if (e.total <= 4) {
  main.style.color = "red";
} else if (e.total <= 7) {
  main.style.color = "orange";
} else {
  main.style.color = "green";
}
main.style.fontWeight = "bold";
``

    const comment = document.createElement("div");
    comment.textContent = e.note ? `📝 ${e.note}` : "";
    comment.style.fontSize = "0.9em";
    comment.style.color = "#555";
    comment.style.marginLeft = "10px";

    const btn = document.createElement("button");
    btn.textContent = "🗑️";
    btn.style.marginLeft = "10px";
    btn.onclick = function () {
      deleteEntry(realIndex);
    };

    li.appendChild(main);
    if (e.note) li.appendChild(comment);
    li.appendChild(btn);

    list.appendChild(li);
updateWeeklyIndex();
  });
}

display();

function deleteEntry(index) {
  let data = JSON.parse(localStorage.getItem("gbData")) || [];

  if (confirm("Supprimer cette ligne ?")) {
    data.splice(index, 1);
    localStorage.setItem("gbData", JSON.stringify(data));
    display();
  }
}

function updateWeeklyIndex() {
  let data = JSON.parse(localStorage.getItem("gbData")) || [];

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const lastWeek = data.filter(e => {
    const d = new Date(e.date.split("/").reverse().join("-"));
    return d >= oneWeekAgo;
  });

  const el = document.getElementById("weeklyIndex");

  if (lastWeek.length === 0) {
    el.textContent = "Aucune donnée sur 7 jours";
    return;
  }

  const avg =
    lastWeek.reduce((sum, e) => sum + e.total, 0) / lastWeek.length;

  el.textContent = `Moyenne sur 7 jours : ${avg.toFixed(1)} / 10`;

  if (avg <= 4) {
    el.style.color = "red";
  } else if (avg <= 7) {
    el.style.color = "orange";
  } else {
    el.style.color = "green";
  }

  el.style.fontWeight = "bold";
}

``
