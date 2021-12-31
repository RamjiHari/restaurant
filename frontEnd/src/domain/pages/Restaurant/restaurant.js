import Axios from 'axios';
import React,{useState,useEffect,useContext} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginContext from '../context/LoginContext';
import { Link , useHistory } from 'react-router-dom';
import { config } from '../../../common/utils/config';

const Restaurant = ({match}) => {
    const [item_image,set_item_image]=useState('')
    var edit_id = match.params.id ? match.params.id : ''
    const [loading, setLoading] = useState( false )
    const loginContext = useContext(LoginContext);
    const id = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';
    const [state, setstate] = useState({
        'id':'',
        "userId":id.id,
        'username':'',
        "email":'',
        "password":'',
    })
    const history = useHistory();
    useEffect(()=>{

        if(edit_id!=''){
        let formData = new FormData();
        let dateTime = new Date();
        formData.append('request', 'getRes')
        formData.append('editId', edit_id);
        Axios({
            method: 'post',
            url: config.HOST_NAME,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            console.log(`object`, response)
            if(response.data.status=='success'){
                setstate(response.data.data)
            }else{
                toast.warning("Something Wrong",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }

        })
        .catch(function (response) {
           toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        });
        }
    },[edit_id])

    const onChange=(key,val)=>{
        let updated = {
            ...state,
            [key]: val,
          };
          setstate(updated);
    }

    const saveResHandler = () =>{
        let formData = new FormData();
        let dateTime = new Date();
        formData.append('request', 'insertRestaurant')
        formData.append('id', state.id);
        formData.append('userId', id.id);
        formData.append('name',state.username);
        formData.append('email',state.email);
        formData.append('password', state.password);
        formData.append('dateTime', dateTime);
        console.log(`formData`, state)
        Axios({
            method: 'post',
            url: config.HOST_NAME,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            console.log(`object`, response)
            if(response.data.status=='success'){

                toast.warning("Add Successfully",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
                history.push('/restaurant');
            }else{
                toast.warning("Something Wrong",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }

        })
        .catch(function (response) {
           toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        });
    }
    return (
        <div class="content-body">
        <div class="container-fluid">
            <div class="row page-titles mx-0">
                <div class="col-sm-6 p-md-0">
                    <div class="welcome-text">
                        <h4>Hi, welcome back!</h4>
                    </div>
                </div>
                <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Restaurant</a></li>
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Add Restaurant</a></li>
                    </ol>
                </div>
            </div>
            <div class="row">
            <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Add Restaurant</h4>
                            </div>
                            <div class="card-body">

                                    <div>

                                        <section>
                                            <div class="row">
                                                <div class="col-lg-4 mb-2">
                                                    <div class="form-group">
                                                        <label class="text-label">Name*</label>
                                                        <input type="hidden" name="id" class="form-control" placeholder="Enter id" onChange={(val)=>onChange('id',val.target.value)} value={state.id}/>
                                                        <input type="text" name="title" class="form-control" placeholder="Enter Restaurant Name" onChange={(val)=>onChange('username',val.target.value)} value={state.username}/>
                                                    </div>
                                                </div>


                                                <div class="col-lg-4 mb-2">
                                                    <div class="form-group">
                                                        <label class="text-label">Email*</label>
                                                        <input type="text" name="email" class="form-control" placeholder="Enter Email" onChange={(val)=>onChange('email',val.target.value)} value={state.email}/>
                                                    </div>
                                                </div>

                                                <div class="col-lg-4 mb-3">
                                                    <div class="form-group">
                                                        <label class="text-label">Password*</label>
                                                        <input type="password" name="password" class="form-control" onChange={(val)=>onChange('password',val.target.value)} value={state.password}/>
                                                    </div>
                                                </div>



                                            </div>
                                            <button type="button" class="btn btn-primary mt-3" onClick={()=>saveResHandler()}>Submit</button>
                                        </section>
                                        </div>


                            </div>
                        </div>
                    </div>
        </div>
    </div>
    </div>
    );
}

export default Restaurant;