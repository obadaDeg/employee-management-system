import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { HEADER_CONTENT } from "../../utils/static-content";

function Header() {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const location = useLocation();
  const currentSection = location.pathname.split("/")[1] || "dashboard";

  const headerContent = HEADER_CONTENT[currentSection] || HEADER_CONTENT.dashboard;

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>
        <h6>{headerContent.title}</h6>
        <span>{headerContent.subtitle}</span>
      </div>
      <div className={styles.spanGroup}>
        {/* <input type="text" className={styles.inputField} placeholder="Search" /> */}
        <div className={styles.profileMenu}>
          <Button
            disableElevation
            disableFocusRipple
            disableTouchRipple
            onClick={handleMenuOpen}
            className={styles.profileButton}
          >
            <Avatar className={styles.avatar} />
            <span className={styles.username}>Robert</span>
          </Button>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
