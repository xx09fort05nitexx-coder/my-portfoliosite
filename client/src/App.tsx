import WorkDetail from './WorkDetail'
import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router'
import './App.css'


type Work = {
  id: number
  title: string
}

function App() {
  const [works, setWorks] = useState<Work[]>([])

  useEffect(() => {
    async function fetchWorks() {
      try {
        const response = await fetch('/api/works')

        if (!response.ok) {
          throw new Error('作品の取得に失敗しました')
        }

        const data: Work[] = await response.json()
        setWorks(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchWorks()
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <h1>My Portfolio</h1>
            <h2>制作作品</h2>

            <ul>
{works.map((work) => (
  <li key={work.id}>
    <Link to={`/works/${work.id}`}>
      {work.title}
    </Link>
  </li>
))}
            </ul>
          </main>
        }
      />

      <Route
  path="/works/:id"
  element={<WorkDetail />}
/>
    </Routes>
  )
}

export default App