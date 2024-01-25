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
    </div>
  );
};

export default Tables;
