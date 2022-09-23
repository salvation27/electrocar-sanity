import React from 'react'
import { Typography } from "@mui/material";

const TypographyEl = ({ teg, classN, children }) => {
  return (
    <Typography component={teg} variant={classN}>
      {children}
    </Typography>
  );
};

export default TypographyEl