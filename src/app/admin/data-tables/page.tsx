'use client';
import tableDataColumns from 'variables/data-tables/tableDataColumns';
import ColumnsTable from 'components/admin/data-tables/ColumnsTable';
import instance from 'config/axios.config';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import useApi from 'app/hooks/useApi';
import Pagination from 'components/pagination/Pagination';
// import { useGetPosts } from './api/user-1-10';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const Tables = () => {
  const api = useApi();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentLimit, setCurrentLimit] = React.useState(10);
  const [currentTableData, setCurrentTableData] = React.useState([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const createPageURL = (currentPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', currentPage.toString());
    console.log(`${pathname}?${params.toString()}`);
    replace(`${pathname}?${params.toString()}`);
  };
  function handleClick() {
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
    createPageURL(currentPage);
    console.log(searchParams.getAll('page'));
  }
  async function handlePage() {
    const res = await api.get(
      `user/all?page=${currentPage}&limit=${currentLimit}`,
    );
    setCurrentTableData(res.data.data.allUSer);
    console.log(currentPage, res, 'all user', res.data.data.allUSer);
  }
  useEffect(() => {
    handlePage();
  }, [currentPage]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mt-10" onClick={handleClick}>
        <ColumnsTable tableData={currentTableData} />
        <Pagination />
      </div>
    </QueryClientProvider>
  );
};

export default Tables;
