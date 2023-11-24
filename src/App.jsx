import SignUp from './components/SignUp'
import './App.css'
import firebase from './assets/firebase.jpg'

function App() {

  return (
    <>
      <img src={firebase} style={{ width: "60px" }} />
      <h1>DevFest Firebase Demo</h1>
      <div className="card">
        <SignUp />
      </div>
    </>
  )
}

export default App
