import React from "react";
import DataTable from "react-data-table-component";
const DataTableCom = ({ data, columns }) => {
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default DataTableCom;
