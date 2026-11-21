import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

type Work = {
  id: number
  title: string
}

function WorkDetail() {
  const { id } = useParams()

  const [work, setWork] = useState<Work | null>(null)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  async function fetchWork() {
    try {
      const response = await fetch(`/api/works/${id}`)

      if (!response.ok) {
        throw new Error('作品の取得に失敗しました')
      }

      const data: Work = await response.json()
      setWork(data)
    } catch (error) {
  console.error(error)
  setError('作品を取得できませんでした')
}
  }

  fetchWork()
}, [id])

  if (error !== null) {
  return <p>{error}</p>
}

  if (work === null) {
  return <p>作品を読み込み中...</p>
}

return (
  <main>
    <h1>{work.title}</h1>
    <p>作品ID：{work.id}</p>
  </main>
)
}
export default WorkDetail