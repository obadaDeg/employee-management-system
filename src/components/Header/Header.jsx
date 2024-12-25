import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, setRole } from "../../store/auth-slice";
import { HEADER_CONTENT } from "../../utils/static-content";
import styles from "./Header.module.css";
import { fetchUsers } from "../../utils/firebase-services";
import useAuth from "../../hooks/useAuth";

function Header() {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user, token } = useSelector((state) => state.auth);
  const user = useAuth();


  const currentSection = location.pathname.split("/")[1] || "dashboard";

  const headerContent = useMemo(
    () => HEADER_CONTENT[currentSection] || HEADER_CONTENT.dashboard,
    [currentSection]
  );

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // console.log(token, 'token');
  
  // console.log(user);
  

  const renderProfileButton = () => {
    if (user) {
      return (
        <>
          <Button
            disableElevation
            disableFocusRipple
            disableTouchRipple
            onClick={handleMenuOpen}
            className={styles.profileButton}
            aria-controls="profile-menu"
            aria-haspopup="true"
          >
            <Avatar className={styles.avatar} src={user.image} />
            <span className={styles.username}>{user.name}</span>
          </Button>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            id="profile-menu"
            aria-labelledby="profile-button"
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      );
    }

    return (
      <Button
        disableElevation
        disableFocusRipple
        disableTouchRipple
        className={styles.profileButton}
        onClick={() => navigate("/login")}
      >
        <span className={styles.username}>Login</span>
      </Button>
    );
  };

  

  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>
        <h6>
          {headerContent.title}
          {location.pathname === "/" ? ` ${user?.displayName || user?.email || ""}` : ""}
        </h6>
        <span>{headerContent.subtitle}</span>
      </div>
      <div className={styles.spanGroup}>
        <div className={styles.profileMenu}>{renderProfileButton()}</div>
      </div>
    </header>
  );
}

export default Header;
