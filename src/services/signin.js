import axios from 'axios';

const baseUrl = '/api/signin';

const signin = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { signin };
