'use client';
import tableDataColumns from 'variables/data-tables/tableDataColumns';
import ColumnsTable from 'components/admin/data-tables/ColumnsTable';
import { toast } from 'react-toastify';
import useApi from 'app/hooks/useApi';

const Tables = () => {
  const api = useApi();
  const onSubmit = async () => {
    try {
      const res = await api.get('user/all?page=1&limit=10');
      return toast.success(`Data input is ok , sign in with your new account`);
    } catch {
      return toast.error(`Unknow errors`);
    }
  };
  return (
    <div className="mt-10">
      <ColumnsTable tableData={tableDataColumns} />
      {/* <button
        className="linear w-full rounded-xl bg-brand-500 bg-cyan-300 py-3 text-base font-medium text-white text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
        onClick={onSubmit}
      >
        Sign In
      </button> */}
    </div>
  );
};

export default Tables;
