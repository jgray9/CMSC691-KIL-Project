import { useEffect, useState } from 'react'
import './App.css'

function DatasetButtons({ api }) {
  const [datasetName, setDatasetName] = useState('');

  return <>
    <button onClick={
      () => api.create_dataset(datasetName)
        .catch(e => console.log(`caught error ${e}`))
    }>Create Dataset</button>

    <button onClick={
      () => api.get_datasets()
        .then(console.log)
        .catch(e => console.log(`caught error ${e}`))
    }>Get Datasets</button>

    <button onClick={
      () => api.get_dataset(datasetName)
        .then(console.log)
        .catch(e => console.log(`caught error ${e}`))
    }>Get Dataset</button>

    <button onClick={
      () => api.delete_dataset(datasetName)
        .catch(e => console.log(`caught error ${e}`))
    }>Delete Dataset</button>

    <input name='dataset-name' onChange={e => setDatasetName(e.target.value)} />
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
