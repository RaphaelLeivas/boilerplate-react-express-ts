import React, { useState, useEffect, useContext, useCallback } from 'react';
import moment from 'moment';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {
  IEquipmentFormData,
  INITIAL_EQUIPMENT_FORM_DATA,
  MainContext,
  IEquipmentType,
} from '../../@types';
import { EquipmentsService, EquipmentTypesService } from '../../api';
import { isValidDate } from '../../utils';

interface EditDialogProps {
  type: 'edit' | 'add' | 'delete';
  open: boolean;
  _id?: string;
  handleClose: () => void;
  refreshTable: () => Promise<void>;
}

const EditEquipmentDialog = ({ type, open, handleClose, _id, refreshTable }: EditDialogProps) => {
  const { setSnackbar } = useContext(MainContext);

  const [formData, setFormData] = useState<IEquipmentFormData>(INITIAL_EQUIPMENT_FORM_DATA);
  const [equipmentTypes, setEquipmentTypes] = useState<IEquipmentType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectEquipmentType = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      equipmentTypeId: event.target.value as string,
    }));
  };

  const handleDialogSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // verifica se a data é válida
    if (!isValidDate(formData.manufacturedAt)) {
      setSnackbar((prev) => ({
        ...prev,
        message: 'Data de fabricação inválida!',
        type: 'error',
        open: true,
      }));
      return;
    }

    const data = {
      ...formData,
      manufacturedAt: moment(formData.manufacturedAt, 'DD/MM/YYYY').valueOf(),
    };

    try {
      if (type === 'add') {
        await EquipmentsService.create(data);
      } else if (type === 'edit' && _id) {
        await EquipmentsService.updateById(_id, data);
      } else if (type === 'delete' && _id) {
        await EquipmentsService.deleteById(_id);
      }

      // atualiza a tabela
      await refreshTable();
      handleClose();
    } catch (error) {
      let errorMessage = 'Falha ao cadastrar equipamentos!';

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

  const getEquipmentDataById = useCallback(async () => {
    if (!_id) {
      setFormData(INITIAL_EQUIPMENT_FORM_DATA);
      return;
    }

    try {
      setLoading(true);

      const fetchedEquipment = await EquipmentsService.getById(_id);
      setFormData({
        ...fetchedEquipment,
        equipmentTypeId: fetchedEquipment.equipmentType?._id,
      });
    } catch (error) {
      setSnackbar((prev) => ({
        ...prev,
        message: 'Falha ao buscar dados do equipamento!',
        type: 'error',
        open: true,
      }));
    } finally {
      setLoading(false);
    }
  }, [setSnackbar, _id]);

  const getEquipmentTypes = useCallback(async () => {
    try {
      setLoading(true);

      const fetchedEquipmentTypes = await EquipmentTypesService.list();
      setEquipmentTypes(fetchedEquipmentTypes);
      setFormData((prev) => ({
        ...prev,
        equipmentTypeId: fetchedEquipmentTypes[0]._id,
      }));
    } catch (error) {
      setSnackbar((prev) => ({
        ...prev,
        message: 'Falha ao buscar tipos de equipamento!',
        type: 'error',
        open: true,
      }));
    } finally {
      setLoading(false);
    }
  }, [setSnackbar]);

  useEffect(() => {
    getEquipmentDataById();
    getEquipmentTypes();
  }, [getEquipmentDataById, getEquipmentTypes]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" PaperProps={{ sx: { p: 4 } }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {getTitleByType() + ' '} Equipamento
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box component="form" onSubmit={handleDialogSave} noValidate>
          {type === 'delete' ? (
            <Typography>
              Deseja mesmo excluir o equipamento <b>{formData.serialNumber}</b>?
            </Typography>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  label="Serial"
                  name="serialNumber"
                  autoFocus
                  value={formData.serialNumber}
                  onChange={handleFormDataChange}
                  autoComplete="off"
                />

                <FormControl fullWidth variant="standard" sx={{ mt: 4 }}>
                  <InputLabel>Tipo de Equipamento</InputLabel>
                  <Select
                    value={formData.equipmentTypeId}
                    label="Tipo de Equipamento"
                    onChange={handleSelectEquipmentType}
                  >
                    {equipmentTypes.map((equipmentType, index) => (
                      <MenuItem key={index} value={equipmentType._id}>
                        {equipmentType.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  label="Data de Fabricação"
                  name="manufacturedAt"
                  value={formData.manufacturedAt}
                  onChange={handleFormDataChange}
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

export default EditEquipmentDialog;
