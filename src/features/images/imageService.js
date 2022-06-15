import axios from 'axios';

const API_URL = 'https://api.unsplash.com/';
const ACCESS_KEY = '87_5zyJ9_wl0UUBdzGTaPZHjdJCN6TY0GnIKQy31gbo';

// Get images
const getImages = async () => {
  const config = {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  };

  const response = await axios.get(`${API_URL}photos?per_page=20`, config);
  return response.data;
};

// Get images
const search = async ({ text }) => {
  const config = {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  };

  const response = await axios.get(
    `${API_URL}search/photos?query=${text}&per_page=20`,
    config
  );
  return response.data;
};

// Set current image
const setCurrent = async (id) => id;

const imageService = {
  getImages,
  search,
  setCurrent,
};

export default imageService;
