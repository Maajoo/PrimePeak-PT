import React from "react";
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Label } from 'recharts';
import _ from 'lodash';

export default function Chart({ trainingData }) {
    //open = false, kun ikkuna on kiinni
    const [open, setOpen] = React.useState(false)

    const handleClickChart = () => {
        setOpen(true);
    }

    const handleCancel = () => {
        setOpen(false)
    }

    // Ryhmitä training data nimen perusteella ja summaa minuutit yhteen
    const groupedData = _(trainingData)
        .groupBy('activity')
        .map((items, activity) => ({
            name: activity,
            min: _.sumBy(items, 'duration')
        }))
        .value();

    return (
        <>
            <button className="iconbutton" style={{ height: 61.6 }} onClick={handleClickChart}><img src="./chart-icon.svg" alt="Chart icon" width={50} height={50} /></button>
            <Dialog
                fullScreen
                open={open}>
                <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BarChart width={1000} height={500} data={groupedData}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis>
                            <Label value="Duration (min)" angle={-90} position='insideLeft' style={{ textAnchor: 'middle' }} />
                        </YAxis>
                        <Tooltip />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Bar dataKey="min" fill="#8884d8" barSize={100} />
                    </BarChart>
                </DialogContent>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }}>
                    <Button
                        onClick={handleCancel}
                        variant="contained"
                        size="large">
                        Close
                    </Button>
                </div>
            </Dialog>
        </>
    )
};
