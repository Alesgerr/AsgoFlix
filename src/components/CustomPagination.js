import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2} justifyContent="center" mt={5}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  );
};

export default CustomPagination;
