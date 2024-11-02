import { b } from "framer-motion/client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Blog = () => {
    const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false);
    const location = useLocation();
    const author= localStorage.getItem('author');
    const CombinedData = location.state;
    const getPost = (id) => {
        return CombinedData.filter(blog => blog.id == id).pop();

    }
    const { id } = useParams();
    const blog = getPost(id);

    useEffect(() => {
        if (author == blog.author)
            {
             setShowButtons(true);
            }
    }, []);

    const deleteBlog = () => {
        const newBlogData = JSON.parse(localStorage.getItem('newblogData'));
        const idx = newBlogData.findIndex(blog => blog.id == id);
        if (confirm("Are you sure you want to delete this?"))
        {  
            const oldData = newBlogData.splice(idx, 1);
            localStorage.setItem('newblogData', JSON.stringify(newBlogData));
            navigate('/');
        }
    }
    return (
        
        <div className="mx-auto p-2 my-10 w-full md:w-10/12">
            {showButtons && <div className="text-end">
                <Link  to="/blog/update" state={blog} className="bg-blue-400 p-2 rounded-lg text-white m-2">Edit</Link>
                <button className="bg-red-400 p-2 rounded-lg text-white m-2" onClick={deleteBlog}>Delete</button>
                </div>}
            <div
                className="hero min-h-[55vh] rounded-xl place-items-end"
                style={{
                    backgroundImage: `url(${blog.imageUrl})`,
                }}>
            </div>
            <div className="border-b-2 my-4">
                <h3 className="text-3xl py-3">{blog.title}</h3>
                <h2 className="text-xl py-2">{blog.subheading}</h2>
                <h2 className="text-end py-3">By {blog.author} on {blog.publishedDate}</h2>
            </div>
            <article className="leading-loose">
                {blog.content}
            </article>
        </div>
    );
}

export default Blog;