import React, { useEffect, useState } from 'react'
import { Button, CssBaseline, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Stack, FormControl } from '@mui/material';
import Sidebar, { adminMenu } from '../components/Layout/Sidebar';
import { Box } from '@mui/system';
import axiosInstance from '../axios/Index';


import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import '../Faculty/pds.css'
const label = { inputProps: { 'aria-label': 'Switch demo' } };


const FacultyPDS = () => {

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

    const [selectedFilter, setSelectedFilter] = useState(true)
    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />

            <Grid xs={12} sm={5}>
                {selectedUser && (
                    <UserDialog selectedUsers={selectedUser} user={selectedUser} open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} refresh={getUsers} />
                )}
                <div className="ag-theme-alpine" style={{ height: 600, width: 1600, marginTop: 20, marginLeft: 25 }}>
                    <AgGridReact
                        pagination={true}
                        paginationPageSize={10}
                        animateRows={true}
                        rowSelection={"multiple"}
                        defaultColDef={{ resizable: true, floatingFilter: true }}
                        rowData={users.filter(a => a.isConfirmed === selectedFilter)}
                        onRowClicked={({ data }) => setSelectedUser(data)}>
                        <AgGridColumn
                            headerName="Name"
                            width={150}
                            field="firstName"
                            sortable={true}
                            filter={true}
                            valueGetter={({ data }) => data.firstName.toUpperCase() + " " + data.lastName.toUpperCase()} />

                        <AgGridColumn
                            headerName="Email"
                            field="email"
                            flex="1"
                            sortable={true}
                            filter={true} />

                        <AgGridColumn
                            headerName="Status"
                            width={150}
                            field="isConfirmed"
                            sortable={true}
                            filter={true}
                            valueGetter={(v) => v.data.isConfirmed ? "Approved" : "Pending"} />

                    </AgGridReact>
                </div>
            </Grid>
        </Box>
    )
}

export default FacultyPDS

