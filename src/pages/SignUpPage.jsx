import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, User, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/skeletons/AuthImagePattern";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    // The main container is now a flex-grow item to fill available space
    <div className="max-h-screen flex-grow bg-gradient-to-br from-base-300 via-base-200 to-base-100 flex  p-7 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-success/20 to-accent/20 rounded-3xl rotate-45 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-info/20 to-primary/20 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="absolute top-1/2 right-10 w-16 h-40 bg-gradient-to-b from-accent/10 to-info/10 rounded-full transform -rotate-12"></div>
      </div>

      {/* Left side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 overflow-y-auto">
        <div className="w-full max-w-sm py-8">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex justify-center mb-3">
              <div className="avatar placeholder relative">
                <div className=" grid place-items-center content-center bg-gradient-to-br from-success via-accent to-info rounded-2xl w-16 shadow-lg shadow-success/25 relative">
                  <div className="absolute inset-0 bg-base-100/10 rounded-2xl backdrop-blur-sm"></div>
                  <MessageSquare className="w-10 h-10 text-base-100 relative z-10" />
                </div>
              </div>
            </div>
            <h1 className="text-xl font-bold mt-2 text-base-content">
              Create Account
            </h1>
            <p className="text-base-content/60 text-sm">
              Get started with your free account
            </p>
          </div>

          {/* Form Container */}
          <div className="card bg-base-100/5 backdrop-blur-2xl border border-base-content/20 shadow-2xl shadow-black/20 hover:shadow-success/10 transition-all duration-500 relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-success/5 via-transparent to-info/5 pointer-events-none"></div>
            <div className="card-body p-6 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/80">
                      Full Name
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-base-content opacity-100 z-10" />
                    </div>
                    <input
                      type="text"
                      className="input w-full pl-12 pr-4 bg-base-200/40 border border-base-content/20 text-base-content placeholder-base-content/40 focus:border-success hover:bg-base-200/60 hover:border-base-content/30 transition-all duration-200"
                      placeholder="Bhupendra Jogi..."
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/80">
                      Email
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-base-content opacity-100 z-10" />
                    </div>
                    <input
                      type="email"
                      className="input w-full pl-12 pr-4 bg-base-200/40 border border-base-content/20 text-base-content placeholder-base-content/40 focus:border-success hover:bg-base-200/60 hover:border-base-content/30 transition-all duration-200"
                      placeholder="jogi@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/80">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-base-content opacity-100 z-10" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input w-full pl-12 pr-12 bg-base-200/40 border border-base-content/20 text-base-content placeholder-base-content/40 focus:border-success hover:bg-base-200/60 hover:border-base-content/30 transition-all duration-200"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm absolute inset-y-2 right-0 pr-4 rounded-r-lg hover:bg-base-content/10 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-base-content/40 hover:text-base-content/70" />
                      ) : (
                        <Eye className="w-5 h-5 text-base-content/40 hover:text-base-content/70" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="btn w-full bg-gradient-to-r from-success via-accent to-info hover:from-success hover:via-accent hover:to-info disabled:bg-base-300 disabled:text-base-content/40 text-base-100 font-semibold border-none shadow-lg shadow-success/25 hover:shadow-success/40 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-base-100/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {isSigningUp ? (
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      <span className="loading loading-spinner loading-sm"></span>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <span className="relative z-10">Create Account</span>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-4 text-center">
                <p className="text-base-content/60 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="link link-success font-medium hover:link-hover transition-colors duration-200"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>

      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-base-content/60">
        Made with ❤️ by Naitik
      </span>
    </div>
  );
};

export default SignUpPage;
