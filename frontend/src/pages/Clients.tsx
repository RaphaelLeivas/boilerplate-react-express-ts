import React, { useState, useEffect, useCallback, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { CustomDataTable, EditDialog } from '../components';
import { MainContext, IFormData } from '../@types';
import { ClientsService } from '../api';

const Clients = () => {
  const { setSnackbar } = useContext(MainContext);

  const [dialog, setDialog] = useState({
    open: false,
    type: 'add' as 'add' | 'edit' | 'delete',
    _id: '',
  });
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  const clientsTableColumnsList = [
    { name: 'name', label: 'Nome' },
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Telefone' },
    { name: 'address', label: 'Endereço' },
    { name: 'cpf', label: 'CPF' },
  ];

  const getClients = useCallback(async () => {
    try {
      setLoading(true);

      const fetchedClients = await ClientsService.list();
      setClients(fetchedClients);
    } catch (error) {
      setSnackbar((prev) => ({
        ...prev,
        message: 'Falha ao buscar clientes!',
        type: 'error',
        open: true,
      }));
    } finally {
      setLoading(false);
    }
  }, [setSnackbar]);

  const handleDialogSave = async (data: IFormData) => {
    try {
      if (dialog.type === 'add') {
        await ClientsService.create(data)
      } else if (dialog.type === 'edit' && dialog._id) {
        await ClientsService.updateById(dialog._id, data)
      } else if (dialog.type === 'delete' && dialog._id) {
        await ClientsService.deleteById(dialog._id)
      }

      // atualiza a tabela
      await getClients();
      setDialog((prev) => ({ ...prev, open: false }));
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

  useEffect(() => {
    getClients();
  }, [getClients]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <CustomDataTable
          title="Clientes"
          data={clients}
          columns={clientsTableColumnsList}
          onAddIconClick={() => setDialog({ type: 'add', open: true, _id: '' })}
          onEditIconClick={(tableMeta) =>
            setDialog({ type: 'edit', open: true, _id: tableMeta.rowData[0] })
          }
          onDeleteIconClick={(tableMeta) =>
            setDialog({ type: 'delete', open: true, _id: tableMeta.rowData[0] })
          }
        />
      )}

      <EditDialog
        type={dialog.type}
        open={dialog.open}
        onClose={() => setDialog((prev) => ({ ...prev, open: false }))}
        onSave={handleDialogSave}
        _id={dialog._id}
      />
    </>
  );
};

export default Clients;
