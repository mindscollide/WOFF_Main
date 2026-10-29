import React from "react";
import { Table } from "antd";
import "./table.css";

const CustomTable = ({
  columns,
  rows,
  pagination,
  scroll,
  rowSelection,
  id,
  className,
}) => {
  return (
    <Table
      className={className}
      // striped rows (see table.css); no `bordered` — tables have no grid lines
      rowClassName={(record, index) =>
        index % 2 === 0 ? "rowColor" : "rowColor rowColorAlt"
      }
      rowSelection={rowSelection}
      columns={columns}
      dataSource={rows}
      pagination={pagination}
      scroll={scroll}
    />
  );
};

export default CustomTable;
