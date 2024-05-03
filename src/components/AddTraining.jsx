import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Autocomplete from '@mui/material/Autocomplete';
import { Popper } from "@mui/material";

export default function AddTraining(props) {

    const [training, setTraining] = React.useState({
        date: dayjs(),
        duration: 0,
        activity: '',
        customer: null
    })

    // state asiakkaille
    const [customers, setCustomers] = useState([]);

    // hae asiakkaat autocompletea varten
    useEffect(() => {
        props.getCustomerList()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
    }, []);

    //open = false, kun ikkuna on kiinni
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleSave = () => {
        // tarkista onko customer ja activity fieldit tyhjänä
        if (training.customer && training.activity !== '') {
            console.log("AddTraining: save a new training", training)
            const trainingToSave = {
                ...training,
                customer: training.customer._links.self.href
            };
            props.addTraining(trainingToSave)
            setOpen(false)
            // jos kummatkin ovat tyhjänä niin lähetä vain yksi error viesti
        } else {
            if (!training.customer && training.activity == '') {
                alert('Please fill in the empty fields')
            }
            // jos vain toinen on tyhjä niin lähetä täsmällisempi viesti
            else {
                if (!training.customer) {
                    alert('Please select a customer');
                }
                if (training.activity == '') {
                    alert('Please enter an activity')
                }
            }
        }
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <div>
            <button className="custombutton" style={{height: 61.6}} onClick={handleClickOpen}>Add</button>

            <Dialog  open={open} >
                <DialogTitle>

                    Add Training

                </DialogTitle>
                <DialogContent style={{ height: 600 }}>

                    <Stack padding={5}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <MobileDateTimePicker
                                orientation="landscape"
                                label="Date"
                                value={training.date}
                                onChange={(newDate) => setTraining({ ...training, date: newDate })}
                            />
                        </LocalizationProvider>
                    </Stack>


                    <Stack direction={{ xs: 'column' }} alignItems={"center"} padding={2}>
                        Duration (min)
                        <Gauge
                            width={100}
                            height={100}
                            value={training.duration}
                            valueMax={150}  // 2,5h treenit maksimissaan ;)
                            cornerRadius={100}
                            sx={{
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 20,
                                    transform: 'translate(0px, 0px)',
                                },
                            }}
                        />
                        <Slider
                            value={training.duration}
                            min={0} // 0h treenit minimissään :'(
                            max={150} // 2,5h treenit maksimissaan ;)
                            onChange={(e) => setTraining({ ...training, duration: e.target.value })}
                            aria-labelledby="training-duration-slider"
                            sx={{ width: 200 }}
                        />
                    </Stack>


                    <Stack alignItems={"center"} paddingTop={5}>
                        <TextField
                            margin="dense"
                            label="Activity"
                            value={training.activity}
                            onChange={(e) => setTraining({ ...training, activity: e.target.value })}
                            variant="outlined"
                            sx={{ width: 300 }}
                            required
                        />
                    </Stack>

                    <Stack padding={5}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={customers}
                            getOptionLabel={(option) => option.firstname + ' ' + option.lastname}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setTraining({ ...training, customer: newValue });
                                } else {
                                    newValue = null;
                                    setTraining({ ...training, customer: newValue });
                                }
                            }}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Customer" />}

                            // Popper varmistaa että dropdown menee vain ylöspäin jotta asiakkaan valitseminen on helpompaa
                            PopperComponent={({ children, ...props }) => (
                                <Popper {...props} style={{ width: 300 }} placement="top-start">{children}</Popper>
                            )}
                        />
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}