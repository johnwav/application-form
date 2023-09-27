import axios from "axios";
import { ApplicationFormState } from "../types/types";

// const API_BASE_URL = "http://127.0.0.1:4010"; // Replace with your API URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const updateData = async (
  data: ApplicationFormState,
  programId: string
): Promise<{
  data: ApplicationFormState;
}> => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Replace '/api/update' with your actual API endpoint
    const response = await api.put(
      `/api/${import.meta.env.VITE_API_VERSION}/programs/${programId}/application-form`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchData = async (
  version: number,
  programId: string
): Promise<{
  data: ApplicationFormState;
}> => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Replace '/api/data' with your actual API endpoint
    const response = await api.get(
      `/api/${version}/programs/${programId}/application-form`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
