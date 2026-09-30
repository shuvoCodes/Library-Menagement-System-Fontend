import { useState } from "react";
import { baseurl } from "../services/BaseURL";


const Registration = () => {
   const [formData, setFormData] = useState({
    email: '',
    username: '',
    fastname: '', // matching API key name
    lastname: '',
    password: '',
    role: 'user',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(`${baseurl}/creatuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          email: '',
          username: '',
          fastname: '',
          lastname: '',
          password: '',
          role: 'user',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-emerald-50/40 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-emerald-100 p-8">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide rounded-full uppercase mb-2">
            POST /creatuser
          </span>
          <h2 className="text-2xl font-bold text-gray-800">Create User</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the fields below to register a new account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
              className="w-full px-3 py-2 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              required
              className="w-full text-black px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="fastname"
                value={formData.fastname}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full text-black px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="w-full text-black px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full text-black px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full text-black px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            >
              <option value="user">User</option>
              <option value="librarian">Librarian</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 transition disabled:opacity-50"
          >
            {status === 'submitting' ? 'Creating User...' : 'Create User'}
          </button>

          {/* Status Feedback */}
          {status === 'success' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs text-center font-medium">
              User created successfully!
            </div>
          )}
          {status === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs text-center font-medium">
              Failed to create user. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Registration;