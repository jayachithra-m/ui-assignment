import React, { useState } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Info,
  AddCircle
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TableData = ({data}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (!data) {
    return <div>Loading...</div>; // Show a loading message until data is fetched
  }

  const { table_headers, table_data, workflow_steps } = data;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
 

    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      {/* Table Section */}
      <Grid item xs={8}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ padding: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#00796b' }}>
          Project: {data.project_name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#757575' }}>
        <Info /> Last Run: {new Date(data.last_run).toLocaleString()}
        </Typography>
          </Box>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {table_headers.map((header) => (
                    <TableCell
                      key={header.name}
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#e0f7fa',
                        color: '#00796b',
                        borderBottom: '2px solid #00796b',
                      }}
                    >
                    {header.name}
                     </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {table_data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                  <TableRow key={rowIndex} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} sx={{ borderBottom: '1px solid #ddd' }}>

                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={table_data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ backgroundColor: '#f5f5f5', color: '#00796b' }}
          />
        </Paper>
      </Grid>

      {/* Workflow Section */}
      <Grid item xs={4}>
      <Box sx={{ padding: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00796b' }}>
      Workflow Steps
    </Typography>
    {workflow_steps.map((step, index) => (
      <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AddCircle sx={{ color: '#4caf50', marginRight: 1 }} />
            <Typography sx={{ fontWeight: 'bold', marginLeft: 1 }}>{step.name_title}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body1">
              <strong>Name:</strong> {step.name}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {step.status}
            </Typography>
            <Typography variant="body1">
              <strong>Extra Params:</strong>
            </Typography>
            <Box sx={{ paddingLeft: 2 }}>
              <Typography variant="body2">
                {Object.keys(step.params_extra).map((key) => (
                  <div key={key}>
                    <strong>{key}:</strong> {JSON.stringify(step.params_extra[key])}
                  </div>
                ))}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    ))}
  </Box>
      </Grid>
    </Grid>
    );
};

export default TableData;
