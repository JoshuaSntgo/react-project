import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Typography, Button, CssBaseline, Grid } from '@mui/material';
import Sidebar, { adminMenu } from '../components/Layout/Sidebar';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axiosInstance from '../axios/Index';
import { Link } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const Table = () => {

    const [users, setUsers] = useState([])
    const getUsers = React.useCallback(async () => {
        const data = await axiosInstance.get("/users")
        console.log(data)
        setUsers(data.data.users)
    }, [])

    useEffect(() => {
        getUsers()
    }, [getUsers])

    const [selectedFilter, setSelectedFilter] = useState(true)
    return (
    <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />

            <Grid container spacing={2} style={{marginRight: 10}}>
                <Grid xs={12} sm={4}>
                    <Card sx={{ minWidth: 380, marginLeft: 3, marginTop: 5 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                <b>APPROVED</b>
                            </Typography>

                            <Typography sx={{ mb: 1.5, fontSize: 30, fontWeight: 700 }} color="text.secondary">
                                {users.filter(a => a.isConfirmed).length}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => setSelectedFilter(true)}>See Details</Button>
                        </CardActions>
                    </Card>
                </Grid>
                
                <Grid xs={12} sm={4}>
                    <Card sx={{ minWidth: 380, marginLeft: 3, marginTop: 5 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                <b>PENDING</b>
                            </Typography>
                            <Typography sx={{ mb: 1.5, fontSize: 30, fontWeight: 700 }} color="text.secondary">
                                {users.filter(a => !a.isConfirmed).length}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => setSelectedFilter(false)}>See Details</Button>
                        </CardActions>

                    </Card>
                </Grid>

                <Grid xs={12} sm={4}>
                    <Card sx={{ minWidth: 380, marginLeft: 3, marginTop: 5 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                <b>FACULTY</b>
                            </Typography>
                            <Typography sx={{ mb: 1.5, fontSize: 30, fontWeight: 700 }} color="text.secondary">
                                {users.length}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" component={Link} to="/admin/usermanagement">See Details</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid xs={12} sm={5}>
                    <div className="ag-theme-alpine" style={{ height: 600, width: '100%', marginTop: 20, marginLeft: 25}}>
                        <AgGridReact
                        pagination={true}
                        paginationPageSize={10}
                        animateRows={true}
                        rowSelection={"multiple"}
                        defaultColDef={{ resizable: true, floatingFilter: true }}
                        rowData={users.filter(a => a.isConfirmed === selectedFilter)}
                        /* onRowClicked={({ data }) => setSelectedUser(data)} */>
                            <AgGridColumn
                            headerName="Name"
                            width={150}
                            field="firstName"
                            sortable={true}
                            filter={true}
                            valueGetter={({ data }) => data.firstName.toUpperCase() + " " + data.lastName.toUpperCase()}/>

                            <AgGridColumn
                            headerName="Email"
                            field="email"
                            flex="1"
                            sortable={true}
                            filter={true}/>

                            <AgGridColumn
                            headerName="Status"
                            width={150}
                            field="isConfirmed"
                            sortable={true}
                            filter={true}
                            valueGetter={(v) => v.data.isConfirmed ? "Approved" : "Pending"}/>
                            
                        </AgGridReact>
                    </div>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default Table