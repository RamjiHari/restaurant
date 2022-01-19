import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginContext from "../context/LoginContext";
import { Link, useHistory } from "react-router-dom";
import { config } from "../../../common/utils/config";
import { Multiselect } from 'multiselect-react-dropdown';

const AddCampaign = ({ match }) => {
  var edit_id = match.params.id ? match.params.id : "";
  const [loading, setLoading] = useState(false);
  const loginContext = useContext(LoginContext);
  const id = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : "";
  const [state, setstate] = useState({
    id: "",
    type: "",
    items:[],
    percentage:'',
    start_date:'',
    end_date:'',

  });

  const [campaign, setCampaign] = useState([]);
  const [item, setItem] = useState([]);
  let selectedItem =state.items
  const history = useHistory();
  useEffect(() => {
    if (edit_id != "") {
      let formData = new FormData();
      formData.append("request", "getCampaign");
      formData.append("editId", edit_id);
      Axios({
        method: "post",
        url: config.HOST_NAME,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then(function (response) {
          if (response.data.status == "success") {
            setstate(response.data.data);
          } else {
            toast.warning("Something Wrong", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 8000,
            });
          }
        })
        .catch(function (response) {
          toast.warning("Server Problem", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 8000,
          });
        });
    }
  }, [edit_id]);
  useEffect(() => {

    let formData = new FormData();
    formData.append("request", "getAllItems");
    formData.append("id", id.username);
    Axios({
      method: "post",
      url: config.HOST_NAME,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        if (response.data.status == "success") {


          setItem(response.data.data);
        } else {
            alert("ll")
          // toast.warning("Something Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        }
      })
      .catch(function (response) {
        toast.warning("Server Problem", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 8000,
        });
      });
  }, []);
  useEffect(() => {
    let formData = new FormData();
    formData.append("request", "getAllCampaignType");
    Axios({
      method: "post",
      url: config.HOST_NAME,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {
        if (response.data.status == "success") {
          setCampaign(response.data.data);
        } else {
          //toast.warning("Something Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        }
      })
      .catch(function (response) {
        toast.warning("Server Problem", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 8000,
        });
      });
  }, []);



  const onChange = (key, val) => {
    let updated = {
      ...state,
      [key]: val,
    };
    setstate(updated);
  };

  const saveHandler = () => {
    let formData = new FormData();
    formData.append("request", "insertCampaign");
    formData.append("id", state.id);
    formData.append("type", state.type);
    formData.append("items", typeof(state.items)=='string'?state.items: JSON.stringify(state.items));
    formData.append("percentage", state.percentage);
    formData.append("start_date", state.start_date);
    formData.append("end_date", state.end_date);
    formData.append("admin", id.id);
    Axios({
      method: "post",
      url: config.HOST_NAME,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then(function (response) {

        if (response.data.status == "success") {
          toast.warning("Add Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 8000,
          });
          history.push("/campaign");
        } else {
          //toast.warning("Something Wrong",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        }
      })
      .catch(function (response) {
        //toast.warning("Server Problem",{position:toast.POSITION.TOP_CENTER,autoClose:8000})
      });
  };
function onSelect(val){
 selectedItem=[]
 val.map((item) => {
   selectedItem.push(item.id)
 })
 setstate({
   ...state,
   items:selectedItem
 })
}
function onRemove(val){
  selectedItem=[]
  val.map((item) => {
    selectedItem.push(item.id)
  })
  setstate({
    ...state,
    items:selectedItem
  })
}
function selectItems(){
 return item.filter(
    (item) => selectedItem.includes(item.id)
  );

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
              <li class="breadcrumb-item">
                <a href="javascript:void(0)">Campaign</a>
              </li>
              <li class="breadcrumb-item active">
                <a href="javascript:void(0)">Add Campaign</a>
              </li>
            </ol>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Add Campaign</h4>
              </div>
              <div class="card-body">
                <div>
                  <section>
                    <div class="row">
                      <div class="col-lg-4 mb-2">
                        <div class="form-group">
                          <input
                            type="hidden"
                            name="id"
                            class="form-control"
                            placeholder="Enter id"
                            onChange={(val) => onChange("id", val.target.value)}
                            value={state.id}
                          />

                          <label class="text-label">Campaign*</label>
                          <select

                            className="form-control"
                            onChange={(val) =>
                              onChange("type", val.target.value)
                            }
                          >
                            <option value="">Select</option>
                            {campaign.length > 0 &&
                              campaign.map((item) => (
                                <option selected={item.id==state.type ?true :false} key={item.id} value={item.id}>
                                  {item.camp_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div class="col-lg-4 mb-2">
                        <div class="form-group">
                          <label class="text-label">Items*</label>
                          <Multiselect
options={item} // Options to display in the dropdown
selectedValues={selectItems()} // Preselected value to persist in dropdown
onSelect={(val)=>onSelect(val)} // Function will trigger on select event
onRemove={(val)=>onRemove(val)} // Function will trigger on remove event
displayValue="title" // Property name to display in the dropdown options
/>

                        </div>
                      </div>


                      <div class="col-lg-4 mb-2">
                        <div class="form-group">
                          <label class="text-label">Enter %*</label>
                          <input
                            type="text"
                            name="id"
                            class="form-control"
                            placeholder="Enter %"
                            onChange={(val) => onChange("percentage", val.target.value)}
                            value={state.percentage}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4 mb-2">
                        <div class="form-group">
                        <label class="text-label">Start Date*</label>
                        <input type="date" onChange={(val) => onChange("start_date", val.target.value)} value={state.start_date}
                        name="start"/>
                          </div>
                          </div>
                          <div class="col-lg-4 mb-2">
                        <div class="form-group">
                        <label class="text-label">End Date*</label>
                        <input type="date" onChange={(val) => onChange("end_date", val.target.value)} value={state.end_date}
                        name="end"/>
                          </div>
                          </div>
                          </div>
                    <button
                      type="button"
                      class="btn btn-primary mt-3"
                      onClick={() => saveHandler()}
                    >
                      Submit
                    </button>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCampaign;
