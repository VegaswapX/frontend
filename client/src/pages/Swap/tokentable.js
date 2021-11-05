import React from "react";
import { useTable } from "react-table";
import { arrayTokenList, TokenList } from "../../chain/tokens.js";
import { store } from "../../redux/store";

function Table({ tokenIndex, columns, data }) {
  // TODO: Fix tomorrow, some how 2 modals are opened at the same time
  // selecting in or out?
  // let selecting = store.getState().uiReducer.tokenSelect;

  //const [hoveredRow, setHoveredRow] = useState(null);

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

  function handleRowClick(row) {
    const { symbol } = row.original;
    store.dispatch({
      type: "swap/setToken",
      payload: {
        tokenIndex,
        symbol,
      },
    });

    store.dispatch({ type: "ui/toggleTokenSelector" });
    // row.selected = !row.selected;
  }

  /*
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  // TODO: Fix the key property
  return (
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
          prepareRow(row);
          // row.onMouseEnter = function(){
          //   console.log("enter")
          // }
          return (
            <tr
              className={"selecting-token-row"}
              key={i.toString()}
              {...row.getRowProps()}
              onClick={() => {
                handleRowClick(row);
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

const columnsConf = [
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
];

function Tokentable({ tokenIndex }) {
  const tokens = arrayTokenList(TokenList.BSC);

  // TODO: make TokenList.BSC to by chain variable later
  return (
    <div className="App" style={{marginLeft: "30%"}}>
      <Table tokenIndex={tokenIndex} columns={columnsConf} data={tokens} />
    </div>
  );
}

export default Tokentable;
