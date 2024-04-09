import React from "react";
import { PencilSimpleIcon, PlusIcon, SortAscendingIcon } from "../../assets/icons";
import ButtonLoader from "../Loaders/buttonLoader";
import { Button, Title } from "../atomics";




const TableComponent = ({
  data,
  headers,
  title,
  isLoading,
  isAdd = false,
  onAdd,
  addButtonLabel
}) => {
  const convertToCSV = () => {
    if (!data) return;

    const csv = [
      headers.map((header) => header.label).join(","),
      ...data.map((item) =>
        headers.map((header) => item[header.key] ?? "").join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const renderCell = (rowData, header) => {
    if (header.renderCell) {
      return header.renderCell(rowData);
    }
    return rowData[header.key];
  };

  return (
    <>
      <div className="relative p-6 space-y-6">
        <section className="relativ min-h-screen p-6 bg-white rounded-lg">
          <nav className="flex items-center justify-between mb-8">
            <Title size="sm" variant="default" className="text-netral-25">
              {title}
            </Title>
            <div className="flex gap-2 items-center">
              <Button size="sm" variant="primary-bg" onClick={convertToCSV}>
                Export CSV
                <SortAscendingIcon className="w-4 h-4 stroke-2" />
              </Button>
              {isAdd && (
                <Button size="sm" variant="default-bg"  className="bg-netral-25" onClick={onAdd}>
                  {addButtonLabel}
                  <PlusIcon className="w-4 h-4 stroke-2" />
                </Button>
              )}
            </div>
          </nav>
          <div className="flex justify-end mb-6">
            <input
              type="text"
              autoComplete="email"
              required
              placeholder="Search Here"
              className="w-72 px-4 py-2 rounded-md border border-gray-300 shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-netral-25 sm:text-sm"
            />
          </div>
     <div className="w-[1000px]">
     <div className="overflow-x-auto">
            <table
              className={`w-full table-auto ${isLoading ? "h-[400px]" : ""}`}
            >
              <thead className="font-semibold text-left bg-netral-15  w-[400px]">
                <tr>
                  {headers?.map((header) => (
                    <th
                      key={header.key}
                      className={`px-4 py-3 whitespace-nowrap`}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-netral-20">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={headers.length}
                      className="px-4 py-4 text-center"
                    >
                      <div className="relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <ButtonLoader />
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {headers.map((header) => (
                        <td key={header.key} className="px-4 py-4 ">
                          {header.renderCell
                            ? renderCell(item, header)
                            : item[header.key]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
     </div>
        </section>
      </div>
    </>
  );
};

export default TableComponent;