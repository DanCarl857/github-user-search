import React from 'react';
import { Card } from 'react-bootstrap';
import { IoIosPerson, IoIosApps, IoIosPeople, IoIosDesktop } from 'react-icons/io';

import { UserType } from '../../types';
import './user.css';

type OwnProps = {
    user: UserType
}

type Props = OwnProps;

export function User ({ user }: Props) {
    return (
        <Card className="card-container">
            <Card.Body className="user-card">
                <img src={user.avatar_url} className="user-image" alt="user avatar" />
                <div className="content">
                    <Card.Title className="username"><IoIosPerson /> {user.login}</Card.Title>
                    <div className="content-container">
                        <Card.Text>
                            <IoIosDesktop /> Profile
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="footer">
                <Card.Text>
                    <IoIosApps /> Repos
                </Card.Text>
                <Card.Text>
                    <IoIosPeople /> Followers
                </Card.Text>
            </Card.Footer>
        </Card>
    )
}