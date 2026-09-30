import { useContext } from "react";
import { baseurl } from "../services/BaseURL";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const ReservationCard = ({reserve}) => {

    const {accessToken} = useContext(AuthContext);

    const handleCancel= async(id) =>{
        const res = await fetch(`${baseurl}/reserve/cencel/${id}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const resData = await res.json();
        toast.success(resData.Message)
    }
    return (
        <div>
            <div className="min-h-screen bg-base-200 p-4 md:p-8">

                {/* Page Title */}
                <div className="max-w-6xl mx-auto mb-6">
                    <h1 className="text-3xl font-bold">
                        My Reservations
                    </h1>

                    <p className="text-base-content/60 mt-1">
                        Manage your reserved books
                    </p>
                </div>

                {/* Reservation List */}
                <div className="max-w-6xl mx-auto space-y-5">

                    {reserve.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">
                                📚
                            </div>

                            <h2 className="text-2xl font-bold">
                                No Reservations
                            </h2>

                            <p className="text-base-content/60 mt-2">
                                You haven't reserved any books yet.
                            </p>
                        </div>
                    ) : (

                        reserve.map((reservation) => (

                            <div
                                key={reservation.id}
                                className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-4 md:p-5"
                            >

                                <div className="flex flex-col md:flex-row gap-5">

                                    {/* ================= BOOK IMAGE ================= */}
                                    <div className="relative w-full md:w-64 h-48 md:h-40 shrink-0">

                                        <div
                                            className="
                                            w-full
                                            h-full
                                            rounded-xl
                                            bg-linear-to-br
                                            from-primary
                                            to-secondary
                                            flex
                                            items-center
                                            justify-center
                                            overflow-hidden
                                        "
                                        >
                                            <div className="text-center text-white">
                                                <div className="text-6xl">
                                                    📖
                                                </div>

                                                <p className="font-bold mt-2">
                                                    BOOK #{reservation.book_id}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Reservation ID */}
                                        <div className="absolute bottom-2 left-2">
                                            <span className="badge badge-neutral">
                                                Reservation #{reservation.id}
                                            </span>
                                        </div>

                                    </div>


                                    {/* ================= BOOK INFORMATION ================= */}
                                    <div className="flex-1 flex flex-col justify-between">

                                        <div>

                                            <div className="flex flex-wrap items-start justify-between gap-3">

                                                <div>
                                                    <h2 className="text-2xl font-bold">
                                                        Reserved Book #{reservation.book_id}
                                                    </h2>

                                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-base-content/60">

                                                        <span>
                                                            📚 Book ID:{" "}
                                                            <strong className="text-base-content">
                                                                #{reservation.book_id}
                                                            </strong>
                                                        </span>

                                                        <span>
                                                            👤 User ID:{" "}
                                                            <strong className="text-base-content">
                                                                #{reservation.user_id}
                                                            </strong>
                                                        </span>

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="divider my-3"></div>

                                            {/* Date */}
                                            <div className="flex items-center gap-3">

                                                <div className="text-xl">
                                                    📅
                                                </div>

                                                <div>
                                                    <p className="text-sm text-base-content/50">
                                                        Reservation Date
                                                    </p>

                                                    <p className="font-semibold">
                                                        {new Date(
                                                            reservation.reservation_date
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>


                                        {/* ================= BOTTOM INFO ================= */}
                                        <div className="flex flex-wrap items-center justify-between gap-4 mt-5">

                                            <div>
                                                <p className="text-sm text-base-content/50">
                                                    Reserved At
                                                </p>

                                                <p className="font-medium">
                                                    {new Date(
                                                        reservation.reservation_date
                                                    ).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </p>
                                            </div>


                                            {/* Status */}
                                            <div className="flex items-center gap-3">

                                                <span
                                                    className={`
                                                    badge badge-lg
                                                    ${reservation.status ===
                                                            "pending"
                                                            ? "badge-warning"
                                                            : reservation.status ===
                                                                "approved"
                                                                ? "badge-success"
                                                                : "badge-error"
                                                        }
                                                `}
                                                >
                                                    {reservation.status}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ================= RIGHT SIDE ================= */}
                                    <div
                                        className="
                                        md:w-48
                                        border-t
                                        md:border-t-0
                                        md:border-l
                                        border-base-300
                                        pt-4
                                        md:pt-0
                                        md:pl-5
                                        flex
                                        flex-col
                                        justify-center
                                        gap-4
                                    "
                                    >

                                        {/* Status Box */}
                                        <div className="bg-base-200 rounded-xl p-4">

                                            <p className="text-xs text-base-content/50">
                                                Reservation Status
                                            </p>

                                            <p
                                                className={`
                                                text-lg
                                                font-bold
                                                capitalize
                                                ${reservation.status ===
                                                        "pending"
                                                        ? "text-warning"
                                                        : reservation.status ===
                                                            "approved"
                                                            ? "text-success"
                                                            : "text-error"
                                                    }
                                            `}
                                            >
                                                {reservation.status}
                                            </p>

                                        </div>


                                        {/* Cancel Button */}
                                        {reservation.status === "pending" && (
                                            <button
                                                onClick={() =>
                                                    handleCancel(
                                                        reservation.id
                                                    )
                                                }
                                                className="btn btn-error btn-outline w-full"
                                            >
                                                Cancel Reservation
                                            </button>
                                        )}

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>
            </div>
        </div>
    );
};

export default ReservationCard;