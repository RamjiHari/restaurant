import Axios from 'axios';
import React,{useState,useEffect,useContext} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link , useHistory } from 'react-router-dom';
import { config } from '../../../common/utils/config';
toast.configure();
const MaxOrder = () => {
    const id = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';
    const [state, setstate] = useState({
        'id':'',
        "userId":id.id,
        'maxOrder':1,
    })
    const history = useHistory();
    const saveMaxandler = () =>{
        let formData = new FormData();
        formData.append('request', 'insertMaxOrder')
        formData.append('id', state.id);
        formData.append('userId', state.userId);
        formData.append('maxOrder',state.maxOrder);
        Axios({
            method: 'post',
            url: config.HOST_NAME,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            console.log(`object`, response)
            if(response.data.status=='success'){
                toast.warning("Max order Add Successfully",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }else{
                toast.warning("Something Wrong",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }

        })
        .catch(function (response) {
           toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        });
    }

useEffect(() => {
    let formData = new FormData();
    formData.append('request', 'getMaxOrderItem')
    formData.append('userId', state.userId);
    Axios({
        method: 'post',
        url: config.HOST_NAME,
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        console.log(`object`, response)
        if(response.data.status=='success'){
            if(response.data.data!=undefined){
                onChange('maxOrder',response.data.data.maxOrder)
            }else{
                onChange('maxOrder',1)
            }

        }else{

        }

    })
    .catch(function (response) {
       toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
    });
}, [])

    const onChange=(key,val)=>{
        let updated = {
            ...state,
            [key]: val,
          };
          setstate(updated);
    }

    return (
        <div class="content-body">
        <div class="container-fluid">
            <div class="row page-titles mx-0">
                <div class="col-sm-6 p-md-0">
                    <div class="welcome-text">
                        <h4>Hi, welcome back!</h4>
                        <span>Datatable</span>
                    </div>
                </div>
                <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Items</a></li>
                        <li class="breadcrumb-item active"><a href="javascript:void(0)">Add Item</a></li>
                    </ol>
                </div>
            </div>
            <div class="row">
            <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Add Max Order</h4>
                            </div>
                            <div class="card-body">

                                    <div>

                                        <section>
                                            <div class="row">
                                                <div class="col-lg-3 mb-2">
                                                    <div class="form-group">
                                                        <label class="text-label">Max Order*</label>
                                                        <input type="hidden" name="id" class="form-control" placeholder="Enter id" onChange={(val)=>onChange('id',val.target.value)} value={state.id}/>
                                                        <input type="number" name="title" class="form-control" placeholder="Enter Maximum" onChange={(val)=>onChange('maxOrder',val.target.value)} value={state.maxOrder}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" class="btn btn-primary mt-3" onClick={()=>saveMaxandler()}>Submit</button>
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

export default MaxOrder;