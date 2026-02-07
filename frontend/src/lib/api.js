const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper with error handling
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Products API
export const productsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/products${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => fetchAPI(`/products/${id}`),
  
  create: (data) => fetchAPI('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => fetchAPI(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id) => fetchAPI(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// Seasons API
export const seasonsAPI = {
  getAll: () => fetchAPI('/seasons'),
  
  getById: (id) => fetchAPI(`/seasons/${id}`),
  
  create: (data) => fetchAPI('/seasons', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => fetchAPI(`/seasons/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Techniques API
export const techniquesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/techniques${queryString ? `?${queryString}` : ''}`);
  },
  
  getBySlug: (slug) => fetchAPI(`/techniques/${slug}`),
  
  create: (data) => fetchAPI('/techniques', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (slug, data) => fetchAPI(`/techniques/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Inquiries API
export const inquiriesAPI = {
  create: (data) => fetchAPI('/inquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/inquiries${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => fetchAPI(`/inquiries/${id}`),
  
  updateStatus: (id, status, notes) => fetchAPI(`/inquiries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, notes }),
  }),
};

export default {
  products: productsAPI,
  seasons: seasonsAPI,
  techniques: techniquesAPI,
  inquiries: inquiriesAPI,
};
