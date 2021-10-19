import { useTable } from "react-table";
import React, { useMemo, useContext } from "react";
// import axios from 'axios';
// import xdata from "./data";
import tokens from "./Tokens";
import {UserContext, ModalContext} from './index'


function Table({ columns, data }) {

  const { userName, setUserName } = useContext(UserContext);
  // const { xmodal, xsetModal } = useContext(ModalContext);

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    // headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
  });

  function rowClick(row){
    // console.log(row.original.contract)
    console.log(row.original.name)
    setUserName(row.original.name)
    // xsetModal(false)
  }

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <table {...getTableProps()}>
      {/* <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead> */}
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            
            <tr {...row.getRowProps()} onClick={() => {
              rowClick(row);
            }}>
              {row.cells.map(cell => {                
                if (cell.column.Header === "Image"){
                  return (
                    <td {...cell.getCellProps()}>
                    <img
                      src={cell.value}
                      width={40}
                      alt=">>"
                    />
                    </td>)
                }
                else {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                }
              })}
              
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}



  

// import Table from "./Table";

function Tokentable() {

  
  
  const columns = useMemo(
    () => [
      {
        Header: "Token",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          // {
          //   Header: "Contract",
          //   accessor: "contract"
          // },
          {
            Header: "Image",
            accessor: "image"
          },          
        ]
      }
    ],
    []
  );
  

  return (
    <div className="App">
      <Table columns={columns} data={tokens} />
    </div>
  );
}

export default Tokentable;