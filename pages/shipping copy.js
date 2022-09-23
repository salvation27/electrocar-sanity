import React from 'react'
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from 'react';

const Shipping = () => {

    const [age, setAge] = React.useState("");
    const [age2, setAge2] = React.useState("");
    const [res, setRes] = React.useState(0);

     const handleChange = (event) => {
       setAge(event.target.value);
     };
       const handleChange2 = (event) => {
         setAge2(event.target.value);
       };
     console.log("age", age);
     console.log("res", res);

useEffect(() => {
  const result = () => {
    const test = age * age2;
    console.log("test", test);
    setRes(test);
  };
  result();
}, [age, age2]);


  return (
    <>
      {age}+{age2} = {res}
      <div style={{ width: "300px" }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Page"
              onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <InputLabel id="demo-simple-select-label">Тип сайта</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age2}
          label="Page"
          onChange={handleChange2}
        >
          <MenuItem value={10}>Lending</MenuItem>
          <MenuItem value={100}>Shop</MenuItem>
        </Select>
      </div>
    </>
  );
}

export default Shipping