'use client';
import React from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import Button from 'components/button/button';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

type RowObj = {
  name: [string, boolean];
  progress: string;
  quantity: number;
  date: string;
};

function ColumnsTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  let defaultData = tableData;
  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('progress', {
      id: 'progress',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PROGRESS
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('quantity', {
      id: 'quantity',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          QUANTITY
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ]; // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <div>
      <Card extra={'w-full pb-10 p-4 h-full'}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 ">
            4-Columns Table
          </div>
          <CardMenu />
        </header>

        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table className="h-full w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="!border-px !border-gray-400"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                      >
                        <div className="items-center justify-between text-xs text-gray-200">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: '',
                            desc: '',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 10)
                .map((row) => {
                  return (
                    <tr
                      style={{
                        height: '70px',
                      }}
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="min-w-[150px] border-white/0 py-3 pr-4 "
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
        </div>
        <div className="flex overflow-x-auto sm:justify-center"></div>
      </Card>
      <div className="mr-10 mt-3 grid justify-items-end">
        <nav aria-label="Page navigation example">
          <ul className="list-style-none flex">
            <li>
              <Button name="Previous" small={false} />
            </li>
            <li>
              <Button name="1" small={true} />
            </li>
            <li>
              <Button name="2" small={true} />
            </li>
            <li>
              <Button name="3" small={true} />
            </li>
            <li>
              <Button name="4" small={true} />
            </li>
            <li>
              <Button name="5" small={true} />
            </li>
            <li>
              <Button name="6" small={true} />
            </li>
            <li>
              <Button name="7" small={true} />
            </li>
            <li>
              <Button name="8" small={true} />
            </li>
            <li>
              <Button name="9" small={true} />
            </li>
            <li>
              <Button name="10" small={true} />
            </li>
            <li>
              <Button name="Next" small={false} />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ColumnsTable;
const columnHelper = createColumnHelper<RowObj>();
