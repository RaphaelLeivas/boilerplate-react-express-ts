import React, { useState, useEffect, useCallback, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { EditClientDialog } from '../components/dialogs';
import { CustomDataTable } from '../components';
import { MainContext } from '../@types';
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

      <EditClientDialog
        _id={dialog._id}
        type={dialog.type}
        open={dialog.open}
        handleClose={() => setDialog((prev) => ({ ...prev, open: false }))}
        refreshTable={getClients}
      />
    </>
  );
};

export default Clients;
