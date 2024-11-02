import { Link } from "react-router-dom";
import { DBdata } from '../temp.js'
import { useState } from "react";
import { useEffect } from "react";

const oldBlogData = DBdata.blogData;

//use a default user
const author = "John Doe"
localStorage.setItem('author', author);

const Home = () => {
    const [CombinedData, setCombinedData] = useState([...oldBlogData]);
    localStorage.setItem('dataLength', CombinedData.length);

    useEffect(() => {
        const newBlogData = JSON.parse(localStorage.getItem('newblogData'));
        if (newBlogData) {
            setCombinedData((prev) => [...prev, ...newBlogData]);
            //change the length
            localStorage.setItem('dataLength', CombinedData.length);

        }

    }, []);

    const latestblog = CombinedData[CombinedData.length - 1];
    return (
        <div className="mx-auto my-10 w-full md:w-10/12">
            <Link to={`/blog/${latestblog.id}`} state={CombinedData}
                className="hero min-h-[55vh] rounded-xl place-items-end"
                style={{
                    backgroundImage: `url(${latestblog.imageUrl})`,
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="text-neutral-content w-full h-max p-5">
                    <div className="w-full">
                        <h1 className="text-5xl font-bold text-start">{latestblog.title}</h1>
                        <p className="text-3xl font-bold text-start">{latestblog.subheading}</p>
                    </div>
                </div>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {
                    CombinedData.map((blog) => {
                        return (
                            <Link to={`/blog/${blog.id}`} state={CombinedData} key={blog.id} className="card bg-base-100 w-100 h-96 shadow-xl mt-10 mx-auto md:mx-0">
                                <figure>
                                    <img
                                        src={blog.imageUrl}
                                        alt="blog header" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{blog.title}</h2>
                                    <p>{blog.subheading}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>

    );
}

export default Home;