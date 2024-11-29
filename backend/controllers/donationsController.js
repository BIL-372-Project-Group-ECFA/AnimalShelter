const { donations } = require('../models/init-models')(require('../utils/db').sequelize);

// Yeni bir bağış ekle
const createDonation = async (req, res) => {
  try {
    const { shelter_id, donor_id, amount, donation_date } = req.body;

    // Tarihi doğru formatta al
    const formattedDate = donation_date ? donation_date.split('.').reverse().join('-') : null;

    const newDonation = await donations.create({
      shelter_id,
      donor_id,
      amount,
      donation_date: formattedDate,
    });

    return res.status(201).json({ message: 'Donation created successfully', donation: newDonation });
  } catch (error) {
    console.error('Error creating donation:', error);
    return res.status(500).json({ message: 'Error creating donation', error: error.message });
  }
};

// Tüm bağışları listele
const getAllDonations = async (req, res) => {
  try {
    const allDonations = await donations.findAll();

    // Tarih formatını geri çevir: 'DD-MM-YYYY' -> 'YYYY-MM-DD'
    const formattedDonations = allDonations.map(donation => ({
      ...donation.toJSON(),
      donation_date: donation.donation_date
        ? donation.donation_date.split('.').reverse().join('-')
        : null,
    }));

    return res.status(200).json(formattedDonations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ message: 'Error fetching donations', error: error.message });
  }
};

// Tek bir bağışı getir
const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await donations.findByPk(id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Tarih formatını geri çevir
    const formattedDonation = {
      ...donation.toJSON(),
      donation_date: donation.donation_date
        ? donation.donation_date.split('.').reverse().join('-')
        : null,
    };

    return res.status(200).json(formattedDonation);
  } catch (error) {
    console.error('Error fetching donation:', error);
    return res.status(500).json({ message: 'Error fetching donation', error: error.message });
  }
};

// Bağışı güncelle
const updateDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { shelter_id, donor_id, amount, donation_date } = req.body;

    // Tarihi tersine çevir
    const formattedDate = donation_date ? donation_date.split('.').reverse().join('-') : null;

    const donation = await donations.findByPk(id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    await donation.update({
      shelter_id,
      donor_id,
      amount,
      donation_date: formattedDate,
    });

    return res.status(200).json({ message: 'Donation updated successfully', donation });
  } catch (error) {
    console.error('Error updating donation:', error);
    return res.status(500).json({ message: 'Error updating donation', error: error.message });
  }
};

// Bağışı sil
const deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;

    const donation = await donations.findByPk(id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    await donation.destroy();

    return res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    return res.status(500).json({ message: 'Error deleting donation', error: error.message });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
};
