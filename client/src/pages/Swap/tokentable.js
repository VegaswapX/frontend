import React, { useContext, useMemo } from "react";
import { useTable } from "react-table";
import { CurrencyContext } from "./index";
import tokens from "./Tokens";
import { store } from "../../redux/store";

function Table({ tokenType, columns, data }) {
  const { setcurrencyName } = useContext(CurrencyContext);
  // const { xmodal, xsetModal } = useContext(ModalContext);

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
    // console.log(row.original.contract)
    setcurrencyName(row.original.name);

    //console.log("rowClick >>>> " + tokenType);
    if (tokenType == "TokenIn"){
      store.dispatch({ type: "tokenIn/set", value: row.original.name });
    } else if (tokenType == "TokenOut"){
      store.dispatch({ type: "tokenOut/set", value: row.original.name });
    }
    
  }

  const getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      return {
        style: {
          // 'background-color': rowInfo.original.customercomplaints.order_ref === currentOrderId ? '' : 'yellow',
          "background-color": "yellow",
        },
      };
    }
    return {};
  };

  /*
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <table getTrProps={getTrProps} {...getTableProps()}>
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
            <tr
              style={{ height: "50px" }}
              {...row.getRowProps()}
              onClick={() => {
                rowClick(row);
              }}
            >
              {row.cells.map((cell) => {
                if (cell.column.Header === "Image") {
                  return (
                    <td
                      style={{ marginLeft: "30px", padding: "10px" }}
                      {...cell.getCellProps()}
                    >
                      <img src={cell.value} width={40} alt=">>" />
                    </td>
                  );
                } else {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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

function Tokentable({tokenType}) {
  
  const columns = useMemo(
    () => [
      {
        Header: "Token",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          // {
          //   Header: "Contract",
          //   accessor: "contract"
          // },
          {
            Header: "Image",
            accessor: "image",
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="App">
      <Table tokenType={tokenType} columns={columns} data={tokens} />
    </div>
  );
}

export default Tokentable;
