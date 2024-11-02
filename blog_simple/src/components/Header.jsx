import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useEffect } from "react";
const Header = () => {

    const [showMenu, setShowMenu] = useState(false);

    // Update state based on screen width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowMenu(true);
            } else {
                setShowMenu(false);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();
    }, []);


    const variants = {
        closed: { opacity: 1, y: 0 },
        open: { opacity: 0, y: "-100%" },
    }

    return (
        <div className="navbar bg-base-100 responsive flex-col md:flex-row">
            <div className="w-full flex justify-between">
                <Link to="/" className="btn btn-ghost text-xl text-start">Agric blog</Link>
                <button className="btn btn-square btn-ghost md:hidden" onClick={() => {
                    if (showMenu) setShowMenu(false);
                    else setShowMenu(true);
                    console.log(showMenu);
                }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <motion.div animate={showMenu ? "closed" : "open"} variants={variants} className={"flex-none gap-6 " + (showMenu ? "flex flex-col" : "hidden") + " md:flex md:flex-row text-xl opacity-100"} >
                <div>
                    <Link to={'/'} className="hover:underline">Home</Link>
                </div>
                <div>
                    <Link to={'/blog/create'} className="hover:underline">Post a blog</Link>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Header;