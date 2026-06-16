import { useCallback, useEffect, useState } from 'react'

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

  const update_datasets = useCallback(() => {
    api.get_datasets().then(setDatasetList);
  }, [api]);

  useEffect(() => {
    update_datasets();
  }, [update_datasets]);

  return <>
    <CreateDatasetButton
      api={api}
      name={datasetName}
      callback={update_datasets}
    />

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