const express = require("express");

const app = express();
const PORT = 3000;

const wonders = [
  {
    name: "Great Wall of China",
    country: "China",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/GreatWallBadaling.jpg"
  },
  {
    name: "Petra",
    country: "Jordan",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Petra_Jordan_BW_21.JPG"
  },
  {
    name: "Christ the Redeemer",
    country: "Brazil",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Cristo_Redentor_-_Rio.jpg"
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg"
  },
  {
    name: "Chichen Itza",
    country: "Mexico",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Chichen_Itza_3.jpg"
  },
  {
    name: "Colosseum",
    country: "Italy",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg"
  },
  {
    name: "Taj Mahal",
    country: "India",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg"
  }
];

app.get("/", (req, res) => {

  let html = `
  <html>
  <head>
  <title>Seven Wonders</title>
  <style>
  body{
    font-family: Arial;
    text-align:center;
    background:#f4f4f4;
  }
  .container{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
  }
  .card{
    background:white;
    margin:15px;
    padding:15px;
    width:250px;
    border-radius:10px;
    box-shadow:0 2px 5px rgba(0,0,0,0.2);
  }
  img{
    width:100%;
    border-radius:10px;
  }
  </style>
  </head>
  <body>

  <h1>Seven Wonders of the World</h1>
  <div class="container">
  `;

  wonders.forEach(w => {
    html += `
      <div class="card">
        <img src="${w.image}" />
        <h3>${w.name}</h3>
        <p>${w.country}</p>
      </div>
    `;
  });

  html += `
  </div>
  </body>
  </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
