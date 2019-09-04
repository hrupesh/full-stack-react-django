import React , { Fragment } from 'react';
import Leads from './Leads';
import Form from './Form';

export default function Dashboard() {
  return (
    <Fragment>
      <div className="row container">
        <Form />
        <Leads  />
      </div>
    </Fragment>
  )
}
