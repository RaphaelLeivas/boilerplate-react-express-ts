import React, { useState, useEffect, useCallback, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { EditEquipmentDialog } from '../components/dialogs';
import { CustomDataTable } from '../components';
import { MainContext } from '../@types';
import { EquipmentsService } from '../api';

const Equipments = () => {
  const { setSnackbar } = useContext(MainContext);

  const [dialog, setDialog] = useState({
    open: false,
    type: 'add' as 'add' | 'edit' | 'delete',
    _id: '',
  });
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState([]);

  const equipmentsTableColumnsList = [
    { name: 'serialNumber', label: 'Serial' },
    { name: 'equipmentTypeName', label: 'Modelo' },
    { name: 'manufacturedAt', label: 'Data de Fabricação' },
    { name: 'status', label: 'Status' },
    { name: 'equipmentTypePrice', label: 'Preço do Modelo' },
  ];

  const getEquipments = useCallback(async () => {
    try {
      setLoading(true);

      const fetchedEquipments = await EquipmentsService.list();
      setEquipments(fetchedEquipments);
    } catch (error) {
      setSnackbar((prev) => ({
        ...prev,
        message: 'Falha ao buscar equipamentos!',
        type: 'error',
        open: true,
      }));
    } finally {
      setLoading(false);
    }
  }, [setSnackbar]);

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <CustomDataTable
          title="Equipamentos"
          data={equipments}
          columns={equipmentsTableColumnsList}
          onAddIconClick={() => setDialog({ type: 'add', open: true, _id: '' })}
          onEditIconClick={(tableMeta) =>
            setDialog({ type: 'edit', open: true, _id: tableMeta.rowData[0] })
          }
          onDeleteIconClick={(tableMeta) =>
            setDialog({ type: 'delete', open: true, _id: tableMeta.rowData[0] })
          }
        />
      )}

      <EditEquipmentDialog
        _id={dialog._id}
        type={dialog.type}
        open={dialog.open}
        handleClose={() => setDialog((prev) => ({ ...prev, open: false }))}
        refreshTable={getEquipments}
      />
    </>
  );
};

export default Equipments;
