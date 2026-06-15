import { useEffect, useState } from 'react'

function CreateDatasetButton({ api, name, callback }) {
  const [isCreating, setIsCreating] = useState(false);

  function createDataset() {
    setIsCreating(true);
    api.create_dataset(name).then(res => {
      setIsCreating(false);
      callback();
    });
  }

  if (isCreating)
    return <button>Creating...</button>
  return <button onClick={createDataset}>Create Dataset</button>
}

function DatasetList({ api }) {
  const [datasetName, setDatasetName] = useState('');
  const [datasetList, setDatasetList] = useState([]);

  function update_datasets() {
    api.get_datasets().then(setDatasetList);
    return;
  }

  useEffect(update_datasets, []);

  return <>
    <CreateDatasetButton
      api={api}
      name={datasetName}
      callback={update_datasets}
    />

    <button onClick={
      () => api.get_datasets().then(update_datasets)
    }>Get Datasets</button>

    <button onClick={
      () => api.get_dataset(datasetName).then(console.log)
    }>Get Dataset</button>

    <button onClick={
      () => api.delete_dataset(datasetName).then(update_datasets)
    }>Delete Dataset</button>

    <input name='dataset-name' onChange={e => setDatasetName(e.target.value)} />

    <ul>
      {datasetList.map(ds => <li key={ds.name}>{ds.name} - {ds.rows} rows</li>)}
    </ul>
  </>
}

export default DatasetList