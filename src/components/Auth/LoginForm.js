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

const initialFormData = {
  username: null,
  password: null,
  rememberMe: false,
};

const LoginForm = ({ open, handleClose }) => {
  const theme = useTheme();
  const showFullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = e => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleRememberMe = e => {
    updateFormData({
      ...formData,
      rememberMe: !formData.rememberMe,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };

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
          <form onSubmit={handleSubmit}>
            <FormGroup sx={{ width: showFullScreen ? '100%' : '28em' }}>
              <TextField
                onChange={handleChange}
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
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Passwort"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox color="primary" onChange={handleRememberMe} />}
                label="Angemeldet bleiben"
              />
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
          </form>
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
