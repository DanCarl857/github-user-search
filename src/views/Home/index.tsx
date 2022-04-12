import { useState, useMemo } from 'react';
import { Form, Container, Alert } from 'react-bootstrap';
import debounce from 'lodash.debounce';

import './home.css';
import * as components from '../../components/UsersList';
import * as constants from '../../constants';
import { DataTypeFromApi } from '../../types';
import { getData } from '../../utils/getData';

export function Home() {
    const [data, setUsersData] = useState<DataTypeFromApi>();
    const [username, setUsername] = useState<string | null>(null);
    const [showMessage, setShowMessage] = useState(false);

    const debounceChangeHandler = useMemo(() => debounce((event: React.SyntheticEvent<EventTarget>) => {
        event.preventDefault();
        let value = (event.target as HTMLInputElement).value;
        getUsersData(value);
    }, 300), []);

    const getUsersData = async (username: string) => {
        if (!username) {
            setUsersData(undefined);
            return;
        }
        const data = await getData(constants.BASE_URL, username);
        if (Object.keys(data).length !== 0) {
            setUsername(username);
            setUsersData(data);
        } else {
            setUsersData(undefined);
            setShowMessage(true);
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
                {!showMessage
                    ? (data && username) && <components.UsersList data={data} username={username} /> 
                    : <Alert variant='info' className="info">
                        <p>This is a free api and so we can't make too many requests in a short period of time due to rate limiting 😉.</p>
                        <p>Reload the page and try again in a few seconds 🤗!!</p>
                    </Alert>}
            </Container>
            <div className="footer">
              <span className="footer-text">Built with &hearts; by Daniel Carlson</span>
            </div>
          </section>
        </div>
    )
};
