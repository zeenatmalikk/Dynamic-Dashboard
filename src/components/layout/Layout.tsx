import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./Layout.module.less";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
  AccountCircle,
  ChevronRight,
  Clear,
  Notifications,
  Search,
} from "@mui/icons-material";

interface Props {
  children: React.ReactNode;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Layout(props: Props) {
  const { children, handleSearch, searchQuery, setSearchQuery } = props;
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <div className={styles.layout}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar className={styles.toolbar}>
          <Typography
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
            className={styles.head}
          >
            <span>
              Home <ChevronRight />
            </span>{" "}
            Dashboard V2
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {/* searchField to search for widgets */}
            <div className={styles.searchContainer}>
              <TextField
                variant="outlined"
                placeholder="Search anything..."
                className={styles.searchField}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClearSearch} edge="end">
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                  sx: {
                    padding: "0 10px",
                    height: "32px",
                  },
                }}
              />
            </div>
          </Box>
          <Notifications />
          <AccountCircle />
        </Toolbar>
      </AppBar>
      {/* render dashboard */}
      <Box component="main" className={styles.children}>
        <Toolbar />
        {children}
      </Box>
    </div>
  );
}
