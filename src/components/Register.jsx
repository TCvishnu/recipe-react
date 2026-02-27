import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setShouldShake(false);

    const sendData = {
      email: email + "@gmail.com",
      password,
    };

    try {
      const response = await fetch(`${backendURL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      if (!response.ok) throw new Error();

      navigate("/login");
    } catch (error) {
      setShouldShake(true);
      setError(true);
      setTimeout(() => setShouldShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfaf7] flex items-center justify-center p-6 relative overflow-hidden text-slate-900">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>

      {/* Hero Blurs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

      <div
        className={`w-full max-w-md z-10 transition-transform duration-500 ${shouldShake ? "animate-shake" : ""}`}
      >
        {/* Brand */}
        <Link to="/" className="flex items-center justify-center mb-10 group">
          <div className="bg-slate-900 text-white p-2 rounded-lg mr-2 text-sm group-hover:bg-emerald-800 transition-colors">
            R
          </div>
          <span className="text-2xl font-bold tracking-tight">Recipyaa</span>
        </Link>

        <div className="bg-white border border-slate-200 shadow-2xl shadow-slate-200/40 rounded-[2.5rem] p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif font-medium mb-2">
              Create Account
            </h1>
            <p className="text-slate-500 text-sm italic">
              "Every great chef starts somewhere."
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                Choose Handle
              </label>
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(false);
                  }}
                  placeholder="username"
                  className={`w-full bg-slate-50 border rounded-2xl px-5 py-4 outline-none transition-all pr-28 
                    ${error ? "border-amber-300 bg-amber-50/30" : "border-slate-100 focus:border-slate-900"}`}
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium pointer-events-none">
                  @gmail.com
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                Set Secure Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border rounded-2xl px-5 py-4 outline-none transition-all 
                    ${error ? "border-amber-300 bg-amber-50/30" : "border-slate-100 focus:border-slate-900"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 w-full ${error ? "max-h-10 mt-3" : "max-h-0"}`}
              >
                <p className="text-amber-700 text-xs font-medium text-center w-full">
                  That handle is already simmering in our kitchen.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Preparing Table..." : "Join Recipyaa"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <Link
              to="/login"
              className="text-slate-400 text-sm hover:text-slate-900 transition-colors"
            >
              Already have an account?{" "}
              <span className="font-bold text-slate-900 underline underline-offset-4">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
