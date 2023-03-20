import React from "react";
import { Formik, Form, Field, Input } from "formik";
import * as Yup from "yup";
import "./updateForm.css";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import {Fragment} from "react"

class UpdateForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       address: "",
//       phone: "",
//       fullName: "",
//       avatar: "",
//     };
//   }
//   handleSubmit = (values, { setSubmitting, resetForm }) => {
//     // console.log(values.avatar);
//     console.log(this.state.avatar)
//     this.setState(
//       {
//         address:
//           values.num +
//           "," +
//           values.street +
//           "," +
//           values.ward +
//           "," +
//           values.district +
//           "," +
//           values.city,
//       },
//       () => {
//         const info = { address: this.state.address, phone: values.phone };
//         // this.props.updateInfo(info);
//       }
//     );
//     // toast.success(<Toast message="Cập nhật thông tin thành công" />, {
//     //   className: "success",
//     // });
//     // resetForm();
//     setSubmitting(true);
//   };

//   render() {
//     return (
//       <div className="order_contain pb-4">
//         <div className="order_form">
//           {/* <div className="order_image">
//             <img src="/order.png" alt="order" />
//           </div> */}
//           <Formik
//             initialValues={{
//               num: "",
//               street: "",
//               ward: "",
//               district: "",
//               city: "",
//               phone: "",
//               fullname: "",
//               avatar: "",
//             }}
//             validationSchema={formScheme}
//             onSubmit={this.handleSubmit}
//           >
//             {({ errors, touched, isSubmitting, handleChange, field }) => (
//               <Form className="form_detail">
//                 <h1 className="order_title">Thêm thông tin</h1>
//                 <div className="mb-3 row justify-content-around">
//                   <div className="mb-3 form-label d-block">
//                     <Field
//                       name="fullname"
//                       type="text"
//                       className="order_input"
//                       placeholder="Họ Tên"
//                     />
//                     {errors.fullname && touched.fullname ? (
//                       <div className="ms-4 input_error">{errors.fullname}</div>
//                     ) : null}
                    
//                   </div>
//                   <div className="col-6">
//                     <Field
//                       name="num"
//                       type="text"
//                       className="order_input"
//                       placeholder="Số nhà"
//                     />
//                     {errors.num && touched.num ? (
//                       <div className="ms-4 input_error">{errors.num}</div>
//                     ) : null}
//                   </div>
//                   <div className="col-6">
//                     <Field
//                       name="street"
//                       type="text"
//                       className="order_input"
//                       placeholder="Đường"
//                     />
//                     {errors.street && touched.street ? (
//                       <div className="ms-4 input_error">{errors.street}</div>
//                     ) : null}
//                   </div>
//                 </div>
//                 <div className="mb-3 row justify-content-around">
//                   <div className="col-6">
//                     <Field
//                       name="ward"
//                       type="text"
//                       className="order_input"
//                       placeholder="Phường"
//                     />
//                     {errors.ward && touched.ward ? (
//                       <div className="ms-4 input_error">{errors.ward}</div>
//                     ) : null}
//                   </div>
//                   <div className="col-6">
//                     <Field
//                       name="district"
//                       type="text"
//                       className="order_input"
//                       placeholder="Quận"
//                     />
//                     {errors.district && touched.district ? (
//                       <div className="ms-4 input_error">{errors.district}</div>
//                     ) : null}
//                   </div>
//                 </div>
//                 <div className="mb-3 form-label d-block">
//                   <Field
//                     name="city"
//                     type="text"
//                     className="order_input"
//                     placeholder="Thành Phố"
//                   />
//                   {errors.city && touched.city ? (
//                     <div className="ms-4 input_error">{errors.city}</div>
//                   ) : null}
//                 </div>
//                 <div className="mb-3 form-label d-block">
//                   <Field
//                     name="phone"
//                     type="text"
//                     className="order_input"
//                     placeholder="Số điện thoại"
//                   />
//                   {errors.phone && touched.phone ? (
//                     <div className="ms-4 input_error">{errors.phone}</div>
//                   ) : null}
//                 </div>
//                 <div className="mb-3 form-label d-block">
//                   {/* <Field
//                       type="file"
//                       name="avatar"
//                       accept="image/*"
//                       render={({ field, form, meta }) => (
//                         <div>
//                           <label>ảnh đại diện:</label>
//                           <input {...field} type="file"
//                             onChange={(e) => this.setState({avatar: e.target.files})}
//                           />
//                           {meta.touched && meta.error && (
//                             <div style={{ color: "red" }}>{meta.error}</div>
//                           )}
//                         </div>
//                       )}
//                     /> */}
//                     {/* <Field
//                     type="file"
//                       name="avatar"
//                       accept="image/*"
//                     >
//                     {({field, form, meta}) => (
//                       <div>
//                           <label>ảnh đại diện:</label>
//                           <input {...field} type="file" value={undefined}
//                             onChange={(e) => console.log(e.target.files)}
//                           />
//                           {/* {meta.touched && meta.error && (
//                             <div style={{ color: "red" }}>{meta.error}</div>
//                           )} 
//                           {errors.avatar && touched.avatar ? (
//                     <div className="ms-4 input_error">{errors.avatar}</div>
//                   ) : null} 
//                         </div>
//                     )}
//                     </Field> */}
//                   <h5>Ảnh đại diện</h5>
//                   <Field
//                     name="avatar"
//                     type="file"
//                     accept="image/*"
//                     // className=""
//                     // value={undefined}
//                     // handleChange
//                     value={undefined}
//                      onChange={handleChange}
//                     // onKeyUp={(e) => this.setState({avatar: e.target.field})}
//                   />
//                   {errors.avatar && touched.avatar ? (
//                     <div className="ms-4 input_error">{errors.avatar}</div>
//                   ) : null}
//                 </div>
//                 <div className="row justify-content-around my-4">
//                   <button
//                     type="submit"
//                     className="btn order_btn col-4"
//                     disabled={isSubmitting}
//                   >
//                     Submit
//                     <i className="fa-solid fa-download"></i>
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     );
//   }
// }

