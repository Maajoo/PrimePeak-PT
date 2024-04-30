import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react"
import Button from "@mui/material/Button";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs'

import AddTraining from "./AddTraining"
import Chart from "./Chart"

export default function Training() {

    const [training, setTraining] = useState([])

    const dateCellRenderer = (params) => {
        return dayjs(params.value).format('DD-MM-YYYY HH:mm');
    };

    const [columnDefs, setColumnDefs] = useState([
        { field: 'activity', sortable: true, filter: true, floatingFilter: true },
        { field: 'duration', sortable: true, filter: true, floatingFilter: true },
        { field: 'date', sortable: true, filter: true, floatingFilter: true, cellRenderer: dateCellRenderer },
        { field: 'customer.firstname', sortable: true, filter: true, floatingFilter: true },
        { field: 'customer.lastname', sortable: true, filter: true, floatingFilter: true },
        { cellRenderer: (params) => <Button size="small" color="error" onClick={() => deleteTraining(params)}>Delete</Button>, width: 120 },
    ]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings', { method: 'GET' })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(responseData => {
                console.log(responseData)
                setTraining(responseData)
            })
            .catch(error => console.error(error))
    }

    const getCustomerList = () => {
        return fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', { method: 'GET' })
            .then(response => response.json())
            .then(responseData => {
                return responseData;
            })
            .catch(error => console.error(error));
    }

    const addTraining = (trainings) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(trainings)
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    // setMsgSnackbar("Training added succesfully!")
                    // setOpenSnackbar(true)
                    return response.json()
                } else {
                    throw new Error("Data wasn't imported correctly")
                }
            })
            .then(data => {
                console.log("Data: " + data)
                getTrainings()
            })
    }

    const deleteTraining = (params) => {
        if (window.confirm("Are you sure?")) {
            console.log("POISTETTAVA URL " + 'https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/' + params.data.id)
            fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/' + params.data.id, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        // setOpenSnackbar(true)
                        // setMsgSnackbar("Delete OK!")
                        getTrainings()
                    }
                    // else {
                    //     setOpenSnackbar(true)
                    //     setMsgSnackbar("Delete not OK!")
                    // }
                })
                .catch(error => console.error(error))
        }

    }

    return (
        <>
            <h1 style={{ font: "caption", fontSize: 30 }}>This is the Training page</h1>
            <AddTraining addTraining={addTraining} getCustomerList={getCustomerList} />
            <Chart getTrainings={getTrainings} trainingData={training} />

            <div className="ag-theme-material" style={{ width: 1500, height: 500 }}>
                <AgGridReact
                    rowData={training}
                    columnDefs={columnDefs}
                />
            </div>


        </>
    );


}