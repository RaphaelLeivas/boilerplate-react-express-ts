import React, { useContext } from 'react';
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumn,
  MUIDataTableMeta,
} from 'mui-datatables';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';

import { MainContext } from '../@types';
import { MUI_DATATABLE_LABELS } from '../constants';

interface DataTableProps {
  columns: { name: string; label: string }[];
  onEditIconClick?: (tableData: MUIDataTableMeta) => void;
  onDeleteIconClick?: (tableData: MUIDataTableMeta) => void;
  onAddIconClick?: () => void;
  title: string;
  data: Array<any>;
}

const CustomDataTable = ({
  columns,
  onEditIconClick = () => undefined,
  onDeleteIconClick = () => undefined,
  onAddIconClick = () => undefined,
  title,
  data,
}: DataTableProps) => {
  const theme = useTheme();
  const { isMobile } = useContext(MainContext);

  const tableOptions: MUIDataTableOptions = {
    textLabels: MUI_DATATABLE_LABELS,
    selectableRows: 'none',
    filter: false,
    viewColumns: true,
    pagination: true,
    responsive: 'standard',
    downloadOptions: {
      filename: `${title}.csv`,
      separator: ',',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: false,
      },
    },
    customToolbar: () => (
      <Tooltip title={title}>
        <IconButton
          sx={{
            backgroundColor: 'primary.main',
            ml: isMobile ? 0 : 3,
            transition: 'background 0.3s',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            p: 1.5,
          }}
          onClick={onAddIconClick}
        >
          <AddIcon sx={{ color: theme.palette.background.paper }} />
        </IconButton>
      </Tooltip>
    ),
  };

  let tableColumns: MUIDataTableColumn[] = [];

  tableColumns.push({
    name: '_id',
    label: 'id',
    options: {
      filter: true,
      sort: true,
      sortThirdClickReset: true,
      display: false,
    },
  });

  for (const column of columns) {
    tableColumns.push({
      name: column.name,
      label: column.label,
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    });
  }

  tableColumns.push({
    name: 'actions',
    label: 'A????es',
    options: {
      filter: false,
      sort: false,
      download: false,
      print: false,
      customBodyRender: (value, tableMeta) => (
        <Box display="flex" flexDirection="row" textAlign="center" justifyContent="center">
          <IconButton aria-label="Editar" onClick={() => onEditIconClick(tableMeta)}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="Remover" onClick={() => onDeleteIconClick(tableMeta)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  });

  const TableTitle = () =>
    isMobile ? (
      <React.Fragment />
    ) : (
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography variant="h5">{title}</Typography>
        <GroupIcon sx={{ ml: 2 }} />
      </Box>
    );

  return (
    <MUIDataTable
      title={<TableTitle />}
      data={data}
      columns={tableColumns}
      options={tableOptions}
    />
  );
};

export default CustomDataTable;
