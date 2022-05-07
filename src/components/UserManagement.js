import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Typography, Button, CssBaseline, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Stack, FormControl } from '@mui/material';
import Sidebar, { adminMenu } from '../components/Layout/Sidebar';
import { Box } from '@mui/system';
import Switch from '@mui/material/Switch';
import axiosInstance from '../axios/Index';

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-grid.css';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const UserManagement = () => {

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const getUsers = React.useCallback(async () => {
        const data = await axiosInstance.get("/users")
        console.log(data)
        setUsers(data.data.users)
    }, [])

    useEffect(() => {
        getUsers()
    }, [getUsers])
    const [pageSize, setPageSize] = React.useState(10);
    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {selectedUser && (
                    <UserDialog user={selectedUser} open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} refresh={getUsers} />
                )}
                <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                    <AgGridReact
                        pagination={true}
                        paginationPageSize={10}
                        animateRows={true}
                        rowSelection={"multiple"}
                        defaultColDef={{ resizable: true, floatingFilter: true }}
                        rowData={users}
                        onRowClicked={({ data }) => setSelectedUser(data)}
                    >
                        <AgGridColumn
                            headerName="Name"
                            width={150}
                            field="firstName"
                            sortable={true}
                            filter={true}
                            valueGetter={({ data }) => data.firstName.toUpperCase() + " " + data.lastName.toUpperCase()}
                        />
                        <AgGridColumn
                            headerName="Email"
                            field="email"
                            flex="1"
                            sortable={true}
                            filter={true}
                        />
                        <AgGridColumn
                            headerName="Status"
                            width={150}
                            field="isConfirmed"
                            sortable={true}
                            filter={true}
                            valueGetter={(v) => v.data.isConfirmed ? "Approved" : "Pending"}
                        />
                    </AgGridReact>
                </div>
            </Box>
        </Box>
    )
}

export default UserManagement

const UserDialog = ({ open, onClose, user, refresh }) => {


    const handleApprove = async () => {
        const { data } = await axiosInstance.put(`/users/${user._id}`, { isConfirmed: true })
        console.log(data)
        refresh()
        onClose()
    }
    return (

        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>User Information</DialogTitle>
            <Grid xs={12} sx={{ mb: 2, p: 2 }}>
                <Stack direction="row" spacing={2}>
                    <TextField

                        variant="outlined"
                        size="small"
                        fullWidth
                        label="First Name"
                        placeholder='Name'
                        value="sample"
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                    <TextField

                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Last Name"
                        placeholder='Last Name'
                        value="sample"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Stack>
            </Grid>
            <Grid xs={12} sx={{ p: 2 }}>
                <TextField

                    variant="outlined"
                    size="small"
                    fullWidth
                    label="Email"
                    placeholder='Email'
                    value="sample"
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <DialogActions>
                <Button variant='outlined' onClick={onClose}>Close</Button>
                <Button variant="contained" color="warning" disabled={user.isConfirmed} onClick={handleApprove}>Approve</Button>
            </DialogActions>
        </Dialog>
    )
}