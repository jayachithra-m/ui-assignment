import React, { useState, useEffect } from "react";
import {
  Container,
} from "@mui/material";
import TableData from "./TableData";
import DataIcon from '@mui/icons-material/DataUsage';
import SummaryIcon from '@mui/icons-material/InsertChart';
import LogsIcon from '@mui/icons-material/Description';


const App = () => {
  const [sampleData, setSampleData] = useState(null);

  useEffect(() => {
    fetch('/sample.json')
      .then((response) => response.json())
      .then((data) => setSampleData(data));
  }, []);

  return (
    <Container>
       <div className="button-container" style={{ display: 'flex' }}>
        <button>
          <DataIcon />
          Data
        </button>
        <button>
          <SummaryIcon />
          Summary
        </button>
        <button>
          <LogsIcon />
          Logs
        </button>
      </div>
          <TableData data={sampleData} />
    </Container>
  );
};

export default App;
