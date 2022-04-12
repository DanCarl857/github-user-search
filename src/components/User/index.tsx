import React from 'react';
import { Card } from 'react-bootstrap';
import { IoIosPerson, IoIosApps, IoIosPeople, IoIosDesktop, IoIosStar, IoIosWalk } from 'react-icons/io';

import { UserType } from '../../types';
import * as constants from '../../constants';
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
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                <IoIosDesktop /> Profile
                            </a>
                        </Card.Text>
                        &nbsp;&nbsp;
                        <Card.Text>
                            <a href={`${constants.GITHUB_URL}/${user.login}?tab=stars`} target="_blank" rel="noopener noreferrer">
                                <IoIosStar /> Stars
                            </a>
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="footer">
                <Card.Text>
                    <a href={`${constants.GITHUB_URL}/${user.login}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                        <IoIosApps /> Repos
                    </a>
                </Card.Text>
                <Card.Text>
                    <a href={`${constants.GITHUB_URL}/${user.login}?tab=followers`} target="_blank" rel="noopener noreferrer">
                        <IoIosPeople /> Followers
                    </a>
                </Card.Text>
                <Card.Text>
                    <a href={`${constants.GITHUB_URL}/${user.login}?tab=following`} target="_blank" rel="noopener noreferrer">
                        <IoIosWalk /> Following
                    </a>
                </Card.Text>
            </Card.Footer>
        </Card>
    )
}