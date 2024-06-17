import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input } from '@chakra-ui/react';

const EditableTable = ({ data, setData }) => {
  const [newRow, setNewRow] = useState({});

  const handleInputChange = (e, rowIndex, columnName) => {
    const newData = [...data];
    newData[rowIndex][columnName] = e.target.value;
    setData(newData);
  };

  const handleNewRowChange = (e, columnName) => {
    setNewRow({ ...newRow, [columnName]: e.target.value });
  };

  const handleAddRow = () => {
    setData([...data, newRow]);
    setNewRow({});
  };

  const handleRemoveRow = (rowIndex) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {data.length > 0 && Object.keys(data[0]).map((columnName) => (
            <Th key={columnName}>{columnName}</Th>
          ))}
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {Object.keys(row).map((columnName) => (
              <Td key={columnName}>
                <Input value={row[columnName]} onChange={(e) => handleInputChange(e, rowIndex, columnName)} />
              </Td>
            ))}
            <Td>
              <Button colorScheme="red" onClick={() => handleRemoveRow(rowIndex)}>Remove</Button>
            </Td>
          </Tr>
        ))}
        <Tr>
          {data.length > 0 && Object.keys(data[0]).map((columnName) => (
            <Td key={columnName}>
              <Input value={newRow[columnName] || ''} onChange={(e) => handleNewRowChange(e, columnName)} placeholder={`New ${columnName}`} />
            </Td>
          ))}
          <Td>
            <Button colorScheme="green" onClick={handleAddRow}>Add Row</Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default EditableTable;