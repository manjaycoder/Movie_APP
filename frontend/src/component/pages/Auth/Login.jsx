import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../component/Loader";
import { setCredentials } from "../../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../../redux/api/users";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 transition duration-500">
      <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-sm animate-fadeIn">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Sign In</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-300">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border-b border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border-b border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-teal-500 text-white px-4 py-2 rounded transition hover:bg-teal-600"
          >
            {isLoading ? <Loader /> : "Sign In"}
          </button>
        </form>
        <div className="text-center text-gray-300 mt-4">
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="text-teal-500 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
