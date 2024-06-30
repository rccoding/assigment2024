// MantineTable.tsx

import React from 'react';
import { Table } from '@mantine/core';
import '@mantine/core/styles.css';
interface DataItem {
  year:number
  minProductionCrop: number;
  maxProductionCrop: number;
}

interface Props {
  data: DataItem[];
}

const MantineTable: React.FC<Props> = ({ data }) => {
  
  const rows = data.map((item,ind) => (
    <Table.Tr key={ind}>
    <Table.Td>{item.year}</Table.Td>
    <Table.Td>{item.minProductionCrop}</Table.Td>
    <Table.Td>{item.maxProductionCrop}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
        <Table.Th>Year</Table.Th>
          <Table.Th>Crop with min production</Table.Th>
          <Table.Th>Crop with max production</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default MantineTable;
