import { useContext, useEffect, useState } from "react";
import { baseurl } from "../../services/BaseURL";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

const ManageBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const {accessToken} = useContext(AuthContext);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("create");

    // Selected book for update
    const [selectedBook, setSelectedBook] = useState(null);

    // Form
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        discription: "",
        price: "",
        total_copies: "",
        available_copies: "",
    });

    const [saving, setSaving] = useState(false);


    // =========================
    // GET ALL BOOKS
    // =========================
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
    
                const res = await fetch(`${baseurl}/books/all`);
                const data = await res.json();
    
                if (!res.ok) {
                    throw new Error(
                        data.detail || "Failed to load books"
                    );
                }
    
                setAllBooks(data);
    
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);



    // =========================
    // OPEN CREATE MODAL
    // =========================
    const openCreateModal = () => {

        setModalType("create");
        setSelectedBook(null);

        setFormData({
            title: "",
            author: "",
            category: "",
            discription: "",
            price: "",
            total_copies: "",
            available_copies: "",
        });

        setShowModal(true);
    };


    // =========================
    // OPEN UPDATE MODAL
    // =========================
    const openUpdateModal = (book) => {

        setModalType("update");
        setSelectedBook(book);

        setFormData({
            title: book.title || "",
            author: book.author || "",
            category: book.category || "",
            discription: book.discription || "",
            price: book.price ?? "",
            total_copies: book.total_copies ?? "",
            available_copies: book.available_copies ?? "",
        });

        setShowModal(true);
    };


    // =========================
    // FORM INPUT CHANGE
    // =========================
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // =========================
    // CREATE / UPDATE BOOK
    // =========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            let url = "";
            let method = "";

            if (modalType === "create") {

                url = `${baseurl}/admin/book_create`;
                method = "POST";

            } else {

                url = `${baseurl}/admin/book_update/${selectedBook.id}`;
                method = "PUT";
            }


            // Convert number fields
            const bodyData = {
                title: formData.title,
                author: formData.author,
                category: formData.category,
                discription: formData.discription,
                price: Number(formData.price),
                total_copies: Number(formData.total_copies),
            };


            // available_copies is only needed for update
            if (modalType === "update") {
                bodyData.available_copies =
                    Number(formData.available_copies);
            }


            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${accessToken}`
                },
                body: JSON.stringify(bodyData),
            });


            const data = await res.json();


            if (!res.ok) {
                throw new Error(
                    data.detail || "Something went wrong"
                );
            }


            // Success
            if (modalType === "create") {
                toast.success(
                    data.Message || "Book created successfully"
                );
            } else {
                toast.success(
                    data.Message || "Book updated successfully"
                );
            }


            // Close modal
            setShowModal(false);

        } catch (error) {

            toast.error(error.message);

        } finally {

            setSaving(false);
        }
    };


    // =========================
    // DELETE BOOK
    // =========================
    const deleteHandel = async (book) => {

        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${book.title}"?`
        );

        if (!confirmDelete) return;

        setDeletingId(book.id);

        try {

            const res = await fetch(
                `${baseurl}/admin/delete_book/${book.id}`,
                {
                    method: "DELETE",
                }
            );

            const resData = await res.json();

            if (!res.ok) {
                throw new Error(
                    resData.detail ||
                    resData.Message ||
                    "Failed to delete book"
                );
            }


            // Remove from UI
            setAllBooks((prevBooks) =>
                prevBooks.filter(
                    (item) => item.id !== book.id
                )
            );


            toast.success(
                resData.Message ||
                "Book deleted successfully"
            );

        } catch (error) {

            toast.error(error.message);

        } finally {

            setDeletingId(null);
        }
    };


    return (
        <div className="p-4 md:p-6 bg-base-200 min-h-screen">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Manage Books
                    </h1>

                    <p className="text-base-content/60 mt-1">
                        Create, update and delete library books
                    </p>
                </div>


                {/* CREATE BUTTON */}
                <button
                    onClick={openCreateModal}
                    className="btn btn-primary"
                >
                    <span className="text-lg">+</span>
                    Create Book
                </button>

            </div>


            {/* ================= BOOK COUNT ================= */}
            <div className="mb-4">
                <div className="badge badge-neutral badge-lg">
                    Total Books: {allBooks.length}
                </div>
            </div>


            {/* ================= LOADING ================= */}
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}


            {/* ================= EMPTY ================= */}
            {!loading && allBooks.length === 0 && (
                <div className="card bg-base-100 shadow">
                    <div className="card-body text-center py-16">

                        <div className="text-5xl mb-3">
                            📚
                        </div>

                        <h2 className="text-xl font-bold">
                            No Books Found
                        </h2>

                        <p className="text-base-content/60 mb-4">
                            There are no books in your library yet.
                        </p>

                        <button
                            onClick={openCreateModal}
                            className="btn btn-primary mx-auto"
                        >
                            Create Your First Book
                        </button>

                    </div>
                </div>
            )}


            {/* ================= TABLE ================= */}
            {!loading && allBooks.length > 0 && (

                <div className="card bg-base-100 shadow-xl">

                    <div className="card-body p-0">

                        <div className="overflow-x-auto">

                            <table className="table">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Book</th>
                                        <th>Author</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Copies</th>
                                        <th>Status</th>
                                        <th className="text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>


                                <tbody>

                                    {allBooks.map((book, index) => (

                                        <tr
                                            key={book.id}
                                            className="hover"
                                        >

                                            {/* NUMBER */}
                                            <td>
                                                <span className="font-semibold">
                                                    {index + 1}
                                                </span>
                                            </td>


                                            {/* BOOK */}
                                            <td>

                                                <div className="flex items-center gap-3">

                                                    <div className="avatar">

                                                        <div className="w-14 h-16 rounded-lg bg-base-300 flex items-center justify-center overflow-hidden">

                                                            {book.cover_image ? (

                                                                <img
                                                                    src={book.cover_image}
                                                                    alt={book.title}
                                                                    className="w-full h-full object-cover"
                                                                />

                                                            ) : (

                                                                <span className="text-2xl">
                                                                    📖
                                                                </span>

                                                            )}

                                                        </div>

                                                    </div>


                                                    <div>

                                                        <div className="font-bold max-w-[220px] truncate">
                                                            {book.title}
                                                        </div>

                                                        <div className="text-xs text-base-content/50">
                                                            ID: #{book.id}
                                                        </div>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* AUTHOR */}
                                            <td>
                                                <span className="font-medium">
                                                    {book.author}
                                                </span>
                                            </td>


                                            {/* CATEGORY */}
                                            <td>
                                                <div className="badge badge-outline">
                                                    {book.category}
                                                </div>
                                            </td>


                                            {/* PRICE */}
                                            <td>
                                                <span className="font-semibold">
                                                    ৳ {book.price}
                                                </span>
                                            </td>


                                            {/* COPIES */}
                                            <td>
                                                <span className="font-bold">
                                                    {book.available_copies}
                                                </span>

                                                <span className="text-base-content/50">
                                                    {" "}
                                                    / {book.total_copies}
                                                </span>
                                            </td>


                                            {/* STATUS */}
                                            <td>

                                                {book.available_copies > 0 ? (

                                                    <div className="badge badge-success badge-outline">
                                                        Available
                                                    </div>

                                                ) : (

                                                    <div className="badge badge-error badge-outline">
                                                        Out of Stock
                                                    </div>

                                                )}

                                            </td>


                                            {/* ACTIONS */}
                                            <td>

                                                <div className="flex justify-center gap-2">

                                                    {/* UPDATE */}
                                                    <button
                                                        onClick={() =>
                                                            openUpdateModal(book)
                                                        }
                                                        className="btn btn-sm btn-info btn-outline"
                                                    >
                                                        ✏️ Update
                                                    </button>


                                                    {/* DELETE */}
                                                    <button
                                                        onClick={() =>
                                                            deleteHandel(book)
                                                        }
                                                        disabled={
                                                            deletingId === book.id
                                                        }
                                                        className="btn btn-sm btn-error btn-outline"
                                                    >

                                                        {deletingId === book.id ? (

                                                            <>
                                                                <span className="loading loading-spinner loading-xs"></span>
                                                                Deleting...
                                                            </>

                                                        ) : (

                                                            <>
                                                                🗑️ Delete
                                                            </>

                                                        )}

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>
            )}


            {/* ================================================= */}
            {/* CREATE / UPDATE MODAL */}
            {/* ================================================= */}

            {showModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                        {/* MODAL HEADER */}
                        <div className="flex justify-between items-center p-6 border-b border-base-300">

                            <div>

                                <h2 className="text-2xl font-bold">

                                    {modalType === "create"
                                        ? "Create New Book"
                                        : "Update Book"}

                                </h2>

                                <p className="text-sm text-base-content/60 mt-1">

                                    {modalType === "create"
                                        ? "Add a new book to your library"
                                        : `Update information for "${selectedBook?.title}"`}

                                </p>

                            </div>


                            {/* CLOSE */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn btn-sm btn-circle btn-ghost text-xl"
                            >
                                ✕
                            </button>

                        </div>


                        {/* FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-6"
                        >

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* TITLE */}
                                <div className="form-control md:col-span-2">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Book Title
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter book title"
                                        className="input input-bordered w-full"
                                        required
                                    />

                                </div>


                                {/* AUTHOR */}
                                <div className="form-control">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Author
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        placeholder="Enter author name"
                                        className="input input-bordered w-full"
                                        required
                                    />

                                </div>


                                {/* CATEGORY */}
                                <div className="form-control">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Category
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Programming"
                                        className="input input-bordered w-full"
                                        required
                                    />

                                </div>


                                {/* PRICE */}
                                <div className="form-control">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Price (৳)
                                        </span>
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="750"
                                        min="0"
                                        className="input input-bordered w-full"
                                        required
                                    />

                                </div>


                                {/* TOTAL COPIES */}
                                <div className="form-control">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Total Copies
                                        </span>
                                    </label>

                                    <input
                                        type="number"
                                        name="total_copies"
                                        value={formData.total_copies}
                                        onChange={handleChange}
                                        placeholder="10"
                                        min="1"
                                        className="input input-bordered w-full"
                                        required
                                    />

                                </div>


                                {/* AVAILABLE COPIES - UPDATE ONLY */}
                                {modalType === "update" && (

                                    <div className="form-control">

                                        <label className="label">
                                            <span className="label-text font-semibold">
                                                Available Copies
                                            </span>
                                        </label>

                                        <input
                                            type="number"
                                            name="available_copies"
                                            value={formData.available_copies}
                                            onChange={handleChange}
                                            min="0"
                                            className="input input-bordered w-full"
                                            required
                                        />

                                    </div>

                                )}


                                {/* DESCRIPTION */}
                                <div className="form-control md:col-span-2">

                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Description
                                        </span>
                                    </label>

                                    <textarea
                                        name="discription"
                                        value={formData.discription}
                                        onChange={handleChange}
                                        placeholder="Enter book description"
                                        className="textarea textarea-bordered w-full h-28"
                                        required
                                    />

                                </div>

                            </div>


                            {/* BUTTONS */}
                            <div className="flex justify-end gap-3 mt-6">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-ghost"
                                    disabled={saving}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >

                                    {saving ? (

                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Saving...
                                        </>

                                    ) : (

                                        modalType === "create"
                                            ? "Create Book"
                                            : "Update Book"

                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default ManageBooks;

