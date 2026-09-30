import { useEffect, useState } from "react";
import { baseurl } from "../services/BaseURL";
import Card from "../component/Card";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`${baseurl}/books/all`)
            .then(res => res.json())
            .then(data => setBooks(data))
            .finally(() => setLoading(false))
    }, [])
    // console.log(books);
    return (
        <div>
            <div
                className="hero h-100"
                style={{
                    backgroundImage:
                        "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI1Uhg9BlwaPvyZfS-XCAI-4CflP9BBTmqxrWL6WW3Xw&s=10)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            <h1 className="flex justify-center text-4xl font-bold mt-15">Our Featurs</h1>
            <div className="flex justify-center mt-15">
                <div className="grid grid-cols-4 gap-4">
                    {
                        loading ? <div className="flex justify-center items-center h-screen">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div> : books.slice(0, 4).map((book) => (
                            <Card book={book} />
                        ))
                    }
                </div>

            </div>
        </div>
    );
};

export default Home;