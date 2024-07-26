import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import PetCard from './PetCard';
import AddForm from './AddForm';

function Home() {
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      const token = localStorage.getItem('token');

      axios.get('http://localhost:3500/api/pets', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setPets(response.data);
        })
        .catch(error => {
          console.error('Error fetching pets', error);
        });
    };

    fetchPets();
  }, []);

  const handleEdit = (pet) => {
    setCurrentPet(pet);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    axios.delete(`http://localhost:3500/api/pets/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setPets(pets.filter((pet) => pet.id !== id));
      })
      .catch(error => {
        console.error('Error deleting pet', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPet(null);
  };

  const handleSubmit = async (petData) => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    if (currentPet) {
      axios.put(`http://localhost:3500/api/pets/${currentPet.id}`, petData, { headers })
        .then(response => {
          setPets(pets.map(pet => (pet.id === currentPet.id ? response.data : pet)));
        })
        .catch(error => {
          console.error('Error updating pet', error);
        });
    } else {
      axios.post('http://localhost:3500/api/pets', petData, { headers })
        .then(response => {
          setPets([...pets, response.data]);
        })
        .catch(error => {
          console.error('Error adding pet', error);
        });
    }

    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Pet
      </Button>
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
      <AddForm open={open} handleClose={handleClose} handleSubmit={handleSubmit} pet={currentPet} />
    </>
  );
}

export default Home;
