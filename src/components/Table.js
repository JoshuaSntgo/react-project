import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Typography, Button, CssBaseline } from '@mui/material';
import Sidebar, { adminMenu } from '../components/Layout/Sidebar';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const Table = () => {

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />

            <Card sx={{ minWidth: 380, marginLeft: 3, marginTop: 5 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <b>APPROVED</b>
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        NUMBERS OF APPROVEED...
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">See Details</Button>
                </CardActions>

            </Card>

            <Card sx={{ minWidth: 380, marginLeft: 3, marginTop: 5 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <b>PENDING</b>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        NUMBERS OF PENDING
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">See Details</Button>
                </CardActions>

            </Card>

            <Card sx={{ minWidth: 380, marginLeft: 3, marginTop: 5 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <b>FACULTY</b>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        NUMBERS OF FACULTY
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">See Details</Button>
                </CardActions>

            </Card>
        </Box>
    )
}

export default Table