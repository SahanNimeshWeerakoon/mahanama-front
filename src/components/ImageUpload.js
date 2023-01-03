import React, { useState } from "react";
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage'
import "../scss/ImageUpload.scss";

const ImageUpload = ({ setImagesArr }) => {
    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });
        setSelectedImages((previousImages) => previousImages.concat(imagesArray));

        uploadImagesToFirebase(selectedFilesArray);

        // FOR BUG IN CHROME
        event.target.value = "";
    };

    const uploadImagesToFirebase = (images) => {
        images.forEach(img => {
                let uniqImgName = Date.now() + img.name;
                const imageRef = ref(storage, `images/${uniqImgName}`);
                uploadBytes(imageRef, img).then(() => {
                    setImagesArr(imageRef);
                });
        });
    }

    function deleteHandler(image) {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }

    return (
        <section className="image-upload">
        <label>
            + Add Images
            <br />
            <span>up to 10 images</span>
            <input
            type="file"
            name="images"
            onChange={onSelectFile}
            multiple
            accept="image/png , image/jpeg, image/webp"
            />
        </label>
        <br />

        <input type="file" multiple />

        {selectedImages.length > 0 &&
            (selectedImages.length > 10 ? (
            <p className="error">
                You can't upload more than 10 images! <br />
                <span>
                please delete <b> {selectedImages.length - 10} </b> of them{" "}
                </span>
            </p>
            ) : "")}

        <div className="images">
            {selectedImages &&
            selectedImages.map((image, index) => {
                return (
                <div key={image} className="image">
                    <img src={image} height="200" alt="upload" />
                    <button onClick={() => deleteHandler(image)}>
                    delete image
                    </button>
                    <p>{index + 1}</p>
                </div>
                );
            })}
        </div>
        </section>
    );
};

export default ImageUpload;
