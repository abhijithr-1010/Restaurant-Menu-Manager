import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../components/ConfirmDialog';
import { getDishes, toggleAvailability, deleteDish } from '../api';

const categoryColors = {
  Starter: '#2e7d32',
  Main: '#ed6c02',
  Dessert: '#d81b60',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    getDishes()
      .then((res) => setDishes(res.data))
      .catch(() => setError('Could not load dishes. Is the server running?'))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (dish) => {
    try {
      const res = await toggleAvailability(dish._id, !dish.availability);
      setDishes(dishes.map((d) => (d._id === dish._id ? res.data : d)));
    } catch {
      setError('Could not change availability');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDish(toDelete._id);
      setDishes(dishes.filter((d) => d._id !== toDelete._id));
    } catch {
      setError('Could not delete dish');
    }
    setToDelete(null);
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Menu Dashboard
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Dish Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Available</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dishes.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No dishes yet. Add one from the Add Dish tab.
                </TableCell>
              </TableRow>
            )}
            {dishes.map((dish) => (
              <TableRow key={dish._id} sx={{ opacity: dish.availability ? 1 : 0.45 }}>
                <TableCell>{dish.dishName}</TableCell>
                <TableCell>{dish.description}</TableCell>
                <TableCell>
                  <Chip
                    label={dish.category}
                    size="small"
                    sx={{ bgcolor: categoryColors[dish.category], color: 'white' }}
                  />
                </TableCell>
                <TableCell>₹{dish.price}</TableCell>
                <TableCell>
                  <Switch
                    checked={dish.availability}
                    onChange={() => handleToggle(dish)}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => navigate(`/edit/${dish._id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setToDelete(dish)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete dish?"
        message={toDelete ? `Remove "${toDelete.dishName}" from the menu?` : ''}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}