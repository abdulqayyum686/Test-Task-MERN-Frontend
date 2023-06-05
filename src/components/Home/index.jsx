import React, { useEffect, useState } from "react";
import "./home.css";
import adcard from "../../assets/images/adcard.png";
import adcard2 from "../../assets/images/adcard2.png";
import StarImg from "../../assets/images/Star.png";
import edit from "../../assets/images/edit.png";
import deleteIcon from "../../assets/images/delete.png";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addProduct, getUserProducts, deleteProduct, updateProduct } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Base_Url } from "../../config/baseUrl";
import { Calendar, DateObject } from "react-multi-date-picker";
import handleDate from "../../redux/reducers/userReducer"
import moment from 'moment'
import Swal from 'sweetalert2'
import DataTableCom from "./dataTable"




const Home = () => {
  const [update, setUpdate] = useState()
  const [show, setShow] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [support, setSupport] = useState(false);
  const [extrahour, setExtraHour] = useState(false);
  const [equipment, setEquipment] = useState(false);
  const [image1, setImage1] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [vediostate, setVedioState] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [vedioPreview, setVedioPreview] = useState(null);
  const [inputs, setInputs] = useState();

  const [more, setMore] = useState([
    {
      choseCurency: "",
      catName: "",
      catDescription: "",
      availability: "",
      delivery: "",
      extra: "",
      equipment: "",
      currencySymbol: "",
    },
  ]);
  const [editmore, setEditMore] = useState([
    {
      choseCurency: "",
      catName: "",
      catDescription: "",
      availability: "",
      delivery: "",
      extra: "",
      equipment: "",
      currencySymbol: "",
    },
  ]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userProducts = useSelector((state) => state.user.userProducts);
  const user_id = currentUser?._id;
  useEffect(() => {
    if (user_id) {
      dispatch(getUserProducts(user_id));

    }

    setSupport(true);
  }, [user_id]);

  const dispatch = useDispatch();
  const handleImageChange1 = (e) => {
    const selectedImage = e.target.files[0];
    setImage1(selectedImage);
    setPreview1(URL.createObjectURL(selectedImage));
    setInputs((values) => ({ ...values, image1: selectedImage }));
  };
  const handleImageChange2 = (e) => {
    const selectedImage = e.target.files[0];
    setImage2(selectedImage);
    setPreview2(URL.createObjectURL(selectedImage));
    setInputs((values) => ({ ...values, image2: selectedImage }));
  };
  const handleVedioUpload = (e) => {
    const vedio = e.target.files[0];
    setVedioState(vedio);
    setVedioPreview(URL.createObjectURL(vedio));
    setInputs((values) => ({ ...values, vedioMasg: vedio }));
  };
  const handleImageChange3 = (e) => {
    const selectedImage = e.target.files[0];
    setImage3(selectedImage);
    setPreview3(URL.createObjectURL(selectedImage));
    setInputs((values) => ({ ...values, image3: selectedImage }));
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseEditModal = () => {
    setEditModal(false);
  };
  const handleShow = () => setShow(true);
  const handleExtraHour = () => {
    setExtraHour(!extrahour);
  };
  const handleEquipment = () => {
    setEquipment(!equipment);
  };
  const handleAddMore = () => {
    const newObj = {
      choseCurency: "",
      catName: "",
      catDescription: "",
      availability: "",
      delivery: "",
      extra: "",
      equipment: "",
      currencySymbol: "",
    };
    setMore([...more, newObj]);
  };
  const handleRemoveItem = (index) => {
    const array = [...more];
    const removed = array.splice(index, 1);
    setMore(array);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleChangeDynamicly = (event, i) => {
    const { value, name } = event.target;
    const newState = [...more];
    newState[i] = {
      ...newState[i],
      [name]: value,
    };
    console.log(newState);
    setMore(newState);
  };
  const handleAudioFile = (e) => {
    const uploadFile = e.target.files[0];

    setInputs((values) => ({ ...values, audioFile: uploadFile }));
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("address", inputs.address);
    formData.append("description", inputs.description);
    formData.append("image1", inputs.image1);
    formData.append("image2", inputs.image2);
    formData.append("image3", inputs.image3);
    formData.append("audioFile", inputs.audioFile);
    formData.append("vedioMasg", inputs.vedioMasg);
    formData.append("current", user_id);
    formData.append("offers", JSON.stringify(more));
    dispatch(addProduct(formData));
    setSupport(true);
  };


  const handleCalnder = (date, i) => {
    const newState = [...more];
    newState[i] = {
      ...newState[i],
      ["availability"]: JSON.stringify(date),
    };
    console.log(newState);
    setMore(newState);
  };
  const handleDeleteProduct = (id) => {
    console.log("click")
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this product!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id))
        setSupport(true);

      }
    }

    )

  }
  const handleEditProduct = (data) => {
    console.log("edit", data.offers)
    setUpdate(data)
    setEditModal(true)
    setEditMore(JSON.parse(data.offers))
  }
  const handleEditChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdate((values) => ({ ...values, [name]: value }));
  };
  const handleEditRemoveItem = (index) => {
    const array = [...editmore];
    const removed = array.splice(index, 1);
    setEditMore(array);
  };
  const handleChangeEditDynamicly = (event, i) => {
    const { value, name } = event.target;
    const newState = [...editmore];
    newState[i] = {
      ...newState[i],
      [name]: value,
    };
    console.log(newState);
    setEditMore(newState);
  };
  const handleEditCalnder = (date, i) => {
    const newState = [...editmore];
    newState[i] = {
      ...newState[i],
      ["availability"]: JSON.stringify(date),
    };
    setEditMore(newState);
  };
  const handleEditAddMore = () => {
    const newObj = {
      choseCurency: "",
      catName: "",
      catDescription: "",
      availability: "",
      delivery: "",
      extra: "",
      equipment: "",
      currencySymbol: "",
    };
    setEditMore([...editmore, newObj]);
  };
  const handleEditAudioFile = (e) => {
    const uploadFile = e.target.files[0];
    console.log("uploadfile", uploadFile);
    setUpdate((values) => ({ ...values, audioFile: uploadFile }));
  };
  const handleEditImageChange1 = (e) => {
    const selectedImage = e.target.files[0];
    setImage1(selectedImage);
    setPreview1(URL.createObjectURL(selectedImage));
    setUpdate((values) => ({ ...values, image1: selectedImage }));
  };
  const handleEditImageChange2 = (e) => {
    const selectedImage = e.target.files[0];
    setImage2(selectedImage);
    setPreview2(URL.createObjectURL(selectedImage));
    setUpdate((values) => ({ ...values, image2: selectedImage }));
  };
  const handleEditImageChange3 = (e) => {
    const selectedImage = e.target.files[0];
    setImage3(selectedImage);
    setPreview3(URL.createObjectURL(selectedImage));
    setUpdate((values) => ({ ...values, image3: selectedImage }));
  };
  const handleEditVedioUpload = (e) => {
    const vedio = e.target.files[0];
    setVedioState(vedio);
    setVedioPreview(URL.createObjectURL(vedio));
    setUpdate((values) => ({ ...values, vedioMasg: vedio }));
  };
  const handleEditSubmit = () => {
    const formData = new FormData();
    formData.append("name", update?.name);
    formData.append("address", update?.address);
    formData.append("description", update?.description);
    formData.append("image1", update?.image1);
    formData.append("image2", update?.image2);
    formData.append("image3", update?.image3);
    formData.append("audioFile", update?.audioFile);
    formData.append("vedioMasg", update?.vedioMasg);
    formData.append("current", user_id);
    formData.append("offers", JSON.stringify(editmore));

    let obj = {
      id: update._id,
      data: formData
    }

    dispatch(updateProduct(obj));
    dispatch(getUserProducts(user_id));
    setEditModal(false)
    setSupport(true);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'This product update successfully',
      showConfirmButton: false,
      timer: 1500
    })
  };

  console.log("userProducts ", userProducts)


  return (
    <>
{/* 4020024601120858 */}

      <div className="home_container">
        <div className="add_new_box">
          <Link to="/add-cat">
            <div className="add_new_opt" onClick={handleShow}>
              Add category
            </div>
          </Link>
          <Link to="/add-item">
          <div className="add_new_opt" onClick={handleShow}>
            Add car
          </div>
          </Link>
        </div>
        <div className="home_card_box">
          <DataTableCom />
        </div>
      </div>



    </>
  );
};

export default Home;
