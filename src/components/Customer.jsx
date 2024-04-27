import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react"

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Customer() {


    const [customer, setCustomer] = useState([])


    const [columnDefs, setColumnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true, floatingFilter: true },
        { field: 'lastname', sortable: true, filter: true, floatingFilter: true },
        { field: 'streetaddress', sortable: true, filter: true, floatingFilter: true },
        { field: 'postcode', sortable: true, filter: true, floatingFilter: true },
        { field: 'city', sortable: true, filter: true, floatingFilter: true },
        { field: 'email', sortable: true, filter: true, floatingFilter: true },
        { field: 'phone', sortable: true, filter: true, floatingFilter: true },
    ]);

    useEffect(() => getTrainings, [])

    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', { method: 'GET' })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(responseData => {
                console.log(responseData._embedded.customers)
                setCustomer(responseData._embedded.customers)
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            <h1 style={{ font: "caption", fontSize: 30 }}>This is the Customer page</h1>

            <div className="ag-theme-material" style={{ width: 1500, height: 500 }}>
                <AgGridReact
                    rowData={customer}
                    columnDefs={columnDefs}
                />
            </div>


        </>
    );


}