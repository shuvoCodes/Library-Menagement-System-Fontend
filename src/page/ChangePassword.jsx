import { useState } from "react";
import { baseurl } from "../services/BaseURL";
import toast from "react-hot-toast";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
    });
    // console.log(formData);
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const accessToken = localStorage.getItem("lm-token");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        // Check new password and confirm password
        if (formData.new_password !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${baseurl}/passwordchange`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                toast.error(data.detail);
                return;
            }

            toast.success(data.message);

            // Clear form
            setFormData({
                current_password: "",
                new_password: "",
            });

            setConfirmPassword("");

        } catch (err) {
            setError("Something went wrong. Please try again.",err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body">

                        {/* Header */}
                        <div className="text-center mb-5">
                            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-11V7a4 4 0 00-8 0v1"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold">
                                Change Password
                            </h2>

                            <p className="text-sm text-base-content/60 mt-1">
                                Update your account password
                            </p>
                        </div>

                        {/* Success */}
                        {message && (
                            <div className="alert alert-success mb-4">
                                <span>{message}</span>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="alert alert-error mb-4">
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Current Password */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Current Password
                                    </span>
                                </label>

                                <div className="relative">
                                    <input
                                        type={
                                            showCurrent
                                                ? "text"
                                                : "password"
                                        }
                                        name="current_password"
                                        value={formData.current_password}
                                        onChange={handleChange}
                                        placeholder="Enter current password"
                                        className="input input-bordered w-full pr-12"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCurrent(!showCurrent)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary"
                                    >
                                        {showCurrent ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        New Password
                                    </span>
                                </label>

                                <div className="relative">
                                    <input
                                        type={
                                            showNew
                                                ? "text"
                                                : "password"
                                        }
                                        name="new_password"
                                        value={formData.new_password}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                        className="input input-bordered w-full pr-12"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNew(!showNew)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary"
                                    >
                                        {showNew ? "🙈" : "👁️"}
                                    </button>
                                </div>

                                <p className="text-xs text-base-content/50 mt-1">
                                    Password must be at least 6 characters.
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Confirm New Password
                                    </span>
                                </label>

                                <div className="relative">
                                    <input
                                        type={
                                            showConfirm
                                                ? "text"
                                                : "password"
                                        }
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Confirm new password"
                                        className="input input-bordered w-full pr-12"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirm(!showConfirm)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary"
                                    >
                                        {showConfirm ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full mt-3"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Changing Password...
                                    </>
                                ) : (
                                    "Change Password"
                                )}
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChangePassword;
