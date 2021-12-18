import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../../common/utils/config';
import { fetchApi } from '../../../common/utils/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const Register = () => {
    const [state, setState] = useState({
        'username':'',
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

    const registerHandle =async () =>{
if(state.email!='' && state.password!='' && state.username!=''){
            setLoading(true)
            const reqData = state
            const response = await fetchApi( config.HOST_NAME, {...reqData,'request':'insertUserFromApp'} )
            if ( response.status == 'success' ) {
                console.log(`response.data`, response)
            setLoading(false)
            }else{
                toast.warning(response,{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }
        }else{
            toast.success("Please fill all fields",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        }
    }
    return (
        <div class="authincation h-100">
        <div class="container h-100">
            <div class="row justify-content-center h-100 align-items-center">
                <div class="col-md-6">
                    <div class="authincation-content">
                        <div class="row no-gutters">
                            <div class="col-xl-12">
                                <div class="auth-form">
                                    <h4 class="text-center mb-4">Sign up your account</h4>

                                        <div class="form-group">
                                            <label class="mb-1"><strong>Username</strong></label>
                                            <input type="text" class="form-control" placeholder="username" value={state.username} onChange={(e)=>onChange('username',e.target.value)}/>
                                        </div>
                                        <div class="form-group">
                                            <label class="mb-1"><strong>Email</strong></label>
                                            <input type="email" class="form-control" placeholder="hello@example.com" value={state.email} onChange={(e)=>onChange('email',e.target.value)}/>
                                        </div>
                                        <div class="form-group">
                                            <label class="mb-1"><strong>Password</strong></label>
                                            <input type="password" class="form-control" value="Password" value={state.password} onChange={(e)=>onChange('password',e.target.value)}/>
                                        </div>
                                        <div class="text-center mt-4">
                                            <button onClick={()=>registerHandle()} class="btn btn-primary btn-block">Sign me up</button>
                                        </div>

                                    <div class="new-account mt-3">
                                        <p>Already have an account? <Link class="text-primary" to="/login">Sign in</Link></p>
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
export default Register;