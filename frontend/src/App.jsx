import { useEffect, useState } from 'react'
import DatasetList from './components/DatasetList'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      if (window.pywebview === undefined) return;
      setIsLoading(false);
      clearInterval(id);
    }, 100);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      {isLoading ? <p>Loading...</p> : <DatasetList api={window.pywebview.api} />}
    </>
  )
}

export default App
