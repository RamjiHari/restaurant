import Axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../../../common/utils/config';
import { addToFav } from '../feature/itemSlice';
import { useGetAllProductsQuery, useGetAllRestaurantQuery } from '../feature/productsApi';
import { useDispatch, useSelector } from "react-redux";
toast.configure();
const ResItem = ({match}) => {
	const favItems =useSelector((state) => state.favItem);
	const dispatch = useDispatch();
    var id = match.params.id ? match.params.id : ''
    localStorage.setItem('last_res',id)
    const [state, setstate] = useState([])
	const userId = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';
    const { data, error, isLoading } = useGetAllProductsQuery({'request':'getAllItems',id:id});

	const addItemToFav = (id) =>{
		dispatch(addToFav(id));
		const ids= setInterval(() => {
			   if(userId!=''){
		let formData = new FormData();
        formData.append('request', 'addtoFav')
		formData.append('userId', userId.id)
        formData.append('favItems', localStorage.getItem("favresItems"))
        Axios({
            method: 'post',
            url:config.HOST_NAME,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {

            if(response.data.status=='success'){

            }else{

            }

        })
        .catch(function (response) {
            toast.warning("Server Prosssblem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            console.log(response)
        });
	   }
		// console.log(`JSON.parse(localStorage.getItem("res_user"))`, )
		clearInterval(ids);
		}, 3000)

	}

	// useEffect(() => {

	// 	const a=JSON.parse(localStorage.getItem("favresItems"))
	// 	dispatch(addToFav(a))

	// }, [])


	const findIndexVal=(id)=>{
		const index=JSON.parse(localStorage.getItem("favresItems")).findIndex((fitem)=>id==fitem)
		if(index>=0){
			return <i onClick={()=>addItemToFav(id)} class="fa fa-heart"></i>
		}else{
			return <i onClick={()=>addItemToFav(id)} class="fa fa-heart-o"></i>
		}
	}
    return (


		<div class="content-body">
        <div class="container-fluid">
            <div class="form-head d-flex mb-3 align-items-start">
                <div class="mr-auto d-none d-lg-block">
                    <h2 class="text-black font-w600 mb-0">Restaurants</h2>
                </div>


            </div>
			<div class="row">



			{data && data.data.map((item,index)=>	<div key={item.id} class="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="new-arrival-product">
                                    <div class="new-arrivals-img-contnent">
                                       <Link to={`/items/${item.id}`}>
									   <img class="img-fluid"src={`${config.FILE_PATH}/${item.image}`}  alt=""/>
									   </Link>
                                    </div>
                                    <div class="new-arrival-content text-center mt-3">
                                        <h4>{item.title}</h4>
                                        <ul class="star-rating">
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star"></i></li>
                                            <li><i class="fa fa-star-half-empty"></i></li>
                                            <li><i class="fa fa-star-half-empty"></i></li>
                                        </ul>
                                        <span class="price">${item.price}

												{ userId!='' ?localStorage.getItem("favresItems") !=undefined ? findIndexVal(item.id)
												:
												<i onClick={()=>addItemToFav(item.id)} class="fa fa-heart-o"></i>:
												<Link to={`/login`}><i  class="fa fa-heart-o"></i></Link>
												}

										</span>

                                    </div>
                                </div>
                            </div>
                        </div>
						</div>)
			}
			</div>
            <div class="row" style={{height:300}}>


                </div>
            </div>
            </div>

    );
}

export default ResItem;