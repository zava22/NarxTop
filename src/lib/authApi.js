
const API_BASE_URL = "http://localhost:5000/api/auth";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(
      data?.message || "Something went wrong."
    );
  }

  return data;
}

export async function registerUser({
  name,
  secondName,
  phone,
  email,
  password,
}) {
  return request("/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      secondName,
      phone,
      email,
      password,
    }),
  });
}

export async function loginUser({
  email,
  password,
}) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}