// const SUPPORTED_FORMATS = ["jpg", "jpeg", "webp", "png"];

// const formScheme = Yup.object().shape({
//   num: Yup.number().required("Địa chỉ là bắt buộc"),
//   street: Yup.string().required("Địa chỉ là bắt buộc"),
//   ward: Yup.string().required("Địa chỉ là bắt buộc"),
//   district: Yup.string().required("Địa chỉ là bắt buộc"),
//   city: Yup.string().required("Địa chỉ là bắt buộc"),
//   phone: Yup.string()
//     .matches(/^\d{10}$/, "Số điện thoại phải có 10 số")
//     .required("Số điện thoại là bắt buộc"),
//   fullname: Yup.string().required("Tên là bắt buộc"),
//   avatar: Yup.string()
//     // .required("Tải ảnh đại diện")
//     .test("fileFormat", "Ảnh không đúng định dạng", (value) => {
//       // console.log(this.avatar)
//       console.log(value)
//       if (value) {
//         console.log(value)
//         let type = value.split(".")[1];

//         return SUPPORTED_FORMATS.includes(type);
//       }
//     }),
// });


  state = {
    name: '',
    email: '',
    errors: {},
  };

  validateForm = (name) => {
    let errors = {};
    // console.log(typeof name)
    switch(name) {
      case 'name':
        // console.log('name', this.state.name) 
      if (!this.state.name) {
        this.setState({errors: {...this.state.errors, name:'requied'}},  () => {
          console.log(this.state.errors)
        })
       }
       else this.setState({errors: {...this.state.errors, name:''}},  () => {
        console.log(this.state.errors)
      })
      // console.log(errors)
      // this.setState((prevState) => {return {...prevState, errors}}, () => {
      //   console.log(this.state.errors)
      // });
      console.log(this.state)

      return errors;
    // this.setState({ errors });
      case 'email':
        // console.log('email', this.state.email) 
        if (!this.state.email) {
          // errors.email = '';
          this.setState({errors: {...this.state.errors, email:'requied'}})
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
          this.setState({errors: {...this.state.errors, email:'invalid'}}, () => {
            console.log(this.state.errors)
          })
        
        }
        console.log(this.state)
        // console.log(errors);
        // this.setState((prevState) => {return {...prevState.errors, errors}}, () => {
        //   console.log(this.state.errors)
        // });
        return errors;
      default: return errors;
    }
    // if (!this.state.name) {
    //   errors.name = 'Name is required';
    // }

    // if (!this.state.email) {
    //   errors.email = 'Email is required';
    // } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
    //   errors.email = 'Email is invalid';
    // }

  };

  handleChange = (event) => {
    // let type = event.target.name
    this.setState({ [event.target.name]: event.target.value }, () => {
      // console.log(this.state)
      // console.log(event.target.name)
      this.validateForm(event.target.name);
    });
  };

  render() {
    return (
      <Fragment>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
          {this.state.errors.name && <div>{this.state.errors.name}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={this.handleChange} value={this.state.email} />
          {this.state.errors.email && <div>{this.state.errors.email}</div>}
        </div>
      </form>

      {/* <button className="favourite-btn rounded-md">
      <i className="fa-solid fa-cart-plus text-2xl favourite-btn__icon"></i>
  {/* <AiOutlineHeart className="text-2xl favourite-btn__icon" /> 
  <span className="favourite-btn__text">Add to favourites</span>
</button> */}

      </Fragment>
    );
  }
}



export default UpdateForm;
