import { Add } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

function CivilService(props) {
    const {activeStep, handleBack, handleNext, steps} = props
    return (
        <Box sx={{padding: 5,}}>
            <div style={{display: 'flex', alignItems: "center", justifyContent: 'space-between'}}>
                <div>
                    <Typography style={{fontWeight: 600, fontSize: 18}}>Civil Service Eligibility</Typography>
                    <Typography style={{color: '#b4b4b4', fontSize: 11}}>Please complete the information below. If the field is not applicable, type N/A</Typography>
                </div>
                <Button size="small" color="primary" variant="contained" startIcon={<Add />}>Add Eligibility</Button>
            </div>
            <Box sx={{marginTop: 5}} component="form" onSubmit={() => console.log('submit form')}>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                    Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button type="submit">
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CivilService