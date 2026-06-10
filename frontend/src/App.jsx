import './App.css'

function App() {
  let api = new Promise(res => {
    // if api is not loaded it, repeatedly check until it is
    if(window.pywebview === undefined) {
      let id = setInterval(() => {
        if(window.pywebview === undefined) return;
        res(window.pywebview.api)
        clearTimeout(id);
      }, 10);
    // if api is loaded, resolve with it without making timer
    } else
      res(window.pywebview.api)
  });

  return (
    <>
      TODO: add frontend
      <button onClick={() => api.then(api => api.create_dataset('arg'))}>click</button>
      <button onClick={() => api.then(api => api.get_datasets('arg'))}>click</button>
      <button onClick={() => api.then(api => api.get_dataset('arg'))}>click</button>
      <button onClick={() => api.then(api => api.delete_dataset('arg'))}>click</button>
    </>
  )
}

export default App
