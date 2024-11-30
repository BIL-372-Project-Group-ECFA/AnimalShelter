import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import AdoptedAnimals from "./AdoptedAnimals";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { userId } = useContext(AppContext);
  const [activeView, setActiveView] = useState("overview"); // Aktif görünüm state'i

  const renderView = () => {
    switch (activeView) {
      case "adoptedAnimals":
        return <AdoptedAnimals />;
      case "newAdoption":
        return (
          <div>
            <h3>Yeni Hayvan Sahiplen</h3>
            <p>Hayvan sahiplenme işlemi burada yapılacak.</p>
            {/* Sahiplenme formu veya seçenekler eklenecek */}
          </div>
        );
      case "newDonation":
        return (
          <div>
            <h3>Yeni Bağış Yap</h3>
            <p>Bağış yapma işlemi burada yapılacak.</p>
            {/* Bağış formu veya seçenekler eklenecek */}
          </div>
        );
      case "donationHistory":
        return (
          <div>
            <h3>Geçmiş Bağışlar</h3>
            <p>Yapılan bağışların geçmişi burada görüntülenecek.</p>
            {/* Bağış geçmişi burada listelenecek */}
          </div>
        );
      default:
        return (
          <div>
            <h3>Genel Bilgiler</h3>
            <p>Bu panelden işlemlerinizi yönetebilirsiniz.</p>
          </div>
        );
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
