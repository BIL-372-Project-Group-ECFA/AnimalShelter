import React, { useState } from "react";
import { addVeterinarian } from "../../api/veterinarians";
import "./AddVet.css";

const AddVet = () => {
    const [vetData, setVetData] = useState({
        contact_number: "",
        license_number: "",
        specialization: "",
    });

    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVetData({ ...vetData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addVeterinarian(vetData);
            setSuccessMessage("Veteriner başarıyla eklendi!");
            setVetData({
                contact_number: "",
                license_number: "",
                specialization: "",
            });
        } catch (err) {
            console.error("Failed to add veterinarian:", err);
            setError("Veteriner eklenirken bir hata oluştu: " + err.message);
        }
    };

    return (
        <div className="add-vet">
            <h2>Veteriner Ekle</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="contact_number">İletişim Numarası:</label>
                <input
                    type="text"
                    id="contact_number"
                    name="contact_number"
                    value={vetData.contact_number}
                    onChange={handleInputChange}
                />

                <label htmlFor="license_number">Lisans Numarası:</label>
                <input
                    type="text"
                    id="license_number"
                    name="license_number"
                    value={vetData.license_number}
                    onChange={handleInputChange}
                />

                <label htmlFor="specialization">Uzmanlık Alanı:</label>
                <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={vetData.specialization}
                    onChange={handleInputChange}
                />

                <button type="submit">Veteriner Ekle</button>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );


};
export default AddVet;