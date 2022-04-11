import React from 'react';
import { Card } from 'react-bootstrap';

import { UserType } from '../../types';
import './user.css';

type OwnProps = {
    user: UserType
}

type Props = OwnProps;

export function User ({ user }: Props) {
    return (
        <Card className="user-card">
            <img src={user.avatar_url} className="user-image" alt="user avatar" />
            <Card.Body className="user-content">
                <Card.Title>{user.login}</Card.Title>
                <Card.Text>{user.gists_url}</Card.Text>
            </Card.Body>
        </Card>
    )
}