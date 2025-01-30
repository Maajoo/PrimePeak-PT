import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react"
import Button from "@mui/material/Button";
import "ag-grid-community/styles/ag-grid.css";
import "../ag-grid-theme-builder.css";
import dayjs from 'dayjs'
import Snackbar from "@mui/material/Snackbar";
import AddTraining from "./AddTraining"
import Chart from "./Chart"

export default function Training() {

    const [training, setTraining] = useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [msgSnackbar, setMsgSnackbar] = useState("")

    //const taulukon pituudelle
    const [gridApi, setGridApi] = useState(null);

    const dateCellRenderer = (params) => {
        return dayjs(params.value).format('DD.MM.YYYY HH:mm');
    };

    const [columnDefs, setColumnDefs] = useState([
        { field: 'activity', sortable: true, filter: true, floatingFilter: true, flex: 2 },
        { field: 'duration', sortable: true, filter: true, floatingFilter: true, flex: 2 },
        { field: 'date', sortable: true, filter: true, floatingFilter: true, cellRenderer: dateCellRenderer, flex: 2 },
        { field: 'customer.firstname', sortable: true, filter: true, floatingFilter: true, flex: 2 },
        { field: 'customer.lastname', sortable: true, filter: true, floatingFilter: true, flex: 2 },
        { cellRenderer: (params) => <Button size="small" color="error" onClick={() => deleteTraining(params)}>Delete</Button>, width: 120 },
    ]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', { method: 'GET' })
            .then(response => {
                console.log("GET TRAININGS ", response)
                return response.json()
            })
            .then(responseData => {
                console.log("RESPONSEDATA ", responseData._embedded.trainings);
                setTraining(responseData._embedded.trainings);
            })
            .catch(error => console.error(error))
    }

    const getCustomerList = () => {
        return fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', { method: 'GET' })
            .then(response => response.json())
            .then(responseData => {
                return responseData;
            })
            .catch(error => console.error(error));
    }

    const addTraining = (trainings) => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(trainings)
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    setMsgSnackbar("Training added succesfully!")
                    setOpenSnackbar(true)
                    return response.json()
                } else {
                    throw new Error("Add training failed!")
                }
            })
            .then(data => {
                console.log("Data: " + data)
                getTrainings()
            })
    }

    const deleteTraining = (params) => {
        if (window.confirm("Are you sure?")) {
            console.log("POISTETTAVA URL " + 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/' + params.data.id)
            fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/' + params.data.id, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setOpenSnackbar(true)
                        setMsgSnackbar("Training deleted succesfully!")
                        getTrainings()
                    }
                    else {
                        setOpenSnackbar(true)
                        setMsgSnackbar("Delete training failed!")
                    }
                })
                .catch(error => console.error(error))
        }

    }

    // Taulukko kasvaa pituutta riippuen pagination asetuksesta sekä objektien määrästä
    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    // Taulukko kasvaa pituutta riippuen pagination asetuksesta sekä objektien määrästä
    useEffect(() => {
        if (gridApi) {
            gridApi.sizeColumnsToFit();
            gridApi.setDomLayout('autoHeight');
        }
    }, [gridApi]);

    return (
        <>
            <div className="add-icon-container">
                <AddTraining addTraining={addTraining} getCustomerList={getCustomerList} />
                <Chart getTrainings={getTrainings} trainingData={training} />
            </div>
            <div className="centertable">
                <div className="ag-theme-custom" style={{ width: 1500, height: 600 }}>
                    <AgGridReact
                        onGridReady={onGridReady}
                        pagination={true}
                        paginationPageSize={10}
                        rowData={training}
                        columnDefs={columnDefs}
                    />
                    <Snackbar
                        open={openSnackbar}
                        message={msgSnackbar}
                        autoHideDuration={3000}
                        onClose={() => {
                            setOpenSnackbar(false)
                            setMsgSnackbar("")
                        }}>
                    </Snackbar>
                </div>
            </div>


        </>
    );
}