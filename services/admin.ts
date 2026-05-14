const API_URL = "http://127.0.0.1:8000";


function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}


export async function getAdminUsers() {
  const response = await fetch(
    `${API_URL}/admin/users`,
    {
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to load users"
    );
  }

  return data;
}


export async function activateUserPro(
  userId: number
) {
  const response = await fetch(
    `${API_URL}/admin/users/${userId}/activate-pro`,
    {
      method: "POST",
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to activate user"
    );
  }

  return data;
}


export async function deactivateUserSubscription(
  userId: number
) {
  const response = await fetch(
    `${API_URL}/admin/users/${userId}/deactivate`,
    {
      method: "POST",
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to deactivate user"
    );
  }

  return data;
}