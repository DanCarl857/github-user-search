import { useState, useMemo } from 'react';
import { Form, Container } from 'react-bootstrap';
import debounce from 'lodash.debounce';
import axios from 'axios';

import './home.css';
import * as components from '../../components/UsersList';
import * as constants from '../../constants';
import { DataTypeFromApi } from '../../types';
import { getData } from '../../utils/getData';

export function Home() {
    const [data, setUsersData] = useState<DataTypeFromApi>();
    const [username, setUsername] = useState<string | null>(null);

    const debounceChangeHandler = useMemo(() => debounce((event: React.SyntheticEvent<EventTarget>) => {
        event.preventDefault();
        let value = (event.target as HTMLInputElement).value;
        getUsersData(value);
    }, 300), []);

    const getUsersData = async (username: string) => {
        const data = await getData(constants.BASE_URL, username);
        if (data) {
            setUsername(username);
            setUsersData(data);
        } else {
            setUsersData(undefined);
        }
    }

    return (
        <div className="main">
          <section className="home-container">
            <Container>
                <p>Github User Search</p>
                <Form className="form-username">
                    <Form.Group className="mb-3" controlId="githubUsername">
                    <Form.Label className="label">Search over 73+ million developers</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Search for a user"
                        onChange={debounceChangeHandler}
                    />
                    </Form.Group>
                </Form>
                <hr />
                {(data && username) && <components.UsersList data={data} username={username} />}
            </Container>
            <div className="footer">
              <span className="footer-text">Built with &hearts; by Daniel Carlson</span>
            </div>
          </section>
        </div>
    )
};
