import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux' 
import {PropTypes} from 'prop-types'
import {login} from '../../actions/auth'
import {Redirect} from 'react-router-dom'

export class Login extends Component {
    state = {
        username:'',
        password:'',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated:PropTypes.bool
    }

    onSubmit = e =>{
        e.preventDefault();
        this.props.login(this.state.username,this.state.password);
    }

    onChange = e => this.setState({ [e.target.name]:e.target.value })
    
    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/"  />
        }
        const {username , password  } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body bg-dark mt-5">
                    <h2 className="text-center text-success ">Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />                            
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="from-group text-center" >
                            <button type="submit" className="btn btn-outline-success  mb-4 mt-4 w-75">Login</button>
                        </div>
                        <p>
                            Not Have an account?  <Link to="/register" className="text-success">Register Here</Link>
                        </p>

                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);
