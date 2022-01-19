import Axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../../../common/utils/config';

const Campaign = () => {
    const [state, setstate] = useState([])
    const id = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : "";
    useEffect(() => {
        let formData = new FormData();
        formData.append('request', 'getAllCampaign')
        formData.append('id', id.id)
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
                //toast.warning("Something Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }

        })
        .catch(function (response) {
            toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        });
    }, [])
 const handleDelete = (id) => {
    let formData = new FormData();
    formData.append('request', 'deleteCampaign')
    formData.append('id', id)
    Axios({
        method: 'post',
        url: config.HOST_NAME,
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        if(response.data.status=='success'){
            toast.warning("Deleted Successfully",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            setstate(response.data.data)
        }else{
            setstate([])
            //toast.warning("Something Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
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

            </div>
            <div class="row">
            <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">All Campaign Type</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-responsive-md">

                                            <thead>
                                            <tr>

                                                <th><strong>S.No</strong></th>
                                                <th><strong>Name</strong></th>
                                                <th><strong>Percentage</strong></th>
                                                <th><strong>Start Date</strong></th>
                                                <th><strong>End Date</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            state.map(item=>
                                            <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.camp_name}</td>
                                            <td>{item.percentage}</td>
                                            <td>{item.start_date}</td>
                                            <td>{item.end_date}</td>


                                                    <td>
													<div class="d-flex">
														<Link  to={`/editCampaign/${item.id}`} class="btn btn-primary shadow btn-xs sharp mr-1"><i class="fa fa-pencil"></i></Link>
														<a  onClick={()=>handleDelete(item.id)}  class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
													</div>
												</td>
                                            </tr>
                                            )}



                                        </tbody>



                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
    </div>
    );
}

export default Campaign;