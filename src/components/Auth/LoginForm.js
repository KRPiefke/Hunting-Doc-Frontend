import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Typography, FormControlLabel, FormGroup } from '@mui/material';

const LoginForm = ({ open, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
      <DialogTitle textAlign="center" sx={{ pb: '1em', pt: '1.5em' }}>
        Anmelden
      </DialogTitle>
      <DialogContent>
        <TextField margin="dense" required id="outlined-required" label="Nutzername" type="username" fullWidth />
        <TextField
          margin="dense"
          required
          id="outlined-required"
          label="Passwort"
          type={showPassword ? 'text' : 'password'}
          fullWidth
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={() => setShowPassword(!showPassword)} />}
            label="Passwort anzeigen"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions sx={{ pb: '1.5em' }}>
        <Typography sx={{ flexGrow: 1, ml: '1em' }}>* Pflichtfelder</Typography>
        <Button onClick={handleClose}>Abbrechen</Button>
        <Button sx={{ mr: '1em' }}>Login</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginForm;
