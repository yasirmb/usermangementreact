import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "../../axios/axios";
import EditUserModal from "./EditUserModal";

export default function AdminUserTable({ users, fetch }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const customers = users;

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    email: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  const ImageBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt="no profile"
          src={rowData.image}
          style={{ width: "60px", borderRadius: "10px" }}
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    const color = rowData.status ? "green" : "red";
    return <div style={{ color }}>{rowData.status}</div>;
  };

  const deleteUser = async (data) => {
    const userId = data._id;
    console.log(userId, "delete user data");
    await axios.delete("/admin/deleteuser?id=" + userId).then((res) => {
      console.log(res, "response after deletion");
      if (res.data.status === true) {
        fetch();
      }
    });
  };
  const changeStatus=async(data)=>{
    const userId=data._id;
    await axios.patch('/admin/changestatus?id='+userId).then((res)=>{
       console.log(res.data,'response after status change');
       fetch();
    })
  }

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={value || ""}
          onChange={(e) => onGlobalFilterChange(e)}
          placeholder="Global Search"
        />
      </span>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={customers}
        paginator
        rows={5}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedCustomer}
        onSelectionChange={(e) => setSelectedCustomer(e.value)}
        selectionMode="single"
        dataKey="id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No customers found."
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="userName"
          header="Name"
          sortable
          filterPlaceholder="Search"
          bodyStyle={{ color: "gray", fontWeight: " bold" }}
          style={{ width: "25%" }}
        ></Column>
        <Column
          header="image"
          body={ImageBodyTemplate}
          sortable
          style={{ width: "25%" }}
        ></Column>

        <Column
          field="status"
          header="Status"
          sortable
          style={{ width: "25%" }}
          bodyStyle={statusBodyTemplate}
        ></Column>
        <Column
          field="email"
          header="Email"
          sortable
          style={{ width: "25%" }}
          bodyStyle={{ color: "gray", fontWeight: " bold" }}
        ></Column>
        <Column
          field="phone"
          header="Phone"
          sortable
          style={{ width: "25%" }}
          bodyStyle={{ color: "gray", fontWeight: " bold" }}
        ></Column>
        <Column
          header="Delete"
          style={{ width: "25%" }}
          body={(rowData) => (
            <Button  style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }} onClick={() => deleteUser(rowData)}>Delete</Button>
          )}
        ></Column>
        <Column
          header="Edit"
          style={{ width: "25%" }}
          body={(rowData) => <EditUserModal rowData={rowData} fetch={fetch} />}
        ></Column>
         <Column
          header="Block/Unblock"
          style={{ width: "25%" }}
          body={(rowData) =>(rowData.status?<Button  style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }} onClick={()=>changeStatus(rowData)} >Block</Button>:<Button  style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }} onClick={()=>changeStatus(rowData)} >UnBlock</Button>) }
        ></Column>
      </DataTable>
    </div>
  );
}
