// config/routes.js
import Home from "pages/Home";
import TravelPlanner from "pages/TravelPlanner";
import About from "pages/About";
import Contact from "pages/Contact";
import Setting from "pages/Setting";
import HomeIcon from '@mui/icons-material/Home';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingIcon from '@mui/icons-material/Settings';

export const routes = [
  { path: "home", element: <Home />, label: "Home", icon: <HomeIcon /> },
  { path: "travel", element: <TravelPlanner />, label: "TravelPlanner", icon: <DirectionsSubwayIcon /> },
  { path: "about", element: <About />, label: "About", icon: <InfoIcon /> },
  { path: "contact", element: <Contact />, label: "Contact", icon: <ContactsIcon /> },
  { path: "setting", element: <Setting />, label: "Setting", icon: <SettingIcon /> },
];