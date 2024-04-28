import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react"
import Button from "@mui/material/Button";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

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
        { cellRenderer: (params) => <EditCustomer editCustomer={editCustomer} params={params} />, width: 120},
        { cellRenderer: (params) => <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>, width: 120 },
    ]);

    useEffect(() => getCustomers, [])

    const getCustomers = () => {
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


    const addCustomer = (customers) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customers)
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    // setMsgSnackbar("Customer added succesfully!")
                    // setOpenSnackbar(true)
                    return response.json()
                } else {
                    throw new Error("Data wasn't imported correctly")
                }
            })
            .then(data => {
                console.log("Data: " + data)
                getCustomers()
            })
    }

    const editCustomer = (url, editedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(editedCustomer)
        })
        .then(response => {
            console.log(response)
            if(response.ok) {
                // setMsgSnackbar("Customer edited succesfully!")
                // setOpenSnackbar(true)
                return response.json()
            } else {
                throw new Error("Data wasn't imported correctly")
            }
        })
        .then(data => {
            console.log("Data: " + data)
            getCustomers()
        })
    }

    const deleteCustomer = (params) => {
        if (window.confirm("Are you sure?")) {
            console.log("ID " + params.data._links.customer.href)
            fetch(params.data._links.customer.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        // setOpenSnackbar(true)
                        // setMsgSnackbar("Delete OK!")
                        getCustomers()
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
            <h1 style={{ font: "caption", fontSize: 30 }}>This is the Customer page</h1>

            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ width: 1500, height: 500 }}>
                <AgGridReact
                    rowData={customer}
                    columnDefs={columnDefs}
                />
            </div>


        </>
    );


}