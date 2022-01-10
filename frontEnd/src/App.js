import React,{useState,useContext,useEffect} from 'react';
import Dashboard from './domain/pages/dashboard/dashboard';
import "./App.css";
function App() {
  const [loading, setLoading] = useState(false)
  const loadScript = (src) => {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script')
      script.src = src
      script.addEventListener('load', function () {
        resolve()
      })
      script.addEventListener('error', function (e) {
        reject(e)
      })
      document.body.appendChild(script)
      document.body.removeChild(script)
    })
  }

   useEffect(() => {
 loadScript(`${process.env.PUBLIC_URL}/js/custom.min.js`)

   })
  return (
    <Dashboard/>
  );
}

export default App;

