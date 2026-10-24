import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const tabs = [
  { label: 'Dashboard', to: '/' },
  { label: 'Add Dish', to: '/add' },
];

export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 1, flexWrap: 'wrap' }}>
        <RestaurantMenuIcon />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Menu Manager
        </Typography>
        {tabs.map((t) => (
          <Button
            key={t.to}
            color="inherit"
            component={NavLink}
            to={t.to}
            end
            sx={{ '&.active': { borderBottom: '2px solid white', borderRadius: 0 } }}
          >
            {t.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}