import React, { useState, useEffect, useContext, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { MaskedTextField } from './index';
import { IFormData, INITIAL_FORM_DATA, MainContext } from '../@types';
import { api, AuthService } from '../services';

interface EditDialogProps {
  type: 'edit' | 'add' | 'delete';
  open: boolean;
  _id?: string;
  onClose: () => void;
  onSave: (data: IFormData) => Promise<void>; // async
}

const EditDialog = ({ type, open, onClose, onSave, _id }: EditDialogProps) => {
  const { setSnackbar } = useContext(MainContext);
  const token = AuthService.getToken();

  const [formData, setFormData] = useState<IFormData>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSave(formData);
  };

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getTitleByType = () => {
    switch (type) {
      case 'add':
        return 'Adicionar';
      case 'edit':
        return 'Editar';
      case 'delete':
        return 'Excluir';
      default:
        return '';
    }
  };

  const getClientDataById = useCallback(async () => {
    if (!_id) {
      setFormData(INITIAL_FORM_DATA);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`clients/${_id}`, { headers: { 'x-access-token': token } });
      if (!response || !response.data || !response.data.data) {
        throw new Error('Reposta da API mal formatada!');
      }

      const fetchedClient = response.data.data;
      setFormData(fetchedClient);
    } catch (error) {
      setSnackbar((prev) => ({
        ...prev,
        message: 'Falha ao buscar dados do cliente!',
        type: 'error',
        open: true,
      }));
    } finally {
      setLoading(false);
    }
  }, [setSnackbar, _id, token]);

  useEffect(() => {
    getClientDataById();
  }, [getClientDataById]);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="md"
      PaperProps={{ sx: { p: 4 } }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        {getTitleByType() + ' '} Cliente
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {type === 'delete' ? (
            <Typography>
              Deseja mesmo excluir o cliente <b>{formData.name}</b>?
            </Typography>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  label="Nome"
                  name="name"
                  autoFocus
                  value={formData.name}
                  onChange={handleFormDataChange}
                  autoComplete="off"
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleFormDataChange}
                  autoComplete="off"
                />
                <MaskedTextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  name="cpf"
                  label="CPF"
                  value={formData.cpf}
                  onChange={handleFormDataChange}
                  mask="999.999.999-99"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  label="Endereço"
                  name="address"
                  value={formData.address}
                  onChange={handleFormDataChange}
                  autoComplete="off"
                />
                <MaskedTextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  name="phone"
                  label="Telefone"
                  value={formData.phone}
                  onChange={handleFormDataChange}
                  mask="(99) 9 9999-9999"
                  autoComplete="off"
                />
              </Grid>
            </Grid>
          )}

          <Box component="div" width="100%" display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
            <Button color="error" variant="contained" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" sx={{ ml: 2 }}>
              Salvar
            </Button>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default EditDialog;
