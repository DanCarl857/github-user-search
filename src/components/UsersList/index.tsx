import { useEffect, useState } from 'react';
import axios from 'axios';

import { User } from '../User';
import { DataTypeFromApi, UserType } from '../../types';
import './usersList.css';
import { Pagination } from '../Pagination';
import * as constants from '../../constants';

type OwnProps = {
    data: DataTypeFromApi;
    username: string;
};

type Props = OwnProps;

export function UsersList ({ data, username }: Props) {
    const [users, setUsers] = useState<UserType[]>([]);
    const [currentUsers, setCurrentUsers] = useState<UserType[]>([]);

    useEffect(() => {
        console.log(data.items);
        setUsers(data.items);
        setCurrentUsers(data.items);
    }, [data.items]);

    const onPageChanged = async (currentPage: number, pageLimit: number) => {
        try {
            let response = await axios.get(`${constants.BASE_URL}?q=${username}&page=${currentPage}&limit=${pageLimit}`);
            response.data && setCurrentUsers(response.data.items);
        } catch (err) {
            console.log('[GITHUB APP]: No users found with that username');
            // When no user is found, nothing should be showing on the users list
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
            <ul>
                {currentUsers.map((user) => {
                    return (
                        <li className="user-container">
                            <User user={user} />
                        </li>
                    )
                })}
            </ul>
        </>
    )
};
