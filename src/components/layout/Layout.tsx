import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./Layout.module.less";
import { InputAdornment, TextField } from "@mui/material";
import { ChevronRight, Search } from "@mui/icons-material";
interface Props {
  children: React.ReactNode;
  window?: () => Window;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

export default function Layout(props: Props) {
  const { children,handleSearch } = props;

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
                  sx: {
                    padding: "0 10px",
                    height: "32px",
                  },
                }}
              />
            </div>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" className={styles.children}>
        <Toolbar />
        {children}
      </Box>
    </div>
  );
}
