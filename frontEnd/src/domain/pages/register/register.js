import React,{useState} from 'react';
import { Link ,useHistory} from 'react-router-dom';
import { config } from '../../../common/utils/config';
import { fetchApi } from '../../../common/utils/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
toast.configure()
const Register = () => {
    const [state, setState] = useState({
        'username':'',
        'email':'',
        'password':''

    })
    const history = useHistory();
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
    let formData = new FormData();
    formData.append('request', 'insertUserFromApp')
    formData.append('signupUsername', state.username)
    formData.append('signupEmail', state.email)
    formData.append('signupPassword', state.password)
    Axios({
        method: 'post',
        url: config.HOST_NAME,
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        if(response.data.status=='success'){
            console.log(response,"response");
            history.push('/login');
        }else{
            toast.warning("UserName or Password Wrong",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            localStorage.removeItem('res_user');
        }

    })
    .catch(function (response) {
        toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        console.log(response)
    });
}else{
    toast.success("Please fill  username and password",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
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
                                    <h4 className="text-center mb-4">Sign up your account</h4>

                                        <div className="form-group">
                                            <label className="mb-1"><strong>Username</strong></label>
                                            <input type="text" className="form-control" placeholder="username" value={state.username} onChange={(e)=>onChange('username',e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-1"><strong>Email</strong></label>
                                            <input type="email" className="form-control" placeholder="hello@example.com" value={state.email} onChange={(e)=>onChange('email',e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-1"><strong>Password</strong></label>
                                            <input type="password" className="form-control" value="Password" value={state.password} onChange={(e)=>onChange('password',e.target.value)}/>
                                        </div>
                                        <div className="text-center mt-4">
                                            <button onClick={()=>registerHandle()} className="btn btn-primary btn-block">Sign me up</button>
                                        </div>

                                    <div className="new-account mt-3">
                                        <p>Already have an account? <Link className="text-primary" to="/">Sign in</Link></p>
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