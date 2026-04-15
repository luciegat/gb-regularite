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

let message = "";

if (total <= 4) {
  message = "🔴 Séance irrégulière.\nCe n’est pas la note d’un jour qui compte, mais la couleur de ta semaine. Accroche toi 💖";
} else if (total <= 7) {
  message = "🟠 Séance correcte mais inconstante.\nTu n’as pas besoin d’être spectaculaire. Tu dois être fiable, présent, stable et acteur. Force et courage 🥰";
} else {
  message = "🟢 Très bonne régularité.\nLa régularité, ce n’est pas être fort quand tout va bien. C’est être solide quand c’est moyen.I believe in you 😍";
}

alert(message);

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

function showProgress() {
  document.getElementById("mainView").style.display = "none";
  document.getElementById("progressView").style.display = "block";
  setTimeout(drawChart, 50);
}

function hideProgress() {
  document.getElementById("progressView").style.display = "none";
  document.getElementById("mainView").style.display = "block";
}

function drawChart() {
  const canvas = document.getElementById("progressChart");

  canvas.width = canvas.offsetWidth || 300;
  canvas.height = 250;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let data = JSON.parse(localStorage.getItem("gbData")) || [];

  if (data.length === 0) {
    ctx.font = "14px Arial";
    ctx.fillText("Aucune donnée à afficher", 50, 120);
    return;
  }

  const padding = 30;
  const maxScore = 10;

  const stepX = (canvas.width - 2 * padding) / (data.length - 1 || 1);
  const stepY = (canvas.height - 2 * padding) / maxScore;

  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  ctx.strokeStyle = "#2ecc71";
  ctx.lineWidth = 2;
  ctx.beginPath();

  data.forEach((e, i) => {
    const x = padding + i * stepX;
    const y = canvas.height - padding - e.total * stepY;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });

  ctx.stroke();

  data.forEach((e, i) => {
    const x = padding + i * stepX;
    const y = canvas.height - padding - e.total * stepY;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#2ecc71";
    ctx.fill();
  });
}

function exportExcel() {
  let data = JSON.parse(localStorage.getItem("gbData")) || [];

  if (data.length === 0) {
    alert("Aucune donnée à exporter");
    return;
  }

  // En-têtes du fichier Excel
  let csv = "Date;Type;Score total;Commentaire\n";

  data.forEach(e => {
    csv += `${e.date};${e.type};${e.total};"${e.note || ""}"\n`;
  });

  // Création du fichier
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "suivi_gardien_regularete.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

``
