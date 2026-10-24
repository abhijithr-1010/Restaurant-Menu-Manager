import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddDish from './pages/AddDish';
import EditDish from './pages/EditDish';

export default function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddDish />} />
          <Route path="/edit/:id" element={<EditDish />} />
        </Routes>
      </Container>
    </>
  );
}