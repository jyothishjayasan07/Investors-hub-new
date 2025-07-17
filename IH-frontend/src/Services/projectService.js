const API_URL = "http://localhost:3000";

export const fetchProjects = async (token) => {
  const res = await fetch(`${API_URL}/projectofuser`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch projects");
  return data;
};

export const createProject = async (formData, token) => {
  const res = await fetch(`${API_URL}/projectregistration`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ DO NOT set 'Content-Type' manually for FormData
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create project");
  return data;
};


export const updateProject1 = async (projectId, payload, token) => {
  const res = await fetch(`${API_URL}/project/${projectId}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload, // Must be FormData — don’t set Content-Type explicitly
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update project");
  return data;
};
