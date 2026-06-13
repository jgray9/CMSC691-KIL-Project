import { useEffect, useState } from 'react'

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

function DatasetList({ api }) {
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

export default DatasetList