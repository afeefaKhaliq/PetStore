import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function PetCard({ pet, onEdit, onDelete }) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleDelete = () => {
    onDelete(pet.id);
    handleConfirmClose();
  };

  return (
    <>
      <Card style={{ margin: '1rem 0' }}>
        <CardContent>
          <Typography variant="h5">{pet.name}</Typography>
          <Typography color="textSecondary">{pet.type}</Typography>
          <Typography color="textSecondary">{pet.breed}</Typography>
          <Typography color="textSecondary">{pet.price}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => onEdit(pet)}>Edit</Button>
          <Button size="small" color="secondary" onClick={() => setConfirmOpen(true)}>Delete</Button>
        </CardActions>
      </Card>
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this pet?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PetCard;
