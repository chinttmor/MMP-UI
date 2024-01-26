import { Role } from 'constants/Enum/role.enum';

type RowObj = {
  name: string;
  email: string;
  phone: string;
  zone: Role;
};

const tableDataColumns: RowObj[] = [
  {
    name: 'Norrrby',
    email: 'nwitherbyo@indiatimes.com',
    phone: '5029918214',
    zone: Role.STUDENT,
  },

  {
    name: 'Tobias Hafner',
    email: 'thafnerp@businessweek.com',
    phone: '3825825189',
    zone: Role.STUDENT,
  },

  {
    name: 'Jeramie Dodwell',
    email: 'jdodwellq@europa.eu',
    phone: '6345837468',
    zone: Role.STUDENT,
  },

  {
    name: 'Alleen Ramelot',
    email: 'aramelotr@addtoany.com',
    phone: '9729302810',
    zone: Role.STUDENT,
  },

  {
    name: 'Calvin Curtois',
    email: 'ccurtoiss@geocities.com',
    phone: '6134157231',
    zone: Role.STUDENT,
  },

  {
    name: 'Erv Eyre',
    email: 'eeyret@bravesites.com',
    phone: '9429793219',
    zone: Role.STUDENT,
  },

  {
    name: 'Bernadine Stoffer',
    email: 'bstofferu@forbes.com',
    phone: '6369510619',
    zone: Role.STUDENT,
  },

  {
    name: 'Darcy Clinnick',
    email: 'dclinnickv@cornell.edu',
    phone: '7407628405',
    zone: Role.STUDENT,
  },

  {
    name: 'Nanice Newall',
    email: 'nnewallw@netvibes.com',
    phone: '2857995250',
    zone: Role.STUDENT,
  },

  {
    name: 'Tamiko Flockhart',
    email: 'tflockhartx@businesswire.com',
    phone: '2187961457',
    zone: Role.STUDENT,
  },
];

export default tableDataColumns;
