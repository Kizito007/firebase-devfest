import { useState, useEffect } from "react"
import { auth, provider } from "../config"
import { signInWithPopup, onAuthStateChanged } from "firebase/auth"
import Home from "./Home"

const SignUp = () => {
    const [value, setValue] = useState()
    const [user, setUser] = useState()

    const handleClick = () =>  {
        signInWithPopup(auth, provider).then(data => {
            setValue(data.user.email)
            localStorage.setItem('email', data.user.email)
        })
    }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
        } else {
          console.log("User not signed in")
        }
      });
    }, [])

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    }, [])
    
  return (
    <div>
        {
            value ? <Home user={user} /> :
            <button onClick={handleClick}>SignIn with Google to proceed</button>
        }
    </div>
  )
}

export default SignUp