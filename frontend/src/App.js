import React from 'react';
import AddAnimalForm from './components/AddAnimalForm';
import UpdateAnimalForm from './components/UpdateAnimalForm';
import DeleteAnimalForm from './components/DeleteAnimalForm';

function App() {
    return (
        <div className="App">
            <AddAnimalForm />
            <DeleteAnimalForm />
            <UpdateAnimalForm />
        </div>
    );
}

export default App;
