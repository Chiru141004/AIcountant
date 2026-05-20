const API_BASE = import.meta.env.VITE_API_BASE || '/api';

function getToken() {
  return localStorage.getItem('accessToken');
}

function getHeaders(isJson = true) {
  const headers = {};
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

function parseErrorResponse(response) {
  return response.text().then((text) => {
    try {
      const json = JSON.parse(text || '{}');
      if (json.detail) {
        return typeof json.detail === 'string' ? json.detail : JSON.stringify(json.detail);
      }
    } catch {
      // ignore invalid JSON
    }
    return text || `Request failed: ${response.status}`;
  });
}

async function handleErrorResponse(response) {
  if (response.status === 401) {
    clearSession();
    window.location.href = '/login';
    throw new Error('Unauthorized. Please sign in again.');
  }
  const message = await parseErrorResponse(response);
  throw new Error(message);
}

export async function getJson(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: getHeaders(true),
  });
  if (!response.ok) {
    await handleErrorResponse(response);
  }
  return response.json();
}

export async function postJson(path, payload) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    await handleErrorResponse(response);
  }
  return response.json();
}

export function saveSession(user, token) {
  localStorage.setItem('userData', JSON.stringify(user));
  localStorage.setItem('accessToken', token);
}

export function clearSession() {
  localStorage.removeItem('userData');
  localStorage.removeItem('accessToken');
}

export function getStoredUser() {
  const raw = localStorage.getItem('userData');
  return raw ? JSON.parse(raw) : null;
}

export function getStoredToken() {
  return getToken();
}
