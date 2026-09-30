import { useEffect, useState } from "react";
import { baseurl } from "../services/BaseURL";
import Card from "../component/Card";

const BrowserBooks = () => {

    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        fetch(`${baseurl}/books/all`)
            .then(res => res.json())
            .then(data => setAllBooks(data))
    }, [])

    return (
        <div>
            <h1 className="flex justify-center text-4xl font-bold mt-10">Our Books</h1>
        <div className="flex justify-center">
            <div className="grid grid-cols-4 gap-10 p-12">
                {
                    allBooks.map((book) => (
                        <Card book={book} />
                    ))
                }
            </div>
        </div>
        </div>
    );
};

export default BrowserBooks;