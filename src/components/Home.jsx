import { Link } from "react-router-dom"
import { auth } from "../config"

const Home = ({ user }) => {

    const signOut = () =>  {
        localStorage.removeItem('email')
        auth.signOut()
        // redirect to homepage
        window.location.reload();
    }
  return <>
    {
        user ?
        <>
            <img src={user.photoURL} />
            <p>Name: { user.displayName } </p>
            <p>Email: {user.email} </p>
        </> :
        null
    }
    <Link to="characters">Characters</Link> 
    <Link style={{ marginLeft: "20px" }} to="chat" user={user}>Chat Room</Link> <br/> <br/> <br/>
    <button onClick={signOut}>Log Out</button>
    </>
}

export default Home