const UserDialog = ({ open, onClose, user, refresh, selectedUsers }) => {

    const exportPdf = () => {

        html2canvas(document.querySelector("#capture1")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'letter', false);
            pdf.addImage(imgData, 'PNG', 5, 0, 600, 0, undefined, false); // padding left, padding top, size, 0,
            pdf.save(user.userInfo.personalInformation.lastName + "_" + user.userInfo.personalInformation.firstName + "_" + "PDS.pdf");
        });

    }
    return (

        <Dialog open={open} onClose={onClose} maxWidth="large" fullWidth>
            <DialogTitle>{user.userInfo.personalInformation.firstName}, Personal Data Sheet</DialogTitle>
            <div id="capture1">
                <table className="tg" id="table-to-xls">
                    <thead>
                        <tr>
                            <th className="tg-c3ow" colspan="7"><b>PERSONAL DATA SHEET</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tg-0pky" colspan="7"><i>WARNING: Any misrepresentation made in the Personal Data Sheet and the Work Experience Sheet shall cause the filing of administrative/criminal case/s against the person concerned.</i></td>
                        </tr>
                        <tr>
                            <td className="tg-0pky" colspan="7">READ THE ATTACHED GUIDE TO FILLING OUT THE PERSONAL DATA SHEET (PDS) BEFORE ACCOMPLISHING THE PDS FORM.</td>
                        </tr>
                        <tr>
                            <td className="tg-266k" colspan="7"><span><b>I. PERSONAL INFORMATION</b></span></td>
                        </tr>
                        <tr>
                            <td className="tg-0pky" width={"25%"}><b>SURNAME</b></td>
                            <td className="tg-0pky" colspan="7">{user.userInfo.personalInformation.lastName}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky"><b>FIRST NAME</b></td>
                            <td className="tg-0pky" colspan="4">{user.userInfo.personalInformation.firstName}</td>
                            <td className="tg-0pky"><b>NAME EXTENSION</b></td>
                            <td className="tg-0pky">{user.userInfo.personalInformation.nameExtension}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky"><b>MIDDLE NAME</b></td>
                            <td className="tg-0pky" colspan="7">{user.userInfo.personalInformation.middleInitial}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky"><b>DATE OF BIRTH</b></td>
                            <td className="tg-0pky" colspan="4">{user.userInfo.personalInformation.dateOfBirth}</td>
                            <td className="tg-0pky"><b>CITIZENSHIP</b></td>
                            <td className="tg-0pky">{user.userInfo.personalInformation.citizenship}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky"><b>SEX</b></td>
                            <td className="tg-0pky" colspan="7">{user.userInfo.personalInformation.gender}</td>
                        </tr>
                        <tr>
                            <td className="tg-0pky"><b>CIVIL STATUS</b></td>
                            <td className="tg-0pky" colspan="4">{user.userInfo.personalInformation.civilStatus}</td>
                            <td className="tg-0pky"><b>RESIDENTIAL ADDRESS</b></td>
                            <td className="tg-0pky" id="table-to-xls">
                                <tr>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address.house_no}</td>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address.street}</td>
                                </tr>
                                <tr>
                                    <td class="tg-0pky"><b>House/Block/Lot No.</b></td>
                                    <td class="tg-0pky"><b>Street</b></td>
                                </tr>
                                <tr>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address.subd}</td>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address.baranggay}</td>
                                </tr>
                                <tr>
                                    <td class="tg-0pky"><b>Subdivision/Village</b></td>
                                    <td class="tg-0pky"><b>Baranggay</b></td>
                                </tr>
                                <tr>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address.city}</td>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address.province}</td>
                                </tr>
                                <tr>
                                    <td class="tg-0pky"><b>City/Municipality</b></td>
                                    <td class="tg-0pky"><b>Province</b></td>
                                </tr>
                                <tr>
                                    <td className="zip" colspan="2">{user.userInfo.personalInformation.address.zip}</td>
                                </tr>
                                <tr>
                                    <td className="zip" colspan="2"><b>ZIP Code</b></td>
                                </tr>
                            </td>
                        </tr>

                        <tr>
                            <td className="tg-0pky"><b>TIN NO.</b></td>
                            <td className="tg-0pky" colspan="4">{user.userInfo.personalInformation.tin}</td>
                            <td className="tg-0pky"><b>MOBILE NO.</b></td>
                            <td className="tg-0pky" colspan="2">{user.userInfo.personalInformation.MobileNum}</td>
                        </tr>

                        <tr>
                            <td class="tg-0pky"><b>HEIGHT</b></td>
                            <td class="tg-0pky" colspan="4">{user.userInfo.personalInformation.height}</td>
                            <td class="tg-0pky" rowspan="6"><b>PERMANENT ADDRESS</b></td>
                            <td class="tg-0pky" rowspan="6" id="table-to-xls">
                                <tr>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address2.house_no2}</td>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address2.street2}</td>
                                </tr>
                                <tr>
                                    <td class="tg-0pky"><b>House/Block/Lot No.</b></td>
                                    <td class="tg-0pky"><b>Street</b></td>
                                </tr>
                                <tr>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address2.subd2}</td>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address2.baranggay2}</td>
                                </tr>
                                <tr>
                                    <td class="tg-0pky"><b>Subdivision/Village</b></td>
                                    <td class="tg-0pky"><b>Baranggay</b></td>
                                </tr>
                                <tr>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address2.city2}</td>
                                    <td class="tg-0pky">{user.userInfo.personalInformation.address2.province2}</td>
                                </tr>
                                <tr>
                                    <td class="tg-0pky"><b>City/Municipality</b></td>
                                    <td class="tg-0pky"><b>Province</b></td>
                                </tr>
                                <tr>
                                    <td className="zip" colspan="2">{user.userInfo.personalInformation.address2.zip2}</td>
                                </tr>
                                <tr>
                                    <td className="zip" colspan="2"><b>ZIP Code</b></td>
                                </tr>
                            </td>
                        </tr>


                        <tr>
                            <td class="tg-0pky"><b>WEIGHT</b></td>
                            <td class="tg-0pky" colspan="4">{user.userInfo.personalInformation.weight}</td>
                        </tr>

                        <tr>
                            <td class="tg-0pky"><b>BLOOD TYPE</b></td>
                            <td class="tg-0pky" colspan="4">{user.userInfo.personalInformation.btype}</td>
                        </tr>

                        <tr>
                            <td class="tg-0pky"><b>GSIS ID NO.</b></td>
                            <td class="tg-0pky" colspan="4">{user.userInfo.personalInformation.gsis}</td>
                        </tr>

                        <tr>
                            <td class="tg-0pky"><b>PAG-IBIG ID NO.</b></td>
                            <td class="tg-0pky" colspan="4">{user.userInfo.personalInformation.pagibig}</td>
                        </tr>

                        <tr>
                            <td class="tg-0pky"><b>PHILHEALTH NO.</b></td>
                            <td class="tg-0pky" colspan="4">{user.userInfo.personalInformation.phl_health}</td>
                        </tr>

                        <tr>
                            <td className="tg-0pky"><b>SSS NO.</b></td>
                            <td className="tg-0pky" colspan="4">{user.userInfo.personalInformation.sss}</td>
                            <td className="tg-0pky"><b>TELEPHONE NO.</b></td>
                            <td className="tg-0pky" colspan="2">{user.userInfo.personalInformation.TelNo}</td>
                        </tr>

                        <tr>
                            <td className="tg-0pky"><b>EMPLOYEE NO.</b></td>
                            <td className="tg-0pky" colspan="4">{user.userInfo.personalInformation.emp_no}</td>
                            <td className="tg-0pky"><b>E-MAIL ADDRESS</b></td>
                            <td className="tg-0pky" colspan="2">{user.userInfo.personalInformation.email}</td>
                        </tr>

                        <tr>
                            <td className="tg-266k" colspan="7"><span><b>II. EDUCATION BACKGROUND</b></span></td>
                        </tr>
                        <tr>
                            <td className="tg-0pky"><b>LEVEL</b></td>
                            <td className="tg-0pky" colspan="2"><b>NAME OF SCHOOL</b></td>
                            <td className="tg-0pky"><b>PERIOD OF ATTENDANCE</b></td>
                            <td className="tg-0pky"><b>UNITS EARNED</b></td>
                            <td className="tg-0pky"><b>YEAR GRADUATED</b></td>
                            <td className="tg-0pky"><b>AWARDS</b></td>
                        </tr>
                        {selectedUsers !== null && selectedUsers.userInfo.educ.educs.map((educ) => (
                            <tr>
                                <td className="tg-0pky">{educ.educationalLevel}</td>
                                <td className="tg-0pky" colspan="2">{educ.schoolName}</td>
                                <td className="tg-0pky">{educ.from.year} - {educ.to.year}</td>
                                <td className="tg-0pky">{educ.unitsEarned}</td>
                                <td className="tg-0pky">{educ.to.year}</td>
                                <td className="tg-0pky">{educ.awards}</td>
                            </tr>
                        ))}

                        <tr>
                            <td className="tg-266k" colspan="7"><span><b>III. CIVIL SERVICE</b></span></td>
                        </tr>


                        <tr>
                            <td className="tg-0pky"><b>CIVIL SERVICE</b></td>
                            <td className="tg-0pky"><b>RATING</b></td>
                            <td className="tg-0pky"><b>DATE OF EXAMINATION</b></td>
                            <td className="tg-0pky" colspan="2"><b>PLACE OF EXAMINATION</b></td>
                            <td className="tg-0pky"><b>LICENSE NUMBER</b></td>
                            <td className="tg-0pky"><b>DATE OF VALIDITY</b></td>
                        </tr>

                        {selectedUsers !== null && selectedUsers.userInfo.civilservice.CivilData.map((civil) => (
                            <tr>
                                <td className="tg-0pky">{civil.civilService}</td>
                                <td className="tg-0pky">{civil.rating}</td>
                                <td className="tg-0pky">{civil.dateOfExamination}</td>
                                <td className="tg-0pky" colspan="2">{civil.placeOfExamination}</td>
                                <td className="tg-0pky">{civil.number}</td>
                                <td className="tg-0pky">{civil.dateOfValidity}</td>
                            </tr>
                        ))}

                        <tr>
                            <td className="tg-266k" colspan="7"><span><b>IV. WORK EXPERIENCE</b></span></td>
                        </tr>


                        <tr>
                            <td className="tg-0pky"><b>INCLUSIVE DATES</b></td>
                            <td className="tg-0pky"><b>POSITION TITLE</b></td>
                            <td className="tg-0pky"><b>COMPANY</b></td>
                            <td className="tg-0pky"><b>MONTHLY SALARY</b></td>
                            <td className="tg-0pky"><b>SALARY</b></td>
                            <td className="tg-0pky"><b>STATUS OF APPOINTMENT</b></td>
                            <td className="tg-0pky"><b>GOV'T SERVICE</b></td>
                        </tr>

                        {selectedUsers !== null && selectedUsers.userInfo.workexp.WorkData.map((work) => (
                            <tr>
                                <td className="tg-0pky">{work.InclusiveDate.from} - {work.InclusiveDate.from}</td>
                                <td className="tg-0pky">{work.positionTitle}</td>
                                <td className="tg-0pky">{work.company}</td>
                                <td className="tg-0pky">{work.monthlySalary}</td>
                                <td className="tg-0pky">{work.salary}</td>
                                <td className="tg-0pky">{work.statusOfAppointment}</td>
                                <td className="tg-0pky">{work.govtService}</td>
                            </tr>
                        ))}


                        <tr>
                            <td className="tg-266k" colspan="7"><span><b>V. TRAININGS AND PROGRAMS</b></span></td>
                        </tr>


                        <tr>
                            <td className="tg-0pky"><b>TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS</b></td>
                            <td className="tg-0pky" colspan="2"><b>INCLUSIVE DATES</b></td>
                            <td className="tg-0pky"><b>NUMBER OF HOURS</b></td>
                            <td className="tg-0pky"><b>TYPE OF LD</b></td>
                            <td className="tg-0pky" colspan="2"><b>CONDUCTED/SPONSORED BY</b></td>
                        </tr>

                        {selectedUsers !== null && selectedUsers.userInfo.trainings.TrainingData.map((training) => (
                            <tr>
                                <td className="tg-0pky">{training.titleOfLearning}</td>
                                <td className="tg-0pky" colspan="2">{training.DatesOfAttendance.from} - {training.DatesOfAttendance.from}</td>
                                <td className="tg-0pky">{training.hours}</td>
                                <td className="tg-0pky">{training.typeOfLD}</td>
                                <td className="tg-0pky" colspan="2">{training.conducted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DialogActions>
                <Button variant='outlined' onClick={onClose} sx={{ marginTop: 1, marginBottom: 1 }}>Close</Button>
                <Button variant="contained" color="warning" onClick={exportPdf} sx={{ marginRight: 205 }} endIcon={<LocalPrintshopIcon />}>Print</Button>
            </DialogActions>
        </Dialog>
    )
}