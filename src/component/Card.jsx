import { Link } from "react-router";

const Card = ({ book }) => {
    return (
        <div>
            <div className="card bg-base-100 w-80 h-100 shadow-xl">
                <figure className="h-64 bg-base-200">
                    {book.cover_image ? (
                        <img
                            src={book.cover_image}
                            alt={book.title}
                            className="w-full h-10 object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <span className="text-7xl font-bold text-base-content/40">
                                {book.title?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </figure>

                <div className="card-body">
                    <h2 className="card-title">
                        {book.title}

                        <div className="badge badge-secondary">
                            {book.category}
                        </div>
                    </h2>

                    <p className="text-sm text-base-content/70">
                        By {book.author}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                        <span className="text-xl font-bold">
                            ৳{book.price}
                        </span>
                    </div>

                    <div className="card-actions justify-end mt-3">
                        <Link to={`/book/${book.id}`}>
                        <button className="btn btn-primary">
                            View Details
                        </button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Card;