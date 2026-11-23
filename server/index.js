
const express = require('express')
const db = require('./database')

const app = express()
const port = 3000

app.use(express.json())

// 作品一覧を取得
app.get('/api/works', (req, res) => {
  try {
    const works = db.prepare(
      'SELECT * FROM works'
    ).all()

    res.json(works)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: '作品一覧の取得に失敗しました'
    })
  }
})

// 作品詳細を取得
app.get('/api/works/:id', (req, res) => {
  try {
    const id = Number(req.params.id)

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: '作品IDが不正です'
      })
    }

    const work = db.prepare(
      'SELECT * FROM works WHERE id = ?'
    ).get(id)

    if (!work) {
      return res.status(404).json({
        message: '作品が見つかりません'
      })
    }

    res.json(work)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: '作品の取得に失敗しました'
    })
  }
})

app.listen(port, () => {
  console.log(`サーバー起動：http://localhost:${port}`)
})
