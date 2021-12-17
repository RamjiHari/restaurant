import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../../common/utils/config';
import { fetchApi } from '../../../common/utils/Api';
const Login = () => {
    const [state, setState] = useState({
        'email':'',
        'password':''

    })
    const [loading, setLoading] = useState( false )

    const onChange=(key,val)=>{
        let updated = {
            ...state,
            [key]: val,
          };
        setState(updated);
    }

    const loginHandle =async () =>{

            setLoading(true)
            const reqData = state
            const response = await fetchApi( config.HOST_NAME, {...reqData,'request':'loginUser'} )
            if ( response.status == 'success' ) {
                console.log(`response.data`, response)
            setLoading(false)
            }else{
                console.log(`response.data`, response)
            }
    }
    return (
        <div className="authincation h-100">
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                    <div className="authincation-content">
                        <div className="row no-gutters">
                            <div className="col-xl-12">
                                <div className="auth-form">
                                    <h4 className="text-center mb-4">Sign in your account</h4>
                                        <div className="form-group">
                                            <label className="mb-1"><strong>Email</strong></label>
                                            <input type="email" className="form-control" value={state.email} onChange={(e)=>onChange('email',e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-1"><strong>Password</strong></label>
                                            <input type="password" className="form-control" value={state.password} onChange={(e)=>onChange('password',e.target.value)}/>
                                        </div>
                                        <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                            <div className="form-group">
                                               <div className="custom-control custom-checkbox ml-1">
													{/* <input type="checkbox" className="custom-control-input" id="basic_checkbox_1"/>
													<label className="custom-control-label" for="basic_checkbox_1">Remember my preference</label> */}
												</div>
                                            </div>
                                            <div className="form-group">
                                                {/* <a href="page-forgot-password.html">Forgot Password?</a> */}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button  onClick={()=>loginHandle()} className="btn btn-primary btn-block">Sign Me In</button>
                                        </div>
                                    <div className="new-account mt-3">
                                        <p>Don't have an account? <Link className="text-primary" to="./register">Sign up</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Login;