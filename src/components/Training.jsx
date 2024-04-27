import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react"

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import dayjs from 'dayjs'

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

    return (
        <>
            <h1 style={{ font: "caption", fontSize: 30 }}>This is the Training page</h1>

            <div className="ag-theme-material" style={{ width: 1500, height: 500 }}>
                <AgGridReact
                    rowData={training}
                    columnDefs={columnDefs}
                />
            </div>


        </>
    );


}