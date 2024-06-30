// MantineTable.tsx

import React from 'react';
import { Table } from '@mantine/core';
import '@mantine/core/styles.css';
interface DataItem {
  crop:string;
  averageYield: number;
  averageCultivationArea: number;
}

interface Props {
  data: DataItem[];
}

const MaintimeTable2: React.FC<Props> = ({ data }) => {
  
  const rows = data.map((item,ind) => (
    <Table.Tr key={ind}>
    <Table.Td>{item.crop}</Table.Td>
    <Table.Td>{item.averageYield}</Table.Td>
    <Table.Td>{item.averageCultivationArea}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
        <Table.Th>Crop</Table.Th>
          <Table.Th>Average Yield of the
Crop between
1950-2020</Table.Th>
          <Table.Th>Average Cultivation Area
of the Crop between
1950-2020</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default MaintimeTable2;
