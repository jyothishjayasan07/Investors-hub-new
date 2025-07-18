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


export const deleteProject = async (projectId, token) => {
  const res = await fetch(`${API_URL}/project/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete project");
  return data;
};

export const getAllProjects = async (token) => {
  const res = await fetch(`${API_URL}/getAllProject/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch projects");
  return data;
};

export const getAllusersList = async (token) => {
  const res = await fetch(`${API_URL}/getAllUsers/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch users");
  return data;
};

export const handleApprove = async (id,token) => {
  try {
    const res = await fetch(`${API_URL}/projects/approve/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      alert("Project approved!");
      // Optional: Refresh project list or remove from UI
    } else {
      alert(data.message || "Failed to approve project");
    }
  } catch (error) {
    alert("Something went wrong");
  }
};

export const getApprovedProjects = async (token) => {
  const res = await fetch(`${API_URL}/approved-projects`,{
         method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch approved projects");
  return data;
};



