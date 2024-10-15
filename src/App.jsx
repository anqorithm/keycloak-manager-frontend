import React from "react";
import UsersList from "./components/UsersList";
import { Grid, Typography, Paper, Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          margin: 'auto',
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              Keycloak Manager
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <UsersList />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default App;
