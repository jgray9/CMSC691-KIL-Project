import { useEffect, useState } from 'react'
import './App.css'

function CreateDatasetButton({ api, name }) {
  const [isCreating, setIsCreating] = useState(false);

  function createDataset() {
    setIsCreating(true);
    api.create_dataset(name).then(res => {
      setIsCreating(false);
    });
  }

  if(isCreating)
    return <button>Creating...</button>
  return <button onClick={createDataset}>Create Dataset</button>
}

function DatasetButtons({ api }) {
  const [datasetName, setDatasetName] = useState('');

  return <>
    <CreateDatasetButton api={api} name={datasetName}/>

    <button onClick={
      () => api.get_datasets().then(console.log)
    }>Get Datasets</button>

    <button onClick={
      () => api.get_dataset(datasetName).then(console.log)
    }>Get Dataset</button>

    <button onClick={
      () => api.delete_dataset(datasetName).then(console.log)
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
