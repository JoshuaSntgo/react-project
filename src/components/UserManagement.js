import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Typography, Button, CssBaseline } from '@mui/material';
import Sidebar, { adminMenu } from '../components/Layout/Sidebar';
import { Box } from '@mui/system';
const sampleData = [
    { id: 1, fullname: 'Roland Marco Balagtas', gender: 'Male', position: 'SMP Area Chair' },
    { id: 2, fullname: 'Marlon Bulaong', gender: 'Male', position: 'Faculty' },
    { id: 3, fullname: 'Liyana Bonifacio', gender: 'Female', position: 'Web and Mobile Area Chair' },
    { id: 4, fullname: 'Jon Snow', gender: 'Male', position: 'Faculty' },
    { id: 5, fullname: 'Arya Stark', gender: 'Female', position: 'BA Area Chair' },
];

const UserManagement = () => {
    const [pageSize, setPageSize] = React.useState(10);
    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DataGrid rows={sampleData}
                    autoHeight
                    rowHeight={35}
                    getRowId={(row) => row.id}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    columns={[
                        {
                            field: 'fullname',
                            headerName: 'Full Name',
                            minWidth: 300,
                            renderCell: cell => {
                                return (
                                    <Typography variant='body2' color="black"> {cell.value} </Typography>
                                )
                            }
                        },
                        {
                            field: 'position',
                            headerName: 'Positions',
                            minWidth: 350,
                            renderCell: cell => {
                                return (
                                    <Typography variant='body2' color="black"> {cell.value} </Typography>
                                )
                            }
                        },
                        {
                            field: 'action',
                            headerName: 'Action',
                            minWidth: 350,
                            renderCell: cell => {
                                return (
                                    <>
                                        <Button sx={{ mr: 2 }} size="small" variant="contained" >Edit</Button>
                                        <Button size="small" variant="contained" color="warning" >Delete</Button>
                                    </>
                                )
                            }
                        },
                    ]}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    checkboxSelection

                />
            </Box>
        </Box>
    )
}

export default UserManagement