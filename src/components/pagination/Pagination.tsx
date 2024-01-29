import useApi from 'app/hooks/useApi';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Pagination = () => {
  const api = useApi();
  const handleClick = async () => {
    // const res = await api.get('user/all?page=1&limit=10');
    // console.log(res);
  };
  return <div onClick={handleClick}> Click meeee</div>;
};
export default Pagination;
