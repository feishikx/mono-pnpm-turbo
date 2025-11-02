import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@my-mono/ui'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 20 }}>
      <h1>Monorepo 业务应用</h1>
      <Button onClick={() => alert('点击了共享组件库的 Button！')}>
        来自 @my-monorepo/ui 的 Button
      </Button>
    </div>
  )
}

export default App
