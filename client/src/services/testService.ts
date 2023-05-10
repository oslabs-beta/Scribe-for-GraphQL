import axios from 'axios';
import { API_URL } from '../utils/constants';

export const generateTypeTest = async (userInput: string) => {
  console.log('make post request to /typeTest');
  console.log('API', API_URL);
  console.log(API_URL + 'typeTest');
  const { data } = await axios.post(
    API_URL + 'typeTest',
    { schema: userInput },
    { withCredentials: true }
  );
  return data;
};

export const generateUnitTest = async (userInput: string) => {
  const { data } = await axios.post(
    API_URL + 'resolverTest',
    { resolvers: userInput },
    { withCredentials: true }
  );
  return data;
};

export const fetchTests = async () => {
  const { data } = await axios.get(API_URL + 'users/tests', {
    withCredentials: true,
  });
  return data;
};

export const saveTests = async (testData: any) => {
  const { data } = await axios.post(
    API_URL + 'users/tests',
    {
      test: testData.test,
      testType: testData.testType,
    },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const removeTest = async (id: string) => {
  const { data } = await axios.delete(API_URL + `users/tests/${id}`, {
    withCredentials: true,
  });
  return data;
};
