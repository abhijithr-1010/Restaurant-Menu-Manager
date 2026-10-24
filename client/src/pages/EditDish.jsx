import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import DishForm from '../components/DishForm';
import { getDish, updateDish } from '../api';

export default function EditDish() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getDish(id)
      .then((res) => setDish(res.data))
      .catch(() => setError('Dish not found'));
  }, [id]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await updateDish(id, data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update dish');
      setSaving(false);
    }
  };

  if (!dish && !error) return <CircularProgress />;

  return (
    <>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {dish && (
        <DishForm
          title="Edit Dish"
          submitLabel="Save Changes"
          initialData={dish}
          onSubmit={handleSubmit}
          saving={saving}
        />
      )}
    </>
  );
}