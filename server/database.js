
const { DatabaseSync } = require('node:sqlite')
const path = require('node:path')

const db = new DatabaseSync(
  path.join(__dirname, 'portfolio.db')
)

db.exec(`
  CREATE TABLE IF NOT EXISTS works (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL
  )
`)

const count = db.prepare(
  'SELECT COUNT(*) AS count FROM works'
).get()

if (count.count === 0) {
  const insert = db.prepare(
    'INSERT INTO works (title) VALUES (?)'
  )

  insert.run('Lognest')
  insert.run('My Portfolio')
}

module.exports = db
