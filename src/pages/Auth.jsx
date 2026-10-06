import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Auth() {
  const {
    signUp,
    signIn,
    signInWithGoogle,
    sendPasswordRecovery,
    loading: authLoading,
    isAuthenticated,
  } = useAuth();

  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    secondName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLogin = mode === "login";
  const isLoading = loading || authLoading;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        await signIn({
          email: formData.email,
          password: formData.password,
        });

        setSuccess("You have successfully signed in.");
      } else {
        const data = await signUp({
          name: formData.name,
          secondName: formData.secondName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        });

        if (data?.session) {
          setSuccess("Account created successfully.");
        } else {
          setSuccess(
            "Account created. Please check your email to confirm your account."
          );
        }
      }
    } catch (error) {
      setError(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error?.message || "Google sign-in failed.");
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");

    if (!formData.email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordRecovery(formData.email);

      setSuccess(
        "Password reset instructions have been sent to your email."
      );
    } catch (error) {
      setError(
        error?.message || "Unable to send password reset instructions."
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(isLogin ? "signup" : "login");

    setError("");
    setSuccess("");

    setFormData((previous) => ({
      ...previous,
      password: "",
    }));
  };

  if (isAuthenticated) {
    return (
      <main className="auth-page">
        <div className="auth-container">
          <section className="auth-card">
            <div className="auth-header">
              <div className="auth-logo">N</div>

              <h1 className="auth-title">
                You are already signed in
              </h1>

              <p className="auth-subtitle">
                Your NarxTop account is active.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <section className="auth-card">

          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">N</div>

            <h1 className="auth-title">
              {isLogin
                ? "Welcome back"
                : "Create your account"}
            </h1>

            <p className="auth-subtitle">
              {isLogin
                ? "Sign in to continue to NarxTop"
                : "Create an account and start saving more"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="auth-success">
              {success}
            </div>
          )}

          {/* Form */}
          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            {/* First name */}
            {!isLogin && (
              <div className="auth-field">
                <label
                  className="auth-label"
                  htmlFor="name"
                >
                  First name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  className="auth-input"
                  placeholder="Enter your first name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                />
              </div>
            )}

            {/* Second name */}
            {!isLogin && (
              <div className="auth-field">
                <label
                  className="auth-label"
                  htmlFor="secondName"
                >
                  Last name
                </label>

                <input
                  id="secondName"
                  name="secondName"
                  type="text"
                  className="auth-input"
                  placeholder="Enter your last name"
                  value={formData.secondName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                />
              </div>
            )}

            {/* Phone */}
            {!isLogin && (
              <div className="auth-field">
                <label
                  className="auth-label"
                  htmlFor="phone"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="auth-input"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="auth-field">
              <label
                className="auth-label"
                htmlFor="email"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="auth-field">
              <div className="auth-password-row">
                <label
                  className="auth-label"
                  htmlFor="password"
                >
                  Password
                </label>

                {isLogin && (
                  <button
                    type="button"
                    className="auth-link"
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <input
                id="password"
                name="password"
                type="password"
                className="auth-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete={
                  isLogin
                    ? "current-password"
                    : "new-password"
                }
                minLength={6}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="auth-submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Please wait..."
                : isLogin
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Google */}
          <button
            type="button"
            className="auth-google"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg
              className="google-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.71-.06-1.39-.18-2.04H12v3.86h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.19Z"
              />

              <path
                fill="#34A853"
                d="M12 21.73c2.63 0 4.84-.87 6.45-2.37l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.73 9.73 0 0 0 12 21.73Z"
              />

              <path
                fill="#FBBC05"
                d="M6.54 13.81A5.85 5.85 0 0 1 6.23 12c0-.63.11-1.25.31-1.81V7.67H3.3A9.73 9.73 0 0 0 2.27 12c0 1.57.38 3.06 1.03 4.33l3.24-2.52Z"
              />

              <path
                fill="#EA4335"
                d="M12 6.16c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.26 14.63 2.27 12 2.27A9.73 9.73 0 0 0 3.3 7.67l3.24 2.52C6.85 7.88 9.01 6.16 12 6.16Z"
              />
            </svg>

            Continue with Google
          </button>

          {/* Login / Signup switch */}
          <div className="auth-switch">
            {isLogin ? (
              <>
                Don't have an account?

                <button
                  type="button"
                  onClick={switchMode}
                  disabled={isLoading}
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?

                <button
                  type="button"
                  onClick={switchMode}
                  disabled={isLoading}
                >
                  Sign in
                </button>
              </>
            )}
          </div>

        </section>
      </div>
    </main>
  );
}
