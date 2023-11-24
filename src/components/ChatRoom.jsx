import { useEffect, useState } from "react"
import { onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from "firebase/firestore"
import { auth, db, provider } from "../config"
import { signInWithPopup, onAuthStateChanged } from "firebase/auth"

const ChatRoom = () => {
  const [user, setUser] = useState()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"))
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        console.log("User not signed in")
      }
    });
  }, [])

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp()
    })

    setNewMessage("")
  }

  const handleClick = () =>  {
    signInWithPopup(auth, provider).then(data => {
        localStorage.setItem('email', data.user.email)
    }
  )
  
}

  return (
    <div className='' >
    { user ? (
            <div>
              <h2> Devfest Owerri Chat Room </h2>
            <div> Logged in as {user.displayName}</div> <br/><br/>
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              style={{ padding: "10px" }}
            />
            <button className='msg' onClick={sendMessage}>Send Message</button><br/><br/>

            <div className="">

      {
        messages.map(msg => (
          <div  key={msg.id} className={`text-cover ${msg.data.uid === user.uid ? 'justifier' : null }`}>
          <div className="text">
            <img className='text-img' src={msg.data.photoURL} />
          <span>{msg.data.text}</span> <hr/>
          </div>
        </div>
    ))}
    </div>
      </div>
    // <h2>dd</h2>
    ):
 
    <button onClick={handleClick}>Login with Google</button>
}
    </div>
  )
}

export default ChatRoom