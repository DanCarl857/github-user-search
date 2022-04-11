import React from 'react';

import { User } from '../User';
import { DataTypeFromApi, UserType } from '../../types';
import './usersList.css';
import { Pagination } from '../Pagintation';

type OwnProps = {
    data: DataTypeFromApi
};

type Props = OwnProps;

export function UsersList ({ data }: Props) {
    return (
        <>
            {data.items.length > 0 ? (
                <>
                    <Pagination
                        data={data.items as []}
                        RC={User}
                        title={'testing'}
                        pageLimit={5}
                        dataLimit={10}
                    />
                </>
            ) : (<h1>No users to display</h1>)}
        </>
    )
};
