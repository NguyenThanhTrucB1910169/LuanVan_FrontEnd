import React, { Fragment } from 'react'
import ReactImageUploading from 'react-images-uploading';
import axios from 'axios';
import './upload.css'
// const maxNumber =3;
class upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImages: [],
        };
        this.base64 = ''
      }
      // const [selectedImages, setSelectedImages] = useState([]);
      
 onSelectFile = async(event) => {
    // console.log(event.target.files[0])
    const selectedFiles = event.target.files;
    // selectedFiles.map
    console.log(selectedFiles)
    // console.log(selectedFiles)
    // const selectedFilesArray = Array.from(selectedFiles);
    // console.log(selectedFilesArray)
    Object.keys(selectedFiles).map(async(file) => (
      // console.log(typeof await this.convertBase64(selectedFiles[file])),
    //   console.log(1),
    // this.base64 = await this.convertBase64(selectedFiles[file]),
    // console.log(typeof this.base64),
      this.setState({
        selectedImages: this.state.selectedImages.concat(selectedFiles.name)
    }
    )
    ))
    // const imagesArray = selectedFilesArray.map(async(file) => {
    //   return await this.convertBase64(file);
    // });
    // console.log(base64)
    
// this.setState({
//     // selectedImages: this.state.selectedImages.concat(imagesArray)
// },
// () => {
//   console.log(this.state.selectedImages)
// }
// )
// event.target.value = "";
};

uploadhandle = () => {
  console.log(111)
  console.log(this.state.selectedImages)
  // axios.post("http://localhost:3001/api/upload", this.state.selectedImages)

}


convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result)
    fileReader.onerror = (error) => reject(error)
  })
}

render() {
  // console.log(this.state.selectedImages)


    return (
        <Fragment>
        {/* <form action="http://localhost:3001/api/upload" encType="multipart/form-data" method='post'> */}

<label>
        + Add Images
        <br />
        <span>up to 10 images</span>
        <input
          type="file"
          name="images"
          onChange={this.onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />

      {/* <input type="file" multiple /> */}
      <button onClick={this.uploadhandle}>
        upload
      </button>
        {/* </form> */}
      {/* {this.state.selectedImages.length > 0 &&
        (this.state.selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {this.state.selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log(this.state.selectedImages);
            }}
          >
            UPLOAD {this.state.selectedImages.length} IMAGE
            {this.state.selectedImages.length === 1 ? "" : "S"}
          </button>
        ))} */}

      <div className="images">
        {this.state.selectedImages &&
          this.state.selectedImages.map((image, index) => {
            {/* console.log(image.PromiseResult); */}
            return (
              <div key={image} className="image">
                <img src={image} height="200" alt="upload" />
                <button>
                  delete image
                </button>
                <p>{index + 1}</p>
              </div>
            );
          })}
      </div>

        </Fragment>
       
        
   
    )
}
}

export default upload