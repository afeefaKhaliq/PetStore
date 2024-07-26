import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, FormControl } from '@mui/material';

function AddForm({ open, handleClose, handleSubmit, pet }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (pet) {
      // Fill in the form with pet data if editing
      setName(pet.name);
      setType(pet.type);
      setBreed(pet.breed);
      setPrice(pet.price);
    } else {
      // Clear the form if adding new pet
      setName('');
      setType('');
      setBreed('');
      setPrice('');
    }
  }, [pet, open]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!name || !type || !breed || !price) {
      setError('All fields are required');
      return;
    }

    const petData = { name, type, breed, price };
    handleSubmit(petData);
  };

  return (
    <Dialog open={open} onClose={() => {
      handleClose(); // Close dialog
      setName('');  // Clear form fields
      setType('');
      setBreed('');
      setPrice('');
      setError(''); // Clear error message
    }}>
      <DialogTitle>{pet ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the form below to {pet ? 'edit' : 'add'} a pet.
        </DialogContentText>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={onSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              id="name"
              label="Pet Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="type"
              label="Type"
              variant="outlined"
              value={type}
              placeholder='animal,bird,fish..'
              onChange={(e) => setType(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="breed"
              label="Breed"
              variant="outlined"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              placeholder='PKR'
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
          <DialogActions>
            <Button onClick={() => {
              handleClose();
              setName('');
              setType('');
              setBreed('');
              setPrice('');
              setError('');
            }} color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">{pet ? 'Update' : 'Add'} Pet</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddForm;
