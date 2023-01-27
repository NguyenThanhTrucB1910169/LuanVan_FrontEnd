// import {ReactNavbar} from "overlay-navbar"
// import React from "react";
// import { Fragment } from "react";
// import './navbar.css'
// import { Link } from "react-router-dom";

// class NavBar extends React.Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             slide: false,
//         }
//     }

//     showSideBar = () => {
//         console.log(this.state.slide)
//         this.setState({
//             slide: !this.state.slide
//         })
//     }

//     render() {
//         return (
//             <Fragment>
//     <div>
//         <div className='navbar'>
//         <button onClick={this.showSideBar} style={{ color: '#fff' }} className='bar-icon'>
//             <i className="fa-solid fa-bars"></i>
//         </button>
//         </div>
//         <nav className={this.state.slide ? 'nav-menu active' : 'nav-menu'}>
//           <ul className='nav-menu-items' onClick>
//             <li className='navbar-toggle'>
//               <Link to='#' className='menu-bars'>
//                 Home
//               </Link>
//             </li>
//             <li className='navbar-toggle'>
//               <Link to='#' className='menu-bars'>
//                 {/* <AiIcons.AiOutlineClose /> */}
//                 Home
//               </Link>
//             </li>  <li className='navbar-toggle'>
//               <Link to='#' className='menu-bars'>
//                 {/* <AiIcons.AiOutlineClose /> */}
//                 Home
//               </Link>
//             </li>  <li className='navbar-toggle'>
//               <Link to='#' className='menu-bars'>
//                 {/* <AiIcons.AiOutlineClose /> */}
//                 Home
//               </Link>
//             </li>
//             {/* {SidebarData.map((item, index) => {
//               return (
//                 <li key={index} className={item.cName}>
//                   <Link to={item.path}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               );
//             })} */}
//           </ul>
//         </nav>
//       {/* </IconContext.Provider> */}
//     </div>
           
//             </Fragment>
//         )
//     }
// }

// export default NavBar;