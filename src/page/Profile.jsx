import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { baseurl } from "../services/BaseURL";

const profileFields = [
  ["fastname", "First Name", "text"],
  ["lastname", "Last Name", "text"],
  ["username", "Username", "text"],
  ["email", "Email", "email"],
];

const toFormData = (profile) => {
  const safeProfile = profile || {};
  return {
    email: safeProfile.email || "",
    username: safeProfile.username || "",
    fastname: safeProfile.fastname || "",
    lastname: safeProfile.lastname || "",
    role: safeProfile.role || "",
  };
};

const readError = async (response, fallback) => {
  try {
    const data = await response.json();
    return data.detail || data.message || fallback;
  } catch {
    return fallback;
  }
};

const Profile = () => {
  const { author, setAuthor, accessToken } = useContext(AuthContext);
  const [user, setUser] = useState(author);
  const [formData, setFormData] = useState(() => toFormData(author));
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(!author);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!accessToken) return undefined;

    let cancelled = false;
    const loadUser = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${baseurl}/user`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!response.ok) throw new Error(await readError(response, "Failed to load your profile."));

        const data = await response.json();
        if (!cancelled) {
          setUser(data);
          setAuthor(data);
          setFormData(toFormData(data));
        }
      } catch (requestError) {
        if (!cancelled) setError(requestError.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadUser();
    return () => { cancelled = true; };
  }, [accessToken, setAuthor]);

  const cancelEdit = () => {
    setFormData(toFormData(user));
    setEditing(false);
    setError("");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!user?.id) return setError("Your profile is unavailable. Please refresh and try again.");

    setUpdating(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`${baseurl}/edituser`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(await readError(response, "Failed to update your profile."));

      const updatedUser = await response.json();
      const nextUser = { ...user, ...updatedUser };
      setUser(nextUser);
      setAuthor(nextUser);
      setFormData(toFormData(nextUser));
      setEditing(false);
      setSuccess("Profile updated successfully.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-base-200 flex items-center justify-center"><span className="loading loading-spinner loading-lg" /></div>;
  if (!user) return <div className="min-h-screen bg-base-200 flex items-center justify-center p-4"><div className="alert alert-error max-w-md"><span>{error || "Unable to load your profile."}</span></div></div>;

  const initials = (`${user.fastname?.[0] || ""}${user.lastname?.[0] || ""}` || user.username?.[0] || "U").toUpperCase();
  const details = [["First Name", user.fastname], ["Last Name", user.lastname], ["Username", `@${user.username}`], ["Email", user.email], ["Role", user.role || "User"], ["User ID", user.id ? `#${user.id}` : "—"]];

  return (
    <main className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {success && <div className="alert alert-success mb-5"><span>{success}</span></div>}
        {error && <div className="alert alert-error mb-5"><span>{error}</span></div>}
        <section className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-primary to-secondary" />
          <div className="px-6 pb-6">
            <div className="-mt-16 mb-5 flex items-end justify-between gap-4">
              <div className="avatar placeholder"><div className="w-32 rounded-full bg-primary text-primary-content ring ring-base-100 ring-offset-4"><span className="text-4xl font-bold flex justify-center">{initials}</span></div></div>
              <button type="button" onClick={() => (editing ? cancelEdit() : (setEditing(true), setSuccess("")))} className="btn btn-primary">{editing ? "Cancel" : "Edit Profile"}</button>
            </div>
            <h1 className="text-3xl font-bold">{user.fastname} {user.lastname}</h1>
            <p className="text-base-content/60 mt-1">@{user.username}</p>
            <div className="flex gap-3 mt-4"><span className="badge badge-primary badge-lg capitalize">{user.role || "User"}</span><span className={`badge badge-lg ${user.is_active ? "badge-success" : "badge-error"}`}>{user.is_active ? "Active" : "Inactive"}</span></div>
          </div>
        </section>
        <section className="card bg-base-100 shadow-xl mt-6"><div className="card-body"><h2 className="card-title text-2xl mb-5">Profile Information</h2>
          {editing ? <form onSubmit={handleUpdate} className="space-y-5"><div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {profileFields.map(([name, label, type]) => <label className="form-control" key={name}><span className="label-text label">{label}</span><input type={type} name={name} value={formData[name]} onChange={({ target }) => setFormData((current) => ({ ...current, [target.name]: target.value }))} className="input input-bordered w-full" required /></label>)}
          </div><div className="flex justify-end gap-3 pt-4"><button type="button" onClick={cancelEdit} className="btn btn-ghost" disabled={updating}>Cancel</button><button type="submit" className="btn btn-primary" disabled={updating}>{updating && <span className="loading loading-spinner loading-sm" />}{updating ? "Updating..." : "Save Changes"}</button></div></form> :
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{details.map(([label, value]) => <div className="bg-base-200 rounded-xl p-4" key={label}><p className="text-sm text-base-content/60">{label}</p><p className="font-semibold text-lg break-all capitalize">{value || "—"}</p></div>)}</div>}
        </div></section>
      </div>
    </main>
  );
};

export default Profile;
