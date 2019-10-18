import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectPage = (props) => (
    <Redirect to={`/library/`} />
)

export default RedirectPage