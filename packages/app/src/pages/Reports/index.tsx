import { Student } from "@/pages/Reports/Student";
import {
  GroupingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  ExpandedState,
} from "@tanstack/react-table";

import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import { makeData } from "@/pages/Reports/makeData";
import { IonButton, IonIcon, IonText } from "@ionic/react";
import { chevronDown, chevronForward } from "ionicons/icons";
import { getReportData } from "@/pages/Reports/getData";

const activityColumn = {
  header: "Overall Summary",
  accessorKey: "activity",
  cell: ({ row, getValue }: {row: any, getValue: any}) => (
    <div>
      {row.getCanExpand() && (
        <button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: {
              cursor: "pointer",
              backgroundColor: "transparent",
            },
          }}
        >
          {row.getIsExpanded() ? (
            <IonIcon
              icon={chevronDown}
              style={{
                color: "black",
              }}
            />
          ) : (
            <IonIcon
              icon={chevronForward}
              style={{
                color: "black",
              }}
            />
          )}
        </button>
      )}{" "}
      {getValue()}
    </div>
  ),
};

const sampleColumns = [
  {
    header: "Overall Summary",
    accessorKey: "activity",
    cell: ({ row, getValue }: {row: any, getValue: any}) => (
      <div>
        {row.getCanExpand() && (
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer" },
            }}
          >
            {row.getIsExpanded() ? "👇" : "👉"}
          </button>
        )}{" "}
        {getValue()}
      </div>
    ),
  },
  {
    header: "Student A",
    columns: [
      {
        accessorKey: "studentA-activitiesCompleted",
        header: "✅ 50",
      },
      {
        accessorKey: "studentA-stars",
        header: "⭐️ 100",
      },
      {
        accessorKey: "studentA-hearts",
        header: "️💜 30",
      },
    ],
  },
  {
    header: "Student B",
    columns: [
      {
        accessorKey: "studentB-activitiesCompleted",
        header: "✅ 20",
      },
      {
        accessorKey: "studentB-stars",
        header: "⭐️ 150",
      },
      {
        accessorKey: "studentB-hearts",
        header: "️💜 80",
      },
    ],
  },
];

const sampleData = [
  {
    id: "1",
    activity: "Stories",
    "studentA-activitiesCompleted": 10,
    "studentA-stars": 20,
    "studentA-hearts": null,
    "studentB-activitiesCompleted": 10,
    "studentB-stars": 20,
    "studentB-hearts": null,
  },
  {
    id: "2",
    activity: "Play",
    "studentA-activitiesCompleted": 10,
    "studentA-stars": 20,
    "studentA-hearts": null,
    "studentB-activitiesCompleted": 10,
    "studentB-stars": 20,
    "studentB-hearts": null,
    subRows: [
      {
        id: "3",
        activity: "Story Factory - Pre Reader",
        "studentA-activitiesCompleted": 10,
        "studentA-stars": 20,
        "studentA-hearts": null,
        "studentB-activitiesCompleted": 10,
        "studentB-stars": 20,
        "studentB-hearts": null,
      },
      {
        id: "4",
        activity: "Story Factory - Early Reader",
        "studentA-activitiesCompleted": 10,
        "studentA-stars": 20,
        "studentA-hearts": null,
        "studentB-activitiesCompleted": 10,
        "studentB-stars": 20,
        "studentB-hearts": null,
      },
    ],
  },
];

const INITIAL_PAGE = 1;

const Reports = () => {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE);

  const TOTAL_ITEMS = 40;
  const PAGE_SIZE = 3;
  const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE);

  const { data, columns } = useMemo(() => makeData(TOTAL_ITEMS), [TOTAL_ITEMS]);

  const columnStartIndex = (pageNumber - 1) * PAGE_SIZE + 1;
  const columnEndIndex = columnStartIndex + PAGE_SIZE;

  const table = useReactTable({
    data,
    columns: [
      activityColumn,
      ...columns.slice(columnStartIndex, columnEndIndex),
    ],
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const isFirstPage = pageNumber === INITIAL_PAGE;
  const isLastPage = pageNumber === TOTAL_PAGES;

  const handlePageForward = () => {
    setPageNumber((prev) => Math.min(prev + 1, TOTAL_PAGES));
  };

  const handlePageBackward = () => {
    setPageNumber((prev) => Math.max(prev - 1, INITIAL_PAGE));
  };

  useEffect(() => {
    getReportData();
  }, []);

  return (
    <div id="reportsTable">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            const headers = headerGroup.headers;
            return (
              <tr key={headerGroup.id}>
                {headers.map((header, index) => {
                  const isHeartCellWithBorder =
                    header.id.endsWith("hearts") &&
                    index !== headers.length - 1;

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`${index === 0 ? "firstCell" : ""} ${
                        index === headers.length - 1 ? "lastCell" : ""
                      } ${
                        headerGroup.depth === 1 ? "overallSummaryCell" : ""
                      } ${
                        headerGroup.depth === 1 &&
                        (index === 0 || isHeartCellWithBorder)
                          ? "rightBorderCell"
                          : ""
                      }
                        `}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isSubRow = Boolean(row.parentId);
            const cells = row.getVisibleCells();

            return (
              <tr key={row.id}>
                {cells.map((cell, index) => {
                  const isHeartCell =
                    cell.id.endsWith("hearts") && index !== cells.length - 1;

                  return (
                    <td
                      key={cell.id}
                      className={`${isSubRow ? "subRow" : ""} ${
                        index === 0 ? "firstCell" : ""
                      } ${index === cells.length - 1 ? "lastCell" : ""} ${
                        index === 0 || isHeartCell ? "rightBorderCell" : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div id="footer">
        <span>
          {columnStartIndex} - {columnEndIndex - 1} of {TOTAL_ITEMS}
        </span>

        <div id="paginationButtonsContainer">
          <IonButton
            onClick={handlePageBackward}
            disabled={isFirstPage}
            size="small"
          >
            Previous
          </IonButton>

          <IonButton
            onClick={handlePageForward}
            disabled={isLastPage}
            size="small"
          >
            Next
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default Reports;
