import axios from 'axios';
const httpClient = axios.create({ timeout: 2 * 60 * 1000 });
httpClient.defaults.timeout = 10000;

let axiosConfig = {
  headers: {
    "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
    "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // this states the allowed methods
    "Content-Type": "application/json" // this shows the expected content type
  }
};


export const fetchApi = async (url, data) => {
  const reqData= data

  try {

    const response = await axios.post(url, data)
    if (response.status == '200' || response.status == '201') {
      return response;
    }

  } catch (error) {
    if(error.response==undefined){
      const error={
        data:{
        message:'Server Down'
        }
      }
      return {
        error: error
      };
    }else{
      return {
        error: error.response
      };
    }
  }
};

export const fetchGetApi = async (url, data) => {
    try {
      const response = await httpClient.get(url, data)
      if (response.status == '200') {
        return response.data;
      }
    } catch (error) {
      if (error.response.status != '200') {
        return {
          error: error.response
        };
      }
    }
  };
