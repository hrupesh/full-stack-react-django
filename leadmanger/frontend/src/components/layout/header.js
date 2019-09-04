import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import  {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

export class Header extends Component {
    static proptypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }
    
    render() {

        const {isAuthenticated,user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <span className="nav-text mr-5 ml-auto mt-auto mb-auto">
                    <strong>
                    { isAuthenticated ? "Welcome  "+this.props.auth.user.username : "Guest"}
                    </strong>
                </span>
                <li className="nav-item">
                    <button onClick={this.props.logout} className="nav-link btn btn-info pl-4 pr-4 text-light"  >Logout</button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item d-inline-block">
                    <Link to="/register" className="nav-link text-info">Register</Link>
                </li>
                <li className="nav-item d-inline-block">
                    <Link to="/login" className="nav-link text-info">Login</Link>  
                </li>
            </ul>
        );
        console.log(isAuthenticated)
        console.log(user)
        
        return (
            <nav className="navbar navbar-expand-lg text-primary navbar-light bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand text-danger" href="#">Lead Manager</a>
                { isAuthenticated ?  authLinks :  guestLinks   }
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
