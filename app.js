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
    main.textContent = `${e.date} | ${e.type} | IFG ${e.total}/10`;

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
``
