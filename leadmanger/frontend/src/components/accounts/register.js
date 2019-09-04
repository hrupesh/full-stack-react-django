import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux' 
import {PropTypes} from 'prop-types'
import {register} from '../../actions/auth'
import {Redirect} from 'react-router-dom'
import {createMessage} from '../../actions/messages'
import store from '../../store';
 
export class Register extends Component {
    static proptypes = {
        isAuthenticated: PropTypes.bool,
        register: PropTypes.func.isRequired
    }
    
    state = {
        username:'',
        email:'',
        password:'',
        password2:'',
    }

    onSubmit = e =>{
        e.preventDefault();
        const { username , email , password , password2 } = this.state;
        if(password !== password2){
            this.props.createMessage({passwordNotMatch:"Passwords Do Not Match!"})
        }
        else if(!(username && email && password && password2)){
            this.props.createMessage({passwordNotMatch:"All Fields are Required"})
        }
        else{
            const newUser = {
                username ,
                email , 
                password
            }
            this.props.register(newUser)
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]:e.target.value }) 
        }
    
    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/"  />
        }
        const {username , email, password , password2 } = this.state;
        return (
            <div className="col-md-6 m-auto text-warning">
                <div className="card card-body bg-dark text-warning mt-5">
                    <h2 className="text-center text-danger ">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group text-warning ">
                            <label>Username</label>
                            <input type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group text-warning">
                            <label>Email</label>
                            <input type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group text-warning">
                            <label>Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group text-warning">
                            <label>Confirm Password</label>
                            <input type="password"
                                className="form-control"
                                name="password2"
                                onChange={this.onChange}
                                value={password2}
                            />
                        </div>
                        <div className="from-group text-center" >
                            <button type="submit" className="btn btn-outline-danger m-auto mt-4  p-auto w-75">Register</button>
                        </div>
                        <p className="text-center text-light mt-4">
                            Already registered? <Link to="/login" className="text-danger">Login</Link>
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

export default connect(mapStateToProps,{register , createMessage})(Register);
