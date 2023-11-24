
const ImageList = ({ images }) => {
    let count = 0;
  return (
    <div className="image-list">
        {
            images ?
            images.map(url => <div key={count += 1}>
                <img src={url} className="images" />
            </div>) : null
        }
    </div>
  )
}

export default ImageList