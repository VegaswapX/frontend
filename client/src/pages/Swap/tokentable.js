import { useTable } from "react-table";
import React, { useMemo, useEffect } from "react";
// import axios from 'axios';
// import xdata from "./data";
import tokens from "./Tokens";


function Table({ columns, data }) {
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

  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data    
  */
  const columns = useMemo(
    () => [
      {
        Header: "Token",
        // First group columns
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

//   const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
    //   const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
    //   setData(xdata);
    })();
  }, []);

  // console.log(tokens);


  

  return (
    <div className="App">
      <Table columns={columns} data={tokens} />
    </div>
  );
}

export default Tokentable;