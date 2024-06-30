import React, { useEffect, useState } from 'react';
// import { Table } from '@mantine/core';
import dataFROMJSON from './data.json'
import MantineTable from './MaintineTable';
import MaintimeTable2 from './MainTime2'
import { MantineProvider, Table, Container, Title } from '@mantine/core';

const extractYear = (yearString) => {
  const match = yearString.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
};

// Function to process the dataset
const processData = (data) => {
  const yearWiseData = {};

  // Organize data by year
  data.forEach(item => {
    console.log(item.year)
    const year = item.year;
    if (!year) return;

    const crop = item.crop;
    const production = item.production || 0;  // Treat missing values as 0

    if (!yearWiseData[year]) {
      yearWiseData[year] = [];
    }

    yearWiseData[year].push({ crop, production });
  });
 

  // Aggregate data to find max and min production crops per year
  const aggregatedData = Object.keys(yearWiseData).map(year => {
    const crops = yearWiseData[year];
    const maxProductionCrop = crops.reduce((maxCrop, currentCrop) => {
      return currentCrop.production > maxCrop.production ? currentCrop : maxCrop;
    }, crops[0]);

    const minProductionCrop = crops.reduce((minCrop, currentCrop) => {
      return currentCrop.production < minCrop.production ? currentCrop : minCrop;
    }, crops[0]);

    return {
      year,
      maxProductionCrop: maxProductionCrop.crop,
      minProductionCrop: minProductionCrop.crop
    };
  });

  return aggregatedData;
};
const calculateAverages = (data) => {
  const cropData = {};

  // Organize data by crop
  data.forEach(item => {
    const crop = item["Crop Name"];
    const yieldValue = item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0;  // Treat missing values as 0
    const cultivationArea = item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0;  // Treat missing values as 0

    if (!cropData[crop]) {
      cropData[crop] = {
        totalYield: 0,
        totalCultivationArea: 0,
        count: 0
      };
    }

    cropData[crop].totalYield += yieldValue;
    cropData[crop].totalCultivationArea += cultivationArea;
    cropData[crop].count += 1;
  });

  // Calculate averages
  const averages = Object.keys(cropData).map(crop => {
    const data = cropData[crop];
    return {
      crop,
      averageYield: (data.totalYield / data.count).toFixed(2),
      averageCultivationArea: (data.totalCultivationArea / data.count).toFixed(2)
    };
  });

  return averages;
};
const App = () => {
  
  const [aggregatedData, setAggregatedData] = useState([]);
  const [aggregatedData2, setAggregatedData2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = dataFROMJSON ;
      console.log(result,"RESULTS")
      const processedData = result.flatMap(item => item).map(item => ({
        year: extractYear(item["Year"]),
        crop: item["Crop Name"],
        production: item["Crop Production (UOM:t(Tonnes))"] || 0  // Treat missing values as 0
      }));
      const agf=processData(processedData);
      setAggregatedData(agf);
      const data2=calculateAverages(result)
      setAggregatedData2(data2)
    };

    fetchData();
  }, []);

  return (
   
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Container className='MainOuterContainer'>
        <Title order={1}>Crops and Production</Title>
        <MantineTable  data={aggregatedData} />
        <Title order={1}>Crops and Min and Max yield</Title>
        <MaintimeTable2 data={aggregatedData2} />
      </Container>
      </MantineProvider>
    
  );
};

export default App;
