import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import AdoptedAnimals from "./AdoptedAnimals";
import UserOverview from "./UserOverview";
import MakeDonations from "./MakeDonations";
import DonationHistory from "./DonationHistory";
import AdoptNewAnimal from "./AdoptNewAnimal";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { userId } = useContext(AppContext);
  const [activeView, setActiveView] = useState("overview"); // Aktif görünüm state'i

  const renderView = () => {
    switch (activeView) {
      case "adoptedAnimals":
        return <AdoptedAnimals />;
      case "newAdoption":
        return <AdoptNewAnimal />;
      case "newDonation":
        return <MakeDonations/>;
      case "donationHistory":
        return <DonationHistory />;
      default:
        return <UserOverview />;
    }
  };

  return (
    <div className="container">
      <h1 className="title">Kullanıcı Paneli</h1>
      <div className="buttons">

        <button
          className={`tab-button ${activeView === "overview" ? "active" : ""}`}
          onClick={() => setActiveView("overview")}
        >
          Genel Bakış
        </button>

        <button
          className={`tab-button ${
            activeView === "adoptedAnimals" ? "active" : ""
          }`}
          onClick={() => setActiveView("adoptedAnimals")}
        >
          Sahiplenilen Hayvanlar
        </button>

        <button
          className={`tab-button ${activeView === "newAdoption" ? "active" : ""}`}
          onClick={() => setActiveView("newAdoption")}
        >
          Yeni Hayvan Sahiplen
        </button>

        <button
          className={`tab-button ${activeView === "newDonation" ? "active" : ""}`}
          onClick={() => setActiveView("newDonation")}
        >
          Yeni Bağış Yap
        </button>

        <button
          className={`tab-button ${
            activeView === "donationHistory" ? "active" : ""
          }`}
          onClick={() => setActiveView("donationHistory")}
        >
          Geçmiş Bağışlar
        </button>

      </div>
      <div className="view-container">{renderView()}</div>
    </div>
  );
};

export default UserDashboard;
