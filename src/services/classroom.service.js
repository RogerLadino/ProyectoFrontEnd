import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getClassroomById(classroomId) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/api/classroom/${classroomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching classroom:", error);
    throw error;
  }
}
