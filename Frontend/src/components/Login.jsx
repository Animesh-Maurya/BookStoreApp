import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from '../api';
import { AuthContext } from '../context/AuthProvider';

function Login() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useContext(AuthContext);

  useEffect(() => {
    // Auto-close modal when navigating away
    return () => {
      document.getElementById('my_modal_3')?.close();
    };
  }, []);

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        // Call our backend's Google login route using our fetch API helper
        const result = await googleAuth(authResult.code);
        // Update context with logged-in user
        setAuthUser(result.user);
        const { fullname } = result.user;
        toast.success(`Welcome, ${fullname}!`);
        localStorage.setItem("Users", JSON.stringify(result.user));

        if (window.opener) {
          window.opener.postMessage("googleLoginSuccess", "*");
          window.close();
        } else {
          document.getElementById('my_modal_3').close();
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Google authentication failed!");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
    ux_mode: 'popup'
  });

  window.addEventListener("message", (event) => {
    if (event.data === "googleLoginSuccess") {
      document.getElementById('my_modal_3').close();
      navigate('/');
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",  // Ensures cookies are sent/received
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || "Login failed");
      }

      toast.success("Logged in Successfully");
      // Update AuthContext
      setAuthUser(responseData.user);
      localStorage.setItem("Users", JSON.stringify(responseData.user));

      document.getElementById('my_modal_3').close();
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              onClick={() => document.getElementById('my_modal_3').close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Login</h3>

            <div className="mt-4 space-y-2">
              <span>Email</span><br />
              <input type="email" placeholder="Enter your Email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })} />
              {errors.email && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            <div className="mt-4 space-y-2">
              <span>Password</span><br />
              <input type="password" placeholder="Enter your Password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })} />
              {errors.password && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            <div className="flex flex-col items-center gap-3 mt-4">
              <button className="btn btn-secondary w-80">Login</button>
              <button type="button" onClick={googleLogin} className="btn btn-outline w-80">
                <img src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google" className="w-5 h-5 inline-block mr-2" />
                Login with Google
              </button>
              <p>Not Registered? <Link to="/signup" className="underline text-blue-500 cursor-pointer">Signup</Link></p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
