<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>GB Marius Régularité</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="style.css">
</head>

<body>

<h1>GB Marius Régularité</h1>

<p class="legend">
  <strong>Légende :</strong>
  0 = non fait/non maitrisé | 1 = parfois fait/moyen maitrisé | 2 = constant/maitrisé
</p>

<label>Type de séance</label>
<select id="type">
  <option>Entraînement</option>
  <option>Match</option>
</select>

<h3>Engagement</h3>
<button class="g0" onclick="setScore(0,0,this)">0</button>
<button class="g0" onclick="setScore(0,1,this)">1</button>
<button class="g0" onclick="setScore(0,2,this)">2</button>

<h3>Réaction après échec</h3>
<button class="g1" onclick="setScore(1,0,this)">0</button>
<button class="g1" onclick="setScore(1,1,this)">1</button>
<button class="g1" onclick="setScore(1,2,this)">2</button>

<h3>Posture (Grand/équilibré/agressif)</h3>
<button class="g2" onclick="setScore(2,0,this)">0</button>
<button class="g2" onclick="setScore(2,1,this)">1</button>
<button class="g2" onclick="setScore(2,2,this)">2</button>

<h3>Attention, concentration</h3>
<button class="g3" onclick="setScore(3,0,this)">0</button>
<button class="g3" onclick="setScore(3,1,this)">1</button>
<button class="g3" onclick="setScore(3,2,this)">2</button>

<h3>Attitude (présence, motivation, langage corporel)</h3>
<button class="g4" onclick="setScore(4,0,this)">0</button>
<button class="g4" onclick="setScore(4,1,this)">1</button>
<button class="g4" onclick="setScore(4,2,this)">2</button>

<h3>auto-évaluation corporelle (Appuis, stabilité, gainage)</h3>
<button class="g5" onclick="setScore(4,0,this)">0</button>
<button class="g5" onclick="setScore(4,1,this)">1</button>
<button class="g5" onclick="setScore(4,2,this)">2</button>

<h3>Gestion des émotions et de la fatigue</h3>
<button class="g6" onclick="setScore(4,0,this)">0</button>
<button class="g6" onclick="setScore(4,1,this)">1</button>
<button class="g6" onclick="setScore(4,2,this)">2</button>

<br><br>
<h3>Mes réussites ?</h3>
<textarea id="note" placeholder="texte"></textarea>

<br><br>
<h3>Mes erreurs ? Ce que j'aurais pu faire ?</h3>
<textarea id="note" placeholder="texte"></textarea>

<br><br>
<button onclick="save()">Enregistrer</button>

<h2>Indice hebdomadaire</h2>
<p id="weeklyIndex">Aucune donnée</p>

<h2>Historique</h2>
<ul id="history"></ul>

<script src="app.js"></script>
</body>
</html>
