import React, { useState } from 'react';
import axios from 'axios';
function FileUploadComponent() {
    const [images, setImages] = useState(null);

    const handleFileChange = (event) => {
      const selectedImages = Array.from(event.target.files);
    // const selectedImages = event.target.files[0];
      // console.log(event.target.files[0])
      setImages(selectedImages);
    };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }    
    axios
      .post('http://localhost:3005/api/upload', formData)
      .then((res) => res.data);

  };

  return (
    <div>
      <h1>Tải lên ảnh</h1>
      <form
        onSubmit={handleUpload}
        method='POST'
        encType='multipart/form-data'
        action='uploaddufichier'
      >
        <input
          type='file'
          name='iamges'
          onChange={handleFileChange}
          multiple
        />
        <button> Tải ảnh </button>
      </form>
    </div>
  );
}

export default FileUploadComponent;
