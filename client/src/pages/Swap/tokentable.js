import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import { tokens } from "../../chain/tokens.js";
import { store } from "../../redux/store";

function Table({ tokenSelect, columns, data }) {
  // selecting in or out?
  let selecting = store.getState().uiReducer.tokenSelect;

  const [hoveredRow, setHoveredRow] = useState(null);

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps,
    getTableBodyProps,
    // headerGroups, // headerGroups, if your table has groupings
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  function rowClick(row) {
    console.log("rowClick >>>> " + selecting);
    if (selecting == "tokenIn") {
      store.dispatch({ type: "tokenIn/set", value: row.original.symbol });
    } else if (selecting == "tokenOut") {
      console.log("dispatch >>>> " + row.original.symbol);
      store.dispatch({ type: "tokenOut/set", value: row.original.symbol });
    }

    store.dispatch({ type: "ui/togglemodal" });
    // row.selected = !row.selected;
  }

  const getTrProps = (state, rowInfo, instance) => {
    console.log("rowInfo" + rowInfo);

    // if (rowInfo) {
    //   return {
    //     onMouseEnter: (e) => {
    //       console.log("onMouseEnter")
    //       setHoveredRow(rowInfo.index)
    //     },
    //     style: {
    //       // 'background-color': rowInfo.original.customercomplaints.order_ref === currentOrderId ? '' : 'yellow',
    //       //"background-color": "yellow",
    //       background: rowInfo.index === hoveredRow ? '#efefef' : 'white'
    //     },
    //   };
    // }
    return {};
  };

  /*
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    // getTrProps={getTrProps}
    <table {...getTableProps()}>
      {
        /* <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead> */
      }
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          console.log(">> " + row);
          prepareRow(row);
          // row.onMouseEnter = function(){
          //   console.log("enter")
          // }
          return (
            <tr
              {...row.getRowProps()}
              onClick={() => {
                rowClick(row);
              }}
            >
              {row.cells.map((cell) => {
                if (cell.column.Header === "Image") {
                  return (
                    <td
                      style={{ marginLeft: "50px", padding: "10px" }}
                      {...cell.getCellProps()}
                    >
                      <img src={cell.value} width={40} alt=">>" />
                    </td>
                  );
                } else if (cell.column.Header === "Address") {
                  return <></>;
                } else if (cell.column.Header === "Symbol") {
                  return (
                    <td
                      style={{ marginLeft: "50px", padding: "10px" }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
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

function Tokentable({ tokenSelect }) {
  const columns = useMemo(
    () => [
      {
        Header: "Token",
        columns: [
          // {
          //   Header: "Contract",
          //   accessor: "contract"
          // },
          {
            Header: "Image",
            accessor: "image",
          },
          {
            Header: "Symbol",
            accessor: "symbol",
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Address",
            accessor: "contract",
          },
        ],
      },
    ],
    [],
  );

  return (
    <div className="App">
      <Table tokenSelect={tokenSelect} columns={columns} data={tokens} />
    </div>
  );
}

export default Tokentable;
