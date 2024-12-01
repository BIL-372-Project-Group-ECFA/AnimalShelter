import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import AddAnimal from "./AddAnimal";
import AddShelter from "./AddShelter";
import AddVaccine from "./AddVaccine";

import "./AdminDashboard.css";

const AdminDashboard = () => {

    const[activeView, setActiveView] = useState("addAnimals");
    const renderView = () => {
        switch (activeView) {
            case "addShelter":
                return <AddShelter />;
            case "addVaccine":
                return <AddVaccine />;
            default:
                return <AddAnimal />;
        }
    };

    return (
        <div className="container">
            <h1 className="title">Admin Paneli</h1>
            <div className="buttons">
                <button
                    className={`tab-button ${activeView === "addAnimals" ? "active" : ""}`}
                    onClick={() => setActiveView("addAnimals")}
                >
                    Hayvan Ekle
                </button>

                <button
                    className={`tab-button ${activeView === "addShelter" ? "active" : ""}`}
                    onClick={() => setActiveView("addShelter")}
                >
                    Barınak Ekle
                </button>

                <button
                    className={`tab-button ${activeView === "addVaccine" ? "active" : ""}`}
                    onClick={() => setActiveView("addVaccine")}
                >
                    Aşı Ekle
                </button>
            </div>
            {renderView()}
        </div>
    );
};

export default AdminDashboard;