import { AuthProvider } from "@/context/AuthContext";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

interface DoctorsList {
    name: string,
    doctorId: string
}

const AppointmentContent: React.FC = () => {

    const [doctorsList, setDoctorsList] = useState<DoctorsList[]>([])
    const [selectedDoctor, setSelectedDoctor] = useState<string>()

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', width: "100vw", height: "100vh", padding: 5, display: "flex", justifyContent: "center" }}>
            <Box sx={{ backgroundColor: "#fff", width: "70vw", padding: 5 }}>
                <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" pb={2}>Book an Appointment</Typography>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: "50%" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select doctor</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedDoctor}
                                label="Select doctor"
                                placeholder="Choose a doctor"
                                onChange={(e) => { setSelectedDoctor(e.target.value) }}
                            >
                                {doctorsList.map(value => {
                                    <MenuItem value={value.name}>{value.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Select date" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box px={4} display="flex" flexDirection="column">
                        <Typography variant="body1" color="primary">Available time slots</Typography>
                        <Box display="flex" flexWrap="wrap" gap={4}>
                            <Button variant="contained">9:00 AM</Button>
                            <Button variant="contained">10:00 AM</Button>
                            <Button variant="contained">11:00 AM</Button>
                            <Button variant="contained">12:00 AM</Button>
                            <Button variant="contained">1:00 PM</Button>
                            <Button variant="contained">2:00 PM</Button>
                            <Button variant="contained">3:00 PM</Button>
                        </Box>
                        <TextField sx={{ pt: 2 }} multiline minRows={3} placeholder="Reason for visit" />
                        <TextField sx={{ pt: 2 }} multiline minRows={3} placeholder="Additional notes optional" />
                        <Button variant="contained" sx={{ mt: 2 }}>Confirm Booking</Button>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}


const Appointment: React.FC = () => (
    <AuthProvider>
        <AppointmentContent />
    </AuthProvider>
);

export default Appointment;