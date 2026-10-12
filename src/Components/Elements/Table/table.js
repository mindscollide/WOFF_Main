import React, { useEffect, useState } from "react";
import { Table ,Input, Button, Space} from "antd";
import "./table.css";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
const CustomTable = ({
  columns,
  rows,
  pagination,
  scroll,
  rowSelection,
  id,
}) => {
console.log("rows",rows)
  return (
    <Table
      rowClassName="rowColor"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={rows}
      bordered
      pagination={pagination}
      scroll={scroll}
    />
  );
};

export default CustomTable;

//   render() {
//     const columns = [
//       {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//         width: '30%',
//         ...this.getColumnSearchProps('name'),
//       },
//       {
//         title: 'Age',
//         dataIndex: 'age',
//         key: 'age',
//         width: '20%',
//         ...this.getColumnSearchProps('age'),
//       },
//       {
//         title: 'Address',
//         dataIndex: 'address',
//         key: 'address',
//         ...this.getColumnSearchProps('address'),
//         sorter: (a, b) => a.address.length - b.address.length,
//         sortDirections: ['descend', 'ascend'],
//       },
//     ];
//     return <Table columns={columns} dataSource={data} />;
//   }
// }

// ReactDOM.render(<App />, mountNode);