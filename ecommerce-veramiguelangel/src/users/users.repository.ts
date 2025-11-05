/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};
const users: User[] = [
  {
    id: 'user-001',
    email: 'leonardo.dicaprio@hollywood.com',
    name: 'Leonardo DiCaprio',
    password: 'leoTitanic1997!',
    address: 'Hollywood Blvd 123',
    phone: '+1 310 555 0101',
    country: 'USA',
    city: 'Los Angeles',
  },
  {
    id: 'user-002',
    email: 'scarlett.johansson@marvel.com',
    name: 'Scarlett Johansson',
    password: 'blackWidow2021',
    address: 'Sunset Ave 456',
    phone: '+1 212 555 0202',
    country: 'USA',
    city: 'New York',
  },
  {
    id: 'user-003',
    email: 'will.smith@freshprince.com',
    name: 'Will Smith',
    password: 'willPower2022',
    address: 'Bel-Air Mansion',
    phone: '+1 310 555 0303',
    country: 'USA',
    city: 'Los Angeles',
  },
  {
    id: 'user-004',
    email: 'penelope.cruz@cine.es',
    name: 'Penélope Cruz',
    password: 'penelopeMadrid88',
    address: 'Calle Gran Vía 789',
    phone: '+34 91 555 0404',
    country: 'España',
    city: 'Madrid',
  },
  {
    id: 'user-005',
    email: 'tom.hanks@hollywood.com',
    name: 'Tom Hanks',
    password: 'forrestGump1994',
    address: 'Pacific Coast Hwy 321',
    phone: '+1 310 555 0505',
    country: 'USA',
    city: 'Santa Monica',
  },
  {
    id: 'user-006',
    email: 'salma.hayek@cine.mx',
    name: 'Salma Hayek',
    password: 'salmaFrida2002',
    address: 'Av. Reforma 101',
    phone: '+52 55 5555 0606',
    country: 'México',
    city: 'Ciudad de México',
  },
  {
    id: 'user-007',
    email: 'daniel.radcliffe@hogwarts.uk',
    name: 'Daniel Radcliffe',
    password: 'harryPotter2001',
    address: 'Privet Drive 4',
    phone: '+44 20 7946 0707',
    country: 'UK',
    city: 'London',
  },
  {
    id: 'user-008',
    email: 'meryl.streep@oscars.com',
    name: 'Meryl Streep',
    password: 'merylQueen2023',
    address: 'Broadway 555',
    phone: '+1 212 555 0808',
    country: 'USA',
    city: 'New York',
  },
  {
    id: 'user-009',
    email: 'gael.garcia@cine.mx',
    name: 'Gael García Bernal',
    password: 'gaelYTuMama2001',
    address: 'Av. Insurgentes Sur 999',
    phone: '+52 55 5555 0909',
    country: 'México',
    city: 'Ciudad de México',
  },
  {
    id: 'user-010',
    email: 'cate.blanchett@australia.au',
    name: 'Cate Blanchett',
    password: 'cateBlueJasmine2013',
    address: 'Sydney Harbour 77',
    phone: '+61 2 5555 1010',
    country: 'Australia',
    city: 'Sydney',
  },
];

@Injectable()
export class UsersRepository {
  getUsers(page: number, limit: number): Omit<User, 'password'>[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    const userList = users.slice(start, end);
    return userList.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  getUser(id: string) {
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) return `No se encontró al usuario con id: ${id}`;

    const { password, ...userNoPassword } = foundUser;
    return userNoPassword;
  }

  addUser(user: User) {
    users.push({ ...user, id: user.email });
    return user.email;
  }

  updateUser(id: string, userNewdata: any): string {
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) return `No se encontró al usuario con id: ${id}`;
    Object.assign(foundUser, userNewdata);
    return id;
  }

  deleteUser(id: string): string {
    const foundIndex = users.findIndex((user) => user.id === id); //* index || -1
    if (foundIndex === -1) return `No se encontró al usuario con id: ${id}`;
    users.splice(foundIndex, 1);
    return id;
  }

  getUserByEmail(email: string) {
    return users.find((user) => user.email === email);
  }
}
