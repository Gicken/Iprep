import { useEffect, useState } from "react";
import axios from "axios";

const CVList = () => {
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/cv/cv_list")
            .then((response) => setCvs(response.data))
            .catch(() => console.error("Error fetching CVs"));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/cv/delete_cv/${id}`);
            setCvs(cvs.filter(cv => cv.id !== id)); // Remove from UI
        } catch (error) {
            console.error("Error deleting CV");
        }
    };

    return (
        <div>
            <h2>Uploaded CVs</h2>
            <ul>
                {cvs.map(cv => (
                    <li key={cv.id}>
                        {cv.filename}
                        <button onClick={() => handleDelete(cv.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CVList;

