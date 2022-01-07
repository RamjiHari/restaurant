import Axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../../../common/utils/config';
import { useGetAllProductsQuery, useGetAllRestaurantQuery } from '../feature/productsApi';
toast.configure();
const Home = () => {
	const [state, setstate] = useState([])
	//const { data, error, isLoading } = useGetAllProductsQuery({'request':'getAllItems'});
	const userId = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
	: '';
	console.log(`userIduserIduserId`, userId)
	const { data, error, isLoading } = useGetAllRestaurantQuery({'request':'getAllRes','userId':userId.id,"privilege":userId.privilege});
	data && localStorage.setItem('max_order',data.data.max_order);


    return (
        <div class="content-body">
        <div class="container-fluid">
            <div class="form-head d-flex mb-3 align-items-start">
                <div class="mr-auto d-none d-lg-block">
                    <h2 class="text-black font-w600 mb-0">Restaurant</h2>
                </div>


            </div>
			<div class="row">



			{data && data.data.all_res.map(item=> 	<div key={item.id} class="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="new-arrival-product">
                                    <div class="new-arrivals-img-contnent">
                                       <Link to={`/restaurant/${item.username}`}>
									   <h4>{item.username}</h4>
									   </Link>
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

export default Home;