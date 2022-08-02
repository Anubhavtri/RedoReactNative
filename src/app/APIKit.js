import axios from 'axios';

export default axios.create({
   baseURL: 'https://apidev.redcliffelabs.com/api/v1', // old url
timeout: 500000,
});

