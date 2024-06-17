import React, { useState } from "react";
import { Container, VStack, Button, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FaTrash, FaDownload } from "react-icons/fa";
import Papa from "papaparse";
import { CSVLink } from "react-csv";

const Index = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setHeaders(result.meta.fields);
        setData(result.data);
      },
    });
  };

  const handleAddRow = () => {
    setData([...data, {}]);
  };

  const handleRemoveRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleCellChange = (rowIndex, columnId, value) => {
    const newData = [...data];
    newData[rowIndex][columnId] = value;
    setData(newData);
  };

  return (
    <Container centerContent maxW="container.xl" py={10}>
      <VStack spacing={4} width="100%">
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
        {data.length > 0 && (
          <>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {headers.map((header, index) => (
                    <Th key={index}>{header}</Th>
                  ))}
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {headers.map((header, colIndex) => (
                      <Td key={colIndex}>
                        <Input
                          value={row[header] || ""}
                          onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                        />
                      </Td>
                    ))}
                    <Td>
                      <IconButton
                        aria-label="Delete row"
                        icon={<FaTrash />}
                        onClick={() => handleRemoveRow(rowIndex)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Button onClick={handleAddRow}>Add Row</Button>
            <CSVLink data={data} headers={headers} filename={"edited_data.csv"}>
              <Button leftIcon={<FaDownload />}>Download CSV</Button>
            </CSVLink>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;