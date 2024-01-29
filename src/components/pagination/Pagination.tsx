import useApi from 'app/hooks/useApi';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Pagination = () => {
  const api = useApi();
  const handleClick = async () => {

  };
  return <div onClick={handleClick}> Click meeee</div>;
};
export default Pagination;
