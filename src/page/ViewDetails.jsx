import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseurl } from "../services/BaseURL";
import toast from "react-hot-toast";

const ViewDetails = () => {

    const [book, setBook] = useState([])
    const { id } = useParams();

    const accessToken = localStorage.getItem('lm-token')
    useEffect(() => {
        fetch(`${baseurl}/books/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => setBook(data))
            .catch(err => console.log(err))

    }, [id, accessToken])

    const btnHandel = async() => {

            const res = await fetch(`${baseurl}/reserve/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .catch(err => console.log(err))

            const resData = await res.json();
           toast.success(resData.Message)
            // console.log(resData);
            

    }

    return (
        <div>
            <div className="min-h-screen bg-base-200 py-10 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Back Button */}
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-ghost mb-6"
                    >
                        ← Back to Books
                    </button>

                    {/* Main Book Card */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                                {/* Book Cover */}
                                <div className="flex justify-center">
                                    <div className="w-full max-w-sm h-112.5 rounded-xl overflow-hidden bg-base-200 shadow-lg">

                                        {book.cover_image ? (
                                            <img
                                                src={book.cover_image}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center">
                                                <span className="text-8xl">📖</span>
                                                <p className="mt-4 text-lg opacity-60">
                                                    No Cover Available
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* Book Details */}
                                <div className="flex flex-col justify-center">

                                    {/* Category */}
                                    <div className="badge badge-primary mb-4 w-fit">
                                        {book.category}
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-4xl font-bold mb-3">
                                        {book.title}
                                    </h1>

                                    {/* Author */}
                                    <p className="text-lg opacity-70 mb-6">
                                        by{" "}
                                        <span className="font-semibold">
                                            {book.author}
                                        </span>
                                    </p>

                                    {/* Description */}
                                    <p className="text-base leading-7 opacity-80 mb-8">
                                        {book.discription}
                                    </p>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">
                                            ৳{book.price}
                                        </span>
                                    </div>

                                    {/* Availability */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div
                                            className={`badge ${book.available_copies > 0
                                                ? "badge-success"
                                                : "badge-error"
                                                }`}
                                        >
                                            {book.available_copies > 0
                                                ? "Available"
                                                : "Out of Stock"}
                                        </div>

                                        <span className="opacity-70">
                                            {book.available_copies} of{" "}
                                            {book.total_copies} copies available
                                        </span>
                                    </div>

                                    {/* Borrow Button */}
                                    <button
                                        disabled={book.available_copies === 0}
                                        className="btn btn-primary btn-lg w-full md:w-fit px-10"
                                    onClick={() => btnHandel()}
                                    >
                                        {book.available_copies > 0
                                            ? "Borrow Book"
                                            : "Currently Unavailable"}
                                    </button>

                                </div>
                            </div>

                            {/* Divider */}
                            <div className="divider my-10">
                                BOOK INFORMATION
                            </div>

                            {/* Information Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                <div className="stat bg-base-200 rounded-xl">
                                    <div className="stat-title">
                                        Category
                                    </div>
                                    <div className="stat-value text-lg">
                                        {book.category}
                                    </div>
                                </div>

                                <div className="stat bg-base-200 rounded-xl">
                                    <div className="stat-title">
                                        Total Copies
                                    </div>
                                    <div className="stat-value text-lg">
                                        {book.total_copies}
                                    </div>
                                </div>

                                <div className="stat bg-base-200 rounded-xl">
                                    <div className="stat-title">
                                        Available
                                    </div>
                                    <div className="stat-value text-lg text-success">
                                        {book.available_copies}
                                    </div>
                                </div>

                                <div className="stat bg-base-200 rounded-xl">
                                    <div className="stat-title">
                                        Book ID
                                    </div>
                                    <div className="stat-value text-lg">
                                        #{book.id}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;