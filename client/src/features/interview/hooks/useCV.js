import { useState, useEffect } from "react";
import { fetchCV } from "../api/interviewApi";

export const useCV = () => {
  const [cv, setCv] = useState(null);

  useEffect(() => {
    const getCv = async () => {
      try {
        const startParams = JSON.parse(sessionStorage.getItem("startParams"));
        if (startParams?.cvId) {
          const fetchedCv = await fetchCV(startParams.cvId);
          setCv(fetchedCv);
        }
      } catch (error) {
        console.error("Error fetching CV:", error);
      }
    };

    getCv();
  }, []);

  return { cv };
};
