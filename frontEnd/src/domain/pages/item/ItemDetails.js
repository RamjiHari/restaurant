import Axios from 'axios';
import React,{useState,useEffect,useContext} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginContext from '../context/LoginContext';
import { Link , useHistory } from 'react-router-dom';
import { config } from '../../../common/utils/config';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../feature/cartSlice';
import { useGetAllProductsQuery } from '../feature/productsApi';
toast.configure();
const ItemDetails = ({match}) => {
    const [item_image,set_item_image]=useState('')
    var edit_id = match.params.id ? match.params.id : ''
    const [loading, setLoading] = useState( false )
    const loginContext = useContext(LoginContext);
    const id = loginContext.userData==undefined?'': loginContext.userData.id;
    const { data, error, isLoading } = useGetAllProductsQuery({'request':'getItem','editId':edit_id});

    const [state, setstate] = useState({
        'id':'',
        "userId":id,
        'image':'',
        "title":'',
        "summary":'',
        "price":0,
    })
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const max_cart=Number(localStorage.getItem('max_order'))
    useEffect(()=>{

        if(edit_id!=''){
        let formData = new FormData();
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
           toast.warning("Servessr Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        });
        }
    },[edit_id])

 const handleAddToCart = (product) => {
if(cart.cartItems.length<max_cart){
    const itemIndex = cart.cartItems.findIndex(
        (item) => item.id === product.id
      );
      if(itemIndex>=0){
        if(cart.cartItems[itemIndex].cartQuantity<Number(cart.cartItems[itemIndex].max_qty)){
            dispatch(addToCart(product));
            history.push("/cart");
          }else{
            toast.info(`You can't select upto maximum quantity${cart.cartItems[itemIndex].cartQuantity}`, {
                position: "bottom-left",
              });
          }
      }else{
        dispatch(addToCart(product));
        history.push("/cart");
      }
}else{
    toast.info(`You can't order upto maximum ${max_cart}`, {
                    position: "bottom-left",
                  });
}
  };
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
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xl-3 ">

                                        <div class="tab-content">
                                            <div role="tabpanel" class="tab-pane fade show active" id="first">
                                                <img id="file-ip-1-preview" class="img-fluid" alt=""/>
                                            </div>
                                            <div role="tabpanel" class="tab-pane fade" id="second">

                                            </div>
                                            <div role="tabpanel" class="tab-pane fade" id="third">

                                            </div>
											<div role="tabpanel" class="tab-pane fade" id="for">

                                            </div>
                                        </div>
                                        <div class="tab-slide-content new-arrival-product mb-4 mb-xl-0">

                                            <ul class="nav slide-item-list mt-3" role="tablist">
                                                <li role="presentation" class="show">
                                                    <a href="#first" role="tab" data-toggle="tab">

                                                    </a>
                                                </li>
                                                <li role="presentation">
                                                    <a href="#second" role="tab" data-toggle="tab">

                                                    </a>
                                                </li>
                                                <li role="presentation">
                                                    <a href="#third" role="tab" data-toggle="tab">


                                                    </a>
                                                </li>
												<li role="presentation">
                                                    <a href="#for" role="tab" data-toggle="tab">

                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="col-xl-9 col-sm-12">
                                        <div class="product-detail-content">

                                            <div class="new-arrival-content pr">
                                                <h4>{state.title}</h4>
                                                <div class="star-rating mb-2">
                                                    <ul class="produtct-detail-tag">
                                                        <li><i class="fa fa-star"></i></li>
                                                        <li><i class="fa fa-star"></i></li>
                                                        <li><i class="fa fa-star"></i></li>
                                                        <li><i class="fa fa-star"></i></li>
                                                        <li><i class="fa fa-star"></i></li>
                                                    </ul>
                                                    <span class="review-text">(34 reviews) / </span><a class="product-review" href="#">Write a review?</a>
                                                </div>
                                                <p class="price">${state.price}</p>
                                                <p>Availability: <span class="item"> Yes <i
                                                            class="fa fa-shopping-basket"></i></span>
                                                </p>
                                                {/* <p>Product code: <span class="item">0405689</span> </p>
                                                <p>Brand: <span class="item">Lee</span></p> */}
                                                <p>Product tags:&nbsp;&nbsp;
                                                    <span class="badge badge-success light">food</span>
                                                    <span class="badge badge-success light">biryani</span>
                                                    <span class="badge badge-success light">chicken</span>

                                                </p>
                                                <p class="text-content">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                                                    If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing.</p>
												{/* <div class="col-2 px-0">
													<input type="number" name="num" class="form-control input-btn input-number" value="1"/>
												</div> */}

                                                <div class="shopping-cart mt-3">
                                                    <a class="btn btn-primary btn-lg"  onClick={() => handleAddToCart(state)}><i
                                                            class="fa fa-shopping-basket mr-2"></i>Add
                                                        to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
           </div>
    </div>
    </div>
    );
}

export default ItemDetails;