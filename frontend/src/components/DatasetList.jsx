import { useCallback, useEffect, useState } from 'react'

function DatasetList({ api }) {
  const [datasetName, setDatasetName] = useState('');
  const [datasetList, setDatasetList] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const create_dataset = () => {
    setIsCreating(true);
    api.create_dataset(datasetName)
      .then(update_datasets)
      .finally(() => setIsCreating(false));
  };

  const update_datasets = useCallback(() => {
    api.get_datasets().then(setDatasetList);
  }, [api]);

  useEffect(() => {
    update_datasets();
  }, [update_datasets]);

  return <>
    <button onClick={create_dataset} disabled={isCreating}>
      {isCreating ? 'Creating...' : 'Create Dataset'}
    </button>

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