import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react"
import Button from "@mui/material/Button";

import React, { useCallback, useRef, } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCustomer from "./AddCustomer";
import OpenCustomer from "./OpenCustomer"

export default function Customer() {

    const [customer, setCustomer] = useState([])
    const gridRef = useRef(null);


    const [columnDefs, setColumnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true, floatingFilter: true },
        { field: 'lastname', sortable: true, filter: true, floatingFilter: true },
        { field: 'email', sortable: true, filter: true, floatingFilter: true },

        { field: 'phone', sortable: true, filter: true, floatingFilter: true, hide: true },
        { field: 'streetaddress', sortable: true, filter: true, floatingFilter: true, hide: true },
        { field: 'postcode', sortable: true, filter: true, floatingFilter: true, hide: true },
        { field: 'city', sortable: true, filter: true, floatingFilter: true, hide: true },

        { cellRenderer: (params) => <OpenCustomer openCustomer={openCustomer} params={params} />, width: 120, suppressExport: true },
        { cellRenderer: (params) => <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>, width: 120, suppressExport: true },
    ]);

    useEffect(() => getCustomers, [])

    const getCustomers = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', { method: 'GET' })
            .then(response => {
                console.log("GET CUSTOMERS ", response)
                return response.json()
            })
            .then(responseData => {
                console.log("RESPONSEDATA ", responseData._embedded.customers)
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

    const openCustomer = (url, openedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(openedCustomer)
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
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

    const getParams = () => {
        return {
            columnSeparator: ',',
            columnKeys: ['firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city']
        };
    };
    const onBtnExport = useCallback(() => {
        var params = getParams();
        if (gridRef.current) {
            gridRef.current.api.exportDataAsCsv(params);
        }
    }, []);

    return (
        <>
            <h1 style={{ font: "caption", fontSize: 30 }}>This is the Customer page</h1>
            <Button onClick={onBtnExport}>Download CSV export file</Button>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ width: 1500, height: 500 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={customer}
                    columnDefs={columnDefs}
                />
            </div>
        </>
    );


}