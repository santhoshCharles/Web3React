import React from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle/PageTitle';

const Error = () => {
    return <>
        <PageTitle title="Error" />
        <div className="pt-80 pb-80 min-height-50vh">
            <Container>
                <div className="text-center">
                    <div className="f100-700 pb-3">404</div>
                    <div className="p1 pb-3">OOPS! Something went wrong here</div>
                    <Link to="/" className="btn btn-blue px-4">Back to Home</Link>
                </div>
            </Container>
        </div>
    </>
}

export default Error;
