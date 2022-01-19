import Axios from 'axios';
import React,{useState,useEffect,useContext} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginContext from '../context/LoginContext';
import { Link , useHistory } from 'react-router-dom';
import { config } from '../../../common/utils/config';

const AddCategory = ({match}) => {
    var edit_id = match.params.id ? match.params.id : ''
    const [loading, setLoading] = useState( false )
    const loginContext = useContext(LoginContext);
    const id = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';
    const [state, setstate] = useState({
        'id':'',
        "catg_name":'',
    })
    const history = useHistory();
    useEffect(()=>{

        if(edit_id!=''){
        let formData = new FormData();
        formData.append('request', 'getCategory')
        formData.append('editId', edit_id);
        Axios({
            method: 'post',
            url: config.HOST_NAME,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
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

    const saveHandler = () =>{
        let formData = new FormData();
        formData.append('request', 'insertCategory')
        formData.append('id', state.id);
        formData.append('catg_name',state.catg_name);

        Axios({
            method: 'post',
            url: config.HOST_NAME,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {

            if(response.data.status=='success'){

                toast.warning("Add Successfully",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
                history.push('/category');
            }else{
                //toast.warning("Something Wrong",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }

        })
        .catch(function (response) {
           //toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
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
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Category</a></li>
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Add Category</a></li>
                    </ol>
                </div>
            </div>
            <div class="row">
            <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Add Category</h4>
                            </div>
                            <div class="card-body">

                                    <div>

                                        <section>
                                            <div class="row">
                                                <div class="col-lg-4 mb-2">
                                                    <div class="form-group">
                                                        <label class="text-label">Name*</label>
                                                        <input type="hidden" name="id" class="form-control" placeholder="Enter id" onChange={(val)=>onChange('id',val.target.value)} value={state.id}/>
                                                        <input type="text" name="title" class="form-control" placeholder="Enter Category Name" onChange={(val)=>onChange('catg_name',val.target.value)} value={state.catg_name}/>
                                                    </div>
                                                </div>





                                            </div>
                                            <button type="button" class="btn btn-primary mt-3" onClick={()=>saveHandler()}>Submit</button>
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

export default AddCategory;