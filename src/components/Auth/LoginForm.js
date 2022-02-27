import React, { useState } from 'react';
import { useTheme } from '@mui/system';
import {
  Checkbox,
  Typography,
  FormControlLabel,
  FormGroup,
  Button,
  TextField,
  Dialog,
  Avatar,
  Link,
  Grid,
  Box,
  useMediaQuery,
  DialogContent,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginForm = ({ open, handleClose }) => {
  const theme = useTheme();
  const showFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog fullScreen={showFullScreen} open={open}>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Anmelden
          </Typography>
          <FormGroup sx={{ width: showFullScreen ? '100%' : '28em' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nutzername"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Passwort"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Angemeldet bleiben" />
            <FormControlLabel control={<Checkbox value="showPassword" color="primary" />} label="Passwort anzeigen" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Anmelden
            </Button>
            <Grid container sx={{ mt: '0.5em' }}>
              <Grid item xs>
                <Link href="#" variant="body2" noWrap>
                  Passwort vergessen?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" noWrap>
                  Kein Konto? Jetzt registrieren
                </Link>
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
          {'Copyright © '}
          <Link color="inherit" href="https://huntingdoc.kaiserreich.cloud">
            Hunting Doc
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
