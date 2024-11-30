import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./UserEntry.css";
import { addUser } from "../../api/users";
import axiosInstance from "../../api/axiosInstance";

const UserEntry = () => {
    const { setUserId } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      surname: '',
      contact_number: '',
      address: '',
      email: '',
      occupation: '',
      username: '',
    });

    const navigate = useNavigate();
  
    const handleLogin = async () => {
      if (!username) {
        alert('Lütfen kullanıcı adınızı girin.');
        return;
      }

      axiosInstance.get(`/users/username/${username}`)
        .then((response) => {
          console.log('Giriş yapıldı:', username);
          setUserId(response.data.user_id);
          navigate("/user-dashboard");
        }).catch((error) => {
          alert('Geçerli bir kullanıcı ismi girin veya yeni kullanıcı oluşturun.');
        });
    };
  
    const handleCreateUser = () => {
      setFormVisible(true);
    };
  
    const handleFormSubmit = async () => {
      if (!formData.name || !formData.surname || !formData.contact_number || !formData.address || !formData.email || !formData.occupation || !formData.username) {
        alert('Lütfen tüm alanları doldurun.');
        return;
      }

      await addUser(formData);
      console.log('Yeni kullanıcı oluşturuldu:', formData);
      // Backend'e yeni kullanıcı oluşturma isteği burada yapılabilir
      setFormVisible(false);
      setFormData({ name: '', surname: '', contact_number: '', address: '', email: '', occupation: '', username: '' });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <div className="user-entry-container">
        <h1 className="user-entry-title">Kullanıcı Girişi</h1>
        
        {/* Giriş Alanı */}
        <div className="login-container">
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="user-entry-button" onClick={handleLogin}>
            Giriş
          </button>
        </div>
  
        {/* Yeni Kullanıcı Formu */}
        <div className={`new-user-form ${formVisible ? 'show' : ''}`}>
          <input
            type="text"
            placeholder="Ad"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Soyad"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Telefon Numarası"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="E-posta"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Adres"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Meslek"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
          />

          <button className="user-entry-button" onClick={handleFormSubmit}>
            Kaydet
          </button>
        </div>
  
        {/* Yeni Kullanıcı Oluştur Butonu */}
        {!formVisible && (
          <button className="user-entry-button" onClick={handleCreateUser}>
            Yeni Kullanıcı Oluştur
          </button>
        )}
      </div>
    );
};
  

export default UserEntry;