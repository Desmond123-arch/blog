import { useState } from "react";

import { useNavigate } from "react-router-dom";



function checkImage(url) {
    return new Promise((resolve, reject) => {
        var image = new Image();
        image.onload = function () {
            if (this.width > 0) {
                console.log("image exists");
                resolve(true);
            } else {
                reject(false);
            }
        };
        image.onerror = function () {
            console.log("image doesn't exist");
            reject(false);
        };
        image.src = url;
    });
}

function updateDB(data) {

    let oldData = localStorage.getItem("newblogData");
    if (oldData)
    {
        oldData = JSON.parse(oldData);
    }
    else {
        oldData = [];
    }
    let id = localStorage.getItem('dataLength') + 1;
    
    data['id'] = id;
    oldData.push(data);
    localStorage.setItem('newblogData', JSON.stringify(oldData));
}
const formatDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

const CreateBlog = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let validationErrors = {};

        const title = formData.get('title');
        const subheading = formData.get('subheading');
        const imageUrl = formData.get('imageUrl');
        const content = formData.get('content');
        const author = localStorage.getItem('author');
        const publishedDate = formatDate();

        const data = { title, subheading, imageUrl, content, author, publishedDate }


        if (title.trim().length === 0) {
            validationErrors.title = "Title must be filled";
        }
        if (subheading.trim().length === 0) {
            validationErrors.subheading = "Subheading must be filled";
        }
        if (!(content.trim().length > 50)) {
            validationErrors.content = "Content should be greater that 50";
        }
        if (imageUrl.trim().length === 0) {
            validationErrors.imageUrl = "Image url must be provided";
        }
        await checkImage(imageUrl)
            .then(exists => {
                console.log('Image exists:', exists);
            })
            .catch(() => {
                validationErrors.imageUrl = "Correct image must be provided";
            });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            updateDB(data);
            navigate('/');
            setErrors({});
        }
    }
    return (
        <div>
            <h3 className="text-3xl text-center">Create a blog post</h3>
            <form onSubmit={handleSubmit} className="flex gap-2 flex-col w-[40%] mx-auto my-10">
                <input type="text" name="title" placeholder="Title of blog" className="input input-bordered w-full " />
                {errors.title && <div className="text-red-500">{errors.title}</div>}

                <input type="text" name="subheading" placeholder="Subheading" className="input input-bordered w-full " />
                {errors.subheading && <div className="text-red-500">{errors.subheading}</div>}

                <input type="text" name="imageUrl" placeholder="imageURL of hero image" className="input input-bordered w-full " />
                {errors.imageUrl && <div className="text-red-500">{errors.imageUrl}</div>}

                <textarea name="content" id="blogContent" placeholder="Write your article here" rows={15}>
                </textarea>
                {errors.content && <div className="text-red-500">{errors.content}</div>}

                <button type="submit" className="btn btn-circle w-full"> Create Post</button>
            </form>
        </div>
    );
}

export default CreateBlog;