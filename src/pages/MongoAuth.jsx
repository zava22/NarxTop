import { useState } from "react";

import { useMongoAuth } from "../context/MongoAuthContext";

import "./Auth.css";

export default function MongoAuth() {
  const {
    signUp,
    signIn,
    loading: authLoading,
    isAuthenticated,
    user,
  } = useMongoAuth();

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
        await signUp({
          name: formData.name,
          secondName: formData.secondName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        });

        setSuccess("Account created successfully.");
      }
    } catch (error) {
      setError(
        error?.message || "Something went wrong."
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
                You are signed in
              </h1>

              <p className="auth-subtitle">
                Welcome back, {user?.name || user?.email}.
              </p>
            </div>

            <div className="auth-success">
              Your NarxTop account is active.
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

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {success && (
            <div className="auth-success">
              {success}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <>
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
              </>
            )}

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

            <div className="auth-field">
              <label
                className="auth-label"
                htmlFor="password"
              >
                Password
              </label>

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

          <div className="auth-divider">
            <span>MongoDB account</span>
          </div>

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
