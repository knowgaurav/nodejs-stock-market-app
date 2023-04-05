// axios configuration

const axios = require('axios');

const axiosInstance = {
    baseURL: '',
    params: {
        api_key: process.env.API_KEY,
        language: 'en-US',
    },
    credentials: true
};

module.exports = { __http: axiosInstance }

