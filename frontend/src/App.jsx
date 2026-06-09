import './App.css'

function App() {
  let api = new Promise(res => {
    if(window.pywebview !== undefined) res(window.pywebview.api)
    else setTimeout(() => res(window.pywebview.api), 100);
  });

  return (
    <>
      TODO: add frontend
    </>
  )
}

export default App
