import React, { useContext, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from '../api';
import { AuthContext } from '../context/AuthProvider';

function Login() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useContext(AuthContext);

  const modal = document.getElementById('my_modal_3');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === "googleLoginSuccess") {
        modal?.close();
        navigate('/');
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      modal?.close();
    };
  }, [navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleUserLogin = async (url, credentials, userType) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const responseData = await res.json();

      if (!res.ok) throw new Error(responseData.message || `${userType} login failed`);

      toast.success(`${userType} Logged in Successfully`);

      const userData = userType === 'Admin' ? responseData.admin : responseData.user;

      setAuthUser(userData);

      // ✅ Store under different keys
      if (userType === 'Admin') {
        localStorage.setItem("Admin", JSON.stringify(userData));
      } else {
        localStorage.setItem("User", JSON.stringify(userData));
      }

      modal?.close();
      navigate('/');
    } catch (error) {
      console.error(`${userType} login error:`, error);
      toast.error("Error: " + error.message);
    }
  };

  const onSubmit = (data) => {
    handleUserLogin("http://localhost:4000/user/login", data, "User");
  };

  const onAdminSubmit = (data) => {
    handleUserLogin("http://localhost:4000/user/admin/login", data, "Admin");
  };

  const responseGoogle = useCallback(async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        const { fullname } = result.user;

        setAuthUser(result.user);
        localStorage.setItem("User", JSON.stringify(result.user)); // Google login = normal user

        toast.success(`Welcome, ${fullname}!`);

        if (window.opener) {
          window.opener.postMessage("googleLoginSuccess", "*");
          window.close();
        } else {
          modal?.close();
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Google auth failed:", error);
      toast.error("Google authentication failed!");
    }
  }, [navigate, setAuthUser]);

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
    ux_mode: 'popup'
  });

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              onClick={() => modal?.close()}
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
              <button type="button" className="btn btn-primary w-80" onClick={handleSubmit(onAdminSubmit)}>Admin Login</button>
              <p>Not Registered? <Link to="/signup" className="underline text-blue-500 cursor-pointer">Signup</Link></p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
