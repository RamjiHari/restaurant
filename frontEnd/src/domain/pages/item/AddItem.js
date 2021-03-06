import Axios from 'axios';
import React,{useState,useEffect,useContext} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginContext from '../context/LoginContext';
import { Link , useHistory } from 'react-router-dom';
import { config } from '../../../common/utils/config';
toast.configure();
const AddItem = ({match}) => {
    const [item_image,set_item_image]=useState('')
    var edit_id = match.params.id ? match.params.id : ''
    const [loading, setLoading] = useState( false )
    const loginContext = useContext(LoginContext);
    const [category, setCategory] = useState([])
    const id = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';
    const [state, setstate] = useState({
        'id':'',
        "userId":id.id,
        'image':'',
        "title":'',
        "category":'',
        "summary":'',
        "price":0,
        "max_qty":1
    })
    const history = useHistory();
    useEffect(()=>{

        if(edit_id!=''){
        let formData = new FormData();
        let dateTime = new Date();
        formData.append('request', 'getItem')
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
                if(response.data.data.image!=''){
                var preview = document.getElementById("file-ip-1-preview");
                preview.src = `${config.FILE_PATH}/${response.data.data.image}`;
                preview.style.display = "block";
                }
            }else{
                toast.warning("Something Wrong",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }

        })
        .catch(function (response) {
           toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        });
        }
    },[edit_id])
    useEffect(() => {
        let formData = new FormData();
        formData.append('request', 'getAllCategory')
        Axios({
            method: 'post',
            url: config.HOST_NAME,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {

            if(response.data.status=='success'){

                setCategory(response.data.data)
            }else{
                //toast.warning("Something Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
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

    const onFileChange =async( event,file,width,height) =>{
        const imageDimensions = true; // await checkDiamension(event,width,height);
        if(imageDimensions){
          var files = event.target.files;
        if(file=='item_image'){
            set_item_image(files[0])
          if(event.target.files.length > 0){
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = document.getElementById("file-ip-1-preview");
            preview.src = src;
            preview.style.display = "block";
        }
        }else{
            set_item_image('')
        }

        }else{
          alert("Please upload valid size")
        }
      }
    const saveItemHandler = () =>{
        let formData = new FormData();
        let dateTime = new Date();
        formData.append('request', 'insertItems')
        formData.append('id', state.id);
        formData.append('userId', id.id);
        formData.append('item_image',item_image);
        formData.append('image',state.image);
        formData.append('title', state.title);
        formData.append('price', state.price);
        formData.append('summary', state.summary);
        formData.append('dateTime', dateTime);
        formData.append('qty', state.max_qty);
        formData.append('category', state.category);
        Axios({
            method: 'post',
            url: config.HOST_NAME,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {

            if(response.data.status=='success'){

                toast.info("Item Add Successfully",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
                history.push('/item');
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
                                <h4 class="card-title">Add Item</h4>
                            </div>
                            <div class="card-body">

                                    <div>

                                        <section>
                                            <div class="row">
                                                <div class="col-lg-3 mb-2">
                                                    <div class="form-group">
                                                        <label class="text-label">Title*</label>
                                                        <input type="hidden" name="id" class="form-control" placeholder="Enter id" onChange={(val)=>onChange('id',val.target.value)} value={state.id}/>
                                                        <input type="text" name="title" class="form-control" placeholder="Enter Title" onChange={(val)=>onChange('title',val.target.value)} value={state.title}/>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 mb-2">
                                                    <div class="form-group">
                                                        <label class="text-label">Category*</label>
                                                        <select className="form-control" onChange={(val)=>onChange('category',val.target.value)}>
                                                        <option value=''>Select</option>
                {category.length > 0 && category.map((item) =>
                    <option value={item.id} selected={item.id==state.category ?true :false}>{item.catg_name}</option>
                 )}
            </select>
                                                    </div>
                                                </div>


                                                <div class="col-lg-3 mb-2">
                                                    <div class="form-group">
                                                        <label class="text-label">Price*</label>
                                                        <input type="number" name="price" class="form-control" placeholder="Enter Price" onChange={(val)=>onChange('price',val.target.value)} value={state.price}/>
                                                    </div>
                                                </div>


                                                <div class="col-lg-3 mb-3">
                                                    <div class="form-group">
                                                        <label class="text-label">Summary*</label>
                                                        <input type="text" name="summary" class="form-control" onChange={(val)=>onChange('summary',val.target.value)} value={state.summary}/>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 mb-2">
                                                    <div class="form-group">
                                                        <label class="text-label">Max Quantity*</label>
                                                        <input type="number" name="qty" class="form-control" placeholder="Enter Quantity" onChange={(val)=>onChange('max_qty',val.target.value)} value={state.qty}/>
                                                    </div>
                                                </div>

                                            <div class="col-lg-6 mb-2">
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                    <span class="input-group-text">Upload</span>
                                                </div>
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" onChange={(event)=>onFileChange(event,'item_image',10,10)}/>
                                                    <label class="custom-file-label">Choose file</label>
                                                </div>
                                                </div>
                                            </div>
                                           <div class="col-lg-6 mb-2">
                                                <img class="w-90 imgRoundcorner" id="file-ip-1-preview" width="100" height="100" />
                                            </div>


                                            </div>
                                            <button type="button" class="btn btn-primary mt-3" onClick={()=>saveItemHandler()}>Submit</button>
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

export default AddItem;