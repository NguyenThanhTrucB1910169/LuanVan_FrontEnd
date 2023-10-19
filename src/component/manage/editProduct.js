import React, { Fragment, useState, useEffect } from "react";
import "./editProduct.css";
import { updateProduct } from "../../store/actions/productsAction";
import { getIdProducts } from "../../store/actions/adminAction";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./sideBar";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import { withRouter, useLocation } from "react-router-dom";

const EditProduct = () => {
  const result = useSelector((state) => state.getAllProducts.message);
  const listId = useSelector((state) => state.admin.idproducts);
  const dispatch = useDispatch();
  const location = useLocation();
  const product = location.state ? location.state.pd : null;
  const [products, setProducts] = useState({
    id: "",
    name: "",
    price: "",
    count: 0,
    image: [],
    description: "",
    type: "",
    material: "",
    category: ''
  });
  const [nameImage, setNameImage] = useState([]);
  const [error, setError] = useState({
    id: "",
    name: "",
    price: "",
    count: "",
    image: "",
    description: "",
    type: "",
    category: '',
    material: "",
  });
  const type = [
    "Vòng tay",
    "Nhẫn",
    "Hoa Tai",
    "Lắc Tay",
    "Chuỗi Ngọc Trai",
    "Vòng Cổ",
    "Ghim Cài",
  ];
  const category = ["jewelry", "watch", "wedding", "accessories"];
  const materials = [
    "Bạc",
    "Vàng Hồng",
    "Ngọc Trai",
    "Bạch Kim",
    "Đá Quý",
    "Pha Lê",
  ];
  useEffect(() => {
    dispatch(getIdProducts());
    if (product) {
      // var pd = this.props.location.state.pd;
      var newImages = product.image.split(",");
      // console.log(product);
      // console.log(typeof product.price)
      // console.log(pd)
      setProducts({
        id: product.id,
        name: product.name,
        price: product.price.toString(),
        count: product.count,
        image: newImages,
        description: product.description,
        type: product.type,
        category: product.category,
        material: product.material,
      });
    }
  }, []);
  const validateForm = (e) => {
    if (e.target.value.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        [e.target.name]: "Vui lòng nhập mã sản phẩm",
      }));
    } else if (listId.some((item) => item.id === e.target.value)) {
      setError((prevError) => ({
        ...prevError,
        [e.target.name]: "Mã Sản Phẩm Bị Trùng",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        [e.target.name]: "",
      }));
    }
    setProducts((prevProducts) => ({
      ...prevProducts,
      id: e.target.value,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorsCopy = { ...error };

    if (value.trim() === "") {
      errorsCopy[name] = "Giá trị này là bắt buộc";
    } else {
      errorsCopy[name] = "";
    }

    setError(errorsCopy);
    setProducts((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  useEffect(() => {
    // if(products)
    console.log(products);
    console.log(typeof products.image);
  }, [products]);

  const addNameToImageList = (e) => {
    if (e.target.value.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        [e.target.name]: "Vui lòng chọn ảnh",
      }));
    } else {
      const selectedImages = Array.from(e.target.files);
      setProducts((prevProducts) => ({
        ...prevProducts,
        image: selectedImages,
      }));
      const imageNames = selectedImages.map((image) => image.name);
      setNameImage((prevName) => [...prevName, imageNames]);
      setError((prevError) => ({
        ...prevError,
        [e.target.name]: "",
      }));
    }
  };

  const checkValid = () => {
    const isValid =
      products.id.trim() !== "" &&
      products.name.trim() !== "" &&
      products.description.trim() !== "" &&
      products.material.trim() !== "" &&
      products.count !== null &&
      products.type.trim() !== "" &&
      products.category.trim() !== "" &&
      products.image.length > 0 &&
      products.price.trim() !== "";
    return isValid;
  };

  const submitProductHandler = async (e) => {
    e.preventDefault();
    if (checkValid()) {
      const formData = new FormData();
      formData.append("id", products.id);
      formData.append("name", products.name);
      formData.append("price", products.price);
      formData.append("count", products.count);
      formData.append("description", products.description);
      formData.append("type", products.type);
      formData.append("category", products.category);
      formData.append("material", products.material);
      for (let i = 0; i < products.image.length; i++) {
        formData.append("image", products.image[i]);
      }

      // for (let pair of formData.entries()) {
      //   console.log(pair);
      // }
      await dispatch(updateProduct(formData));
      console.log(result);
      if (result) {
        toast.success(<Toast message="Cập nhật sản phẩm thành công" />, {
          className: "success",
        });
      }
      // setProducts({
      //   id: "",
      //   name: "",
      //   price: "",
      //   count: 0,
      //   image: [],
      //   description: "",
      //   type: "",
      //   material: "",
      // });
    } else {
      toast.warning(<Toast message="Vui lòng nhập đủ các giá trị" />, {
        className: "warning",
      });
    }
  };

  return (
    <Fragment>
      <div className="row justify-content-between">
        <SideBar />
        <form
          className="mt-4 col-6 form_edit main_side"
          encType="multipart/form-data"
          onSubmit={submitProductHandler}
        >
          <h1 className="text-uppercase text-center ad_title">Thay đổi thông tin trang sức</h1>
          <div className="row">
            <div className="mb-3 col-4">
              <input
                type="text"
                placeholder="Mã Sản Phẩm"
                name="id"
                className="form_add_item"
                value={products.id}
                onChange={validateForm}
              />
              <div className="error_ad">{error.id ? error.id : null}</div>
            </div>
            <div className="mb-3 col-8">
              <input
                type="text"
                placeholder="Tên Sản Phẩm"
                name="name"
                className="form_add_item"
                value={products.name}
                onChange={handleChange}
              />
              <div className="error_ad">{error.name ? error.name : null}</div>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <select
                className="form_add_item"
                name="category"
                value={products.category}
                onChange={handleChange}
              >
                <option value="">Chọn Danh mục Sản Phẩm</option>
                {category.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate === "jewelry"
                      ? "Trang sức"
                      : cate === "watch"
                      ? "Đồng hồ"
                      : cate === "wedding"
                      ? "Trang sức cưới"
                      : cate === "accessories"
                      ? "Phụ kiện & quà tặng"
                      : null}
                  </option>
                ))}
              </select>
              <div className="error_ad">
                {error.category ? error.category : null}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-6">
              <select
                className="form_add_item"
                name="material"
                value={products.material}
                onChange={handleChange}
              >
                <option value="">Chất Liệu</option>
                {materials.map((mate) => (
                  <option key={mate} value={mate}>
                    {mate}
                  </option>
                ))}
              </select>
              <div className="error_ad">
                {error.material ? error.material : null}
              </div>
            </div>
            <div className="mb-3 col-6">
              <select
                className="form_add_item"
                name="type"
                value={products.type}
                onChange={handleChange}
              >
                <option value="">Loại Trang Sức</option>
                {type.map((typ) => (
                  <option key={typ} value={typ}>
                    {typ}
                  </option>
                ))}
              </select>
              <div className="error_ad">{error.type ? error.type : null}</div>
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-7">
              <input
                type="text"
                placeholder="Giá"
                name="price"
                value={products.price}
                className="form_add_item"
                onChange={handleChange}
              />
              <div className="error_ad">{error.price ? error.price : null}</div>
            </div>
            <div className="mb-3 col-5">
              <input
                className="form_add_item"
                type="number"
                placeholder="Số Lượng"
                name="count"
                value={products.count}
                onChange={handleChange}
              />
              <div className="error_ad">{error.count ? error.count : null}</div>
            </div>
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Mô Tả Sản Phẩm"
              className="form_add_des"
              value={products.description}
              name="description"
              onChange={handleChange}
              cols="30"
              rows="7"
            ></textarea>
            <div className="error_ad">
              {error.description ? error.description : null}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="inputField" className="label_field">
              Ảnh Sản Phẩm
            </label>

            <input
              id="inputField"
              type="file"
              name="image"
              style={{ display: "none" }}
              onChange={addNameToImageList}
              multiple
              accept="image/png , image/jpeg, image/webp"
            />
            <div className="row justify-content-between list_review">
              {nameImage.length !== 0
                ? nameImage[0].map((name, index) => (
                    <img
                      src={`/products/${name}`}
                      alt=""
                      className="col-3"
                      key={index}
                    />
                  ))
                : products.image.map((img, i) => (
                    <img
                      key={i}
                      src={`http://localhost:3005/uploads/${img}`}
                      alt=""
                      className="col-3"
                    />
                  ))}
            </div>
          </div>
          <div className="text-center mb-3">
            <button type="submit" className="btn_ad_create">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EditProduct;
