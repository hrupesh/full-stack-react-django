import React, { Component , Fragment } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads , deleteLead } from '../../actions/leads';

export class Leads extends Component {
  static propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getLeads();
  }

  render() {
    return (
      <Fragment>
            <div className="col-md-8 col-sm-12">
              <h1 className="mt-4 ml-4  text-info " > List of Leads : </h1>
              <table className="table table-striped table-responsive table-hover m-4 text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>  </th>
                  </tr>
                </thead>
                <tbody>
                  { this.props.leads.map(lead => (
                    <tr key={lead.id}>
                      <td>{lead.id}</td>
                      <td>{lead.name}</td>
                      <td>{lead.email}</td>
                      <td>{lead.message}</td>
                      <td><button onClick={this.props.deleteLead.bind(this,lead.id)} className="btn ml-4  btn-danger" >Delete</button></td>
                    </tr>
                  )) }
                </tbody>
              </table>
            </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
    leads: state.leads.leads
});

export default connect(mapStateToProps,{ getLeads , deleteLead })(Leads);
