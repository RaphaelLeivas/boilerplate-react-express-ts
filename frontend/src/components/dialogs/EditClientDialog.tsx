import React, { useState, useEffect, useContext, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { MaskedTextField } from '../index';
import { IClientFormData, INITIAL_CLIENT_FORM_DATA, MainContext } from '../../@types';
import { ClientsService } from '../../api';

interface EditDialogProps {
  type: 'edit' | 'add' | 'delete';
  open: boolean;
  _id?: string;
  handleClose: () => void;
  refreshTable: () => Promise<void>;
}

const EditClientDialog = ({ type, open, handleClose, _id, refreshTable }: EditDialogProps) => {
  const { setSnackbar } = useContext(MainContext);

  const [formData, setFormData] = useState<IClientFormData>(INITIAL_CLIENT_FORM_DATA);
  const [loading, setLoading] = useState(false);

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDialogSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (type === 'add') {
        await ClientsService.create(formData);
      } else if (type === 'edit' && _id) {
        await ClientsService.updateById(_id, formData);
      } else if (type === 'delete' && _id) {
        await ClientsService.deleteById(_id);
      }

      // atualiza a tabela
      await refreshTable();
      handleClose();
    } catch (error) {
      let errorMessage = 'Falha ao cadastrar clientes!';

      if (
        error.response &&
        error.response.status === 400 &&
        typeof error.response.data.message === 'string'
      ) {
        errorMessage = error.response.data.message;
      }

      setSnackbar((prev) => ({
        ...prev,
        message: errorMessage,
        type: 'error',
        open: true,
      }));
    }
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
      setFormData(INITIAL_CLIENT_FORM_DATA);
      return;
    }

    try {
      setLoading(true);

      const fetchedClient = await ClientsService.getById(_id);
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
  }, [setSnackbar, _id]);

  useEffect(() => {
    getClientDataById();
  }, [getClientDataById]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" PaperProps={{ sx: { p: 4 } }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {getTitleByType() + ' '} Cliente
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box component="form" onSubmit={handleDialogSave} noValidate>
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
            <Button color="error" variant="contained" onClick={handleClose}>
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

export default EditClientDialog;
