import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const categories = ['Starter', 'Main', 'Dessert'];
const emptyForm = { dishName: '', description: '', category: '', price: '' };

export default function DishForm({ title, initialData, onSubmit, submitLabel, saving }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Pre-fill the form when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        dishName: initialData.dishName,
        description: initialData.description || '',
        category: initialData.category,
        price: initialData.price,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const found = {};
    if (!form.dishName.trim()) found.dishName = 'Dish name is required';
    if (!form.category) found.category = 'Choose a category';
    if (form.price === '' || Number(form.price) < 0) found.price = 'Enter a valid price';
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, price: Number(form.price) });
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 4 }, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Dish name"
            name="dishName"
            value={form.dishName}
            onChange={handleChange}
            error={Boolean(errors.dishName)}
            helperText={errors.dishName}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            minRows={2}
            fullWidth
          />
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            error={Boolean(errors.category)}
            helperText={errors.category}
            fullWidth
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Price (₹)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            error={Boolean(errors.price)}
            helperText={errors.price}
            fullWidth
          />
          <Button type="submit" variant="contained" size="large" disabled={saving}>
            {saving ? 'Saving...' : submitLabel}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}