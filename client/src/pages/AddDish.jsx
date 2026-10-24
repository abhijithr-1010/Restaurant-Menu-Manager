import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import DishForm from '../components/DishForm';
import { createDish } from '../api';

export default function AddDish() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await createDish(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add dish');
      setSaving(false);
    }
  };

  return (
    <>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <DishForm
        title="Add Dish"
        submitLabel="Add Dish"
        onSubmit={handleSubmit}
        saving={saving}
      />
    </>
  );
}