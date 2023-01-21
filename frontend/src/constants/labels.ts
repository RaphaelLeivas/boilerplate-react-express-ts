import { MUIDataTableTextLabels } from 'mui-datatables';

export const MUI_DATATABLE_LABELS: MUIDataTableTextLabels = {
  body: {
    noMatch: 'Desculpe, nenhum registro encontrado',
    toolTip: 'Ordenação',
  },
  pagination: {
    next: 'Próxima página',
    previous: 'Página Anterior',
    rowsPerPage: 'Registros por página:',
    displayRows: 'de',
  },
  toolbar: {
    search: 'Busca',
    downloadCsv: 'Download CSV',
    print: 'Imprimir',
    viewColumns: 'Selecionar Colunas',
    filterTable: 'Filtrar Tabela',
  },
  filter: {
    all: 'Todos',
    title: 'FILTROS',
    reset: 'LIMPAR',
  },
  viewColumns: {
    title: 'Exibir Colunas',
    titleAria: 'Exibir/Esconder colunas da tabela',
  },
  selectedRows: {
    text: 'registro(s) selecionado(s)',
    delete: 'Remover',
    deleteAria: 'Remover Registros Selecionados',
  },
};
