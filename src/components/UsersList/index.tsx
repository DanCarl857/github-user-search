import { useEffect, useState } from 'react';

import { User } from '../User';
import { DataTypeFromApi, UserType } from '../../types';
import './usersList.css';
import { Pagination } from '../Pagination';
import * as constants from '../../constants';
import { getData } from '../../utils/getData';

type OwnProps = {
    data: DataTypeFromApi;
    username: string;
};

type Props = OwnProps;

export function UsersList ({ data, username }: Props) {
    const [, setUsers] = useState<UserType[]>([]);
    const [currentUsers, setCurrentUsers] = useState<UserType[]>([]);

    useEffect(() => {
        setUsers(data.items);
        setCurrentUsers(data.items);
    }, [data.items]);

    const onPageChanged = async (currentPage: number, pageLimit: number) => {
        let data = await getData(`${constants.BASE_URL}?q=${username}&page=${currentPage}&limit=${pageLimit}`, username);
        if (data) {
            setCurrentUsers(data.items);
        } else {
            setCurrentUsers([]);
        }
    }

    const totalUsers = data.total_count;
    if (totalUsers === 0) return null;

    return (
        <>
            <div className="header-container">
                <h3 className="header">{data.total_count} users found</h3>
                <Pagination
                    totalRecords={totalUsers}
                    pageLimit={30}
                    pageNeighbours={1}
                    onPageChanged={onPageChanged}
                />
            </div>
            <ul className="row">
                {currentUsers && currentUsers.map((user) => {
                    return (
                        <li key={user.id} className="col-4 user-container">
                            <User user={user} />
                        </li>
                    )
                })}
            </ul>
        </>
    )
};
