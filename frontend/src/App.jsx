import { useEffect, useState } from 'react'
import './App.css'

function DatasetButtons({ api }) {
  return <>
    <button onClick={
      () => api.create_dataset('arg')
        .catch(e => console.log(`caught error ${e}`))
    }>Create Dataset</button>

    <button onClick={
      () => api.get_datasets()
        .then(console.log)
        .catch(e => console.log(`caught error ${e}`))
    }>Get Datasets</button>

    <button onClick={
      () => api.get_dataset('arg')
        .then(console.log)
        .catch(e => console.log(`caught error ${e}`))
    }>Get Dataset</button>

    <button onClick={
      () => api.delete_dataset('arg')
        .catch(e => console.log(`caught error ${e}`))
    }>Delete Dataset</button>
  </>
}

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
      {isLoading ? <p>Loading...</p> : <DatasetButtons api={window.pywebview.api} />}
    </>
  )
}

export default App
