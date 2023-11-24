import { useState, useEffect } from 'react'
import { imageDb } from '../config'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import ImageList from './ImageList'
import Spinner from './Spinner'

const UploadCharacter = () => {
    const [img, setImg] = useState('')
    const [imgUrl, setImgUrl] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = () => {
       if (img !== null) {
            setIsLoading(true)
            const imgRef = ref(imageDb, `files/${v4()}`)
            uploadBytes(imgRef, img).then(value => {
                getDownloadURL(value.ref).then(url => {
                    setImgUrl(data => [...data, url])
                })
            })
            setIsLoading(false)
            console.log(isLoading)
       }
    }

    useEffect(() => {
        setIsLoading(true)
      listAll(ref(imageDb, "files")).then(imgs => {
        imgs.items.forEach(val => {
            getDownloadURL(val).then(url => {
                setImgUrl(data => [...data, url])
            })
        })
        setIsLoading(false)
      })
    }, [])
    
  return <div>
    <h2>Upload Image Character</h2> <br/>
    <input type='file' onChange={e => setImg(e.target.files[0])} /> <br/> <br/> <br/>
    {
        isLoading ? <Spinner /> : null
    }
    <button onClick={handleClick}>Upload</button>
    <ImageList images={imgUrl} />
    </div>
}

export default UploadCharacter