import React from 'react';
import AddAnimalForm from './components/AddAnimalForm';
import UpdateAnimalForm from './components/UpdateAnimalForm';
import DeleteAnimalForm from './components/DeleteAnimalForm';
import AddUserForm from './components/AddUserForm';
import DeleteUserForm from './components/DeleteUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import AddAdoptionHistoryForm from './components/AddAdoptionHistoryForm';
import UpdateAdoptionHistoryForm from './components/UpdateAdoptionHistoryForm';
import DeleteAdoptionHistoryForm from './components/DeleteAdoptionHistoryForm';
import AddShelterForm from './components/AddShelterForm';
import UpdateShelterForm from './components/UpdateShelterForm';
import DeleteShelterForm from './components/DeleteShelterForm';
import AddVaccineForm from './components/AddVaccineForm';
import UpdateVaccineForm from './components/UpdateVaccineForm';
import DeleteVaccineForm from './components/DeleteVaccineForm';
import AddVeterinarianForm from './components/AddVeterinarianForm';
import UpdateVeterinarianForm from './components/UpdateVeterinarianForm';
import DeleteVeterinarianForm from './components/DeleteVeterinarianForm';

function App() {
    return (
        <div className="App">
            <AddAnimalForm />
            <DeleteAnimalForm />
            <UpdateAnimalForm />
            <AddUserForm />
            <DeleteUserForm />
            <UpdateUserForm />
            <AddAdoptionHistoryForm />
            <UpdateAdoptionHistoryForm />
            <DeleteAdoptionHistoryForm />
            <AddShelterForm />
            <UpdateShelterForm />
            <DeleteShelterForm />
            <AddVaccineForm />
            <UpdateVaccineForm />
            <DeleteVaccineForm />
            <AddVeterinarianForm />
            <UpdateVeterinarianForm />
            <DeleteVeterinarianForm />
        </div>
    );
}

export default App;
