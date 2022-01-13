import Axios from 'axios';
import React,{useState,useEffect,} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../../../common/utils/config';
import { useGetAllProductsQuery, useGetAllRestaurantQuery } from '../feature/productsApi';
import { addResName } from '../feature/restaurantSlice';
import { useDispatch, useSelector } from "react-redux";
toast.configure();
const Home = () => {
	const [state, setstate] = useState([])
	//const { data, error, isLoading } = useGetAllProductsQuery({'request':'getAllItems'});
	const userId = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';
    const dispatch = useDispatch();
	console.log(`userIduserIduserId`, userId)
    const { data, error, isLoading } = useGetAllRestaurantQuery({'request':'getAllRes','userId':userId.id,"privilege":userId.privilege});
    console.log(isLoading,"isLoading")
	data && localStorage.setItem('max_order',data.data.max_order);
    useEffect(() => {
        dispatch(addResName(''))
       }, []);

    return (
        <div className="content-body">
        <div className="container-fluid">
            <div className="form-head d-flex mb-3 align-items-start">
                <div className="mr-auto d-none d-lg-block">
                    <h2 className="text-black font-w600 mb-0">Restaurant</h2>
                </div>


            </div>
			<div className="row">



			{data && data.data.all_res.map(item=> 	<div key={item.id} className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="new-arrival-product">
                                    <div className="new-arrivals-img-contnent">
                                       <Link to={`/restaurant/${item.slug}`}>
									   <h4>{item.username}</h4>
									   </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
						</div>)
			}

			</div>
            <div className="row" style={{height:300}}>


                </div>
            </div>
            </div>
    );
}

export default Home;