const express = require("express");

const app = express();
const port = 3000;

const works = [
  { id: 1, title: "Lognest" },
  { id: 2, title: "My Portfolio" }
];

app.get("/api/works", (req, res) => {
  res.json(works);
});

app.get("/api/works/:id", (req, res) => {
  const id = Number(req.params.id);

  const work = works.find((work) => work.id === id);

  if (!work) {
    return res.status(404).json({
      message: "作品が見つかりません"
    });
  }

  res.json(work);
});

app.listen(port, () => {
  console.log(`サーバー起動：http://localhost:${port}`);
});