import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const texts = {
    title: 'Vite + React',
    total_txt: `count is ${String(count)}`,
    edit_txt: 'Edit <code>src/App.tsx</code> and save to test HMR',
    read_the_docs: 'Click on the Vite and React logos to learn more',
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{texts.title}</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((_count) => _count + 1)
          }}
        >
          {texts.total_txt}
        </button>
        <p dangerouslySetInnerHTML={{ __html: texts.edit_txt }} />
      </div>
      <p className="read-the-docs">{texts.read_the_docs}</p>
    </>
  )
}

export default App
