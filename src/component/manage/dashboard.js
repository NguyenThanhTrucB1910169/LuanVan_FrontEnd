import React from "react";
import { Fragment } from "react";
import SideBar from "./sideBar";
import "./dashBoard.css";
import { connect } from "react-redux";
import moment from "moment";
import {
  getAllOrders,
  getAllUsers,
  getIdProducts,
} from "../../store/actions/adminAction";
import { fetchProducts } from "../../store/actions/productsAction";
import { toast } from "react-toastify";
import Toast from "../home/toast";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
Chart.defaults.datasets.bar.maxBarThickness = 73;

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      revenue: 0,
      // products: this.props.admin.idproducts.length,
      // users: [],
      outOfStock: 0,
      quantity: 0,
      dataChart: [],
      chartBarData: null,
      chartDoughnutData: null,
      charBarRevenue: null,
    };
    this.options = {
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Ngày",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Doanh thu",
            },
          },
        ],
      },
    };
  }

  customOrder = () => {
    const custom = this.props.admin.orders.reduce((result, product) => {
      const mdh = product.id;
      if (!result[mdh]) {
        result[mdh] = [];
      }
      result[mdh].push(product);
      return result;
    }, {});
    this.setState({ order: custom }, () => {
      Object.entries(this.state.order).map(([key, value]) => {
        this.setState((prev) => ({
          // quantity: prev.quantity + value[key].OrderItems.quantity,
          revenue: prev.revenue + value[0].totalPrice,
        }));
      });
    });
    // const data = this.props.admin.orders.map((order) => ({
    //   date: order.createdAt.split("T")[0],
    //   revenue: order.totalPrice,
    // }));
    // console.log('data ', data);
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.admin.allusers === undefined) {
      this.props.adAllUsers();
    }
    if (this.props.products !== undefined) {
      // console.log("this.props.products ", this.props.products);
      this.props.products &&
        this.props.products.forEach((item) => {
          this.state.outOfStock += item.count;
          // if (item.count === 0) {
          // }
        });
    }
    if (prevProps.admin.orders !== this.props.admin.orders) {
      this.customOrder();
      this.renderBarChart();
    }
    if (prevProps.products !== this.props.products) {
      this.renderChartDoughnut();
      this.renderChart();
    }
  };

  convertOrdersToData = (orders) => {
    const data = orders.reduce((acc, order) => {
      const date = moment(order.createdAt).format("DD/MM/YYYY");

      if (!acc[date]) {
        acc[date] = {
          date,
          revenue: order.totalPrice,
        };
      } else {
        acc[date].revenue += order.totalPrice;
      }

      return acc;
    }, {});

    return Object.values(data);
  };

  async componentDidMount() {
    await this.props.adOrders();
    await this.props.adProducts();
    await this.props.adUsers();
    await this.props.adAllUsers();
    const data = this.convertOrdersToData(this.props.admin.orders);
    console.log("data ", data);
    this.setState({ dataChart: data });
    await this.renderBarChart();
    await this.renderChartDoughnut();
    await this.renderChart();
  }

  renderBarChart = () => {
    const { orders } = this.props.admin;
    if (orders) {
      const productCount = {};

      orders.forEach((order) => {
        order.OrderItems.forEach((item) => {
          const productName = item.name;
          if (productCount[productName]) {
            productCount[productName] += item.quantity;
          } else {
            productCount[productName] = item.quantity;
          }
        });
      });

      const productNames = Object.keys(productCount);
      const productQuantities = Object.values(productCount);
      const chartData = {
        labels: productNames,
        datasets: [
          {
            label: "Số lượng",
            data: productQuantities,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderWidth: 1,
          },
        ],
      };

      this.setState({ chartBarData: chartData }); // Cập nhật trạng thái của component
    } else {
      this.setState({ chartBarData: null }); // Trường hợp không có dữ liệu thống kê
    }
  };

  renderChartDoughnut = () => {
    const products = this.props.products;
    let chartDoughnutData = null;
    let chartDoughnut = null;
    if (products) {
      // Tạo một đối tượng để lưu trữ phần trăm phân phối theo category
      const categoryDistribution = {};

      // Tính toán phần trăm phân phối
      products.forEach((product) => {
        const category = product.category;
        if (categoryDistribution[category]) {
          categoryDistribution[category] += 1;
        } else {
          categoryDistribution[category] = 1;
        }
      });

      // Chuyển dữ liệu vào định dạng dành cho biểu đồ
      chartDoughnutData = {
        labels: Object.keys(categoryDistribution), // Tên các category
        datasets: [
          {
            data: Object.values(categoryDistribution), // Số lượng sản phẩm trong từng category
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              // Thêm màu khác nếu cần
            ],
          },
        ],
      };
      this.setState({ chartDoughnutData: chartDoughnutData });
    } else {
      this.setState({ chartDoughnutData: null });
    }

    // return chartDoughnut;
  };

  renderChart = () => {
    const { dataChart } = this.state;
    console.log("dataChart", dataChart);

    let chartData = null;

    if (dataChart.length > 0) {
      // Nếu dataChart có dữ liệu, sử dụng nó để cấu hình biểu đồ
      const chartData = {
        labels: dataChart.map((item) => item.date),
        datasets: [
          {
            label: "Doanh thu",
            backgroundColor: "#3f81f6",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
            hoverBackgroundColor: "#95e0fb",
            hoverBorderColor: "rgba(75,192,192,1)",
            data: dataChart.map((item) => item.revenue),
          },
        ],
      };

      this.setState({ charBarRevenue: chartData });
    } else {
      this.setState({ charBarRevenue: null });
    }
    // return chartData;
  };

  render() {
    return (
      <Fragment>
        <div className="row ad_dash">
          <SideBar />
          <div className="ad_dashboard">
            <h1 className="ad_dashtitle">swans lux</h1>
            <div>Ngày: {moment(Date.now()).format("DD.MM.YYYY")}</div>
            <div className="mt-4" style={{ marginBottom: "3rem" }}>
              <h3 className="fw-semibold">Thông tin tổng quan</h3>
              <div className="row justify-content-around mt-3">
                <div className="mb-sm-4 mb-lg-0 col-sm-9 col-lg-3_ad ad_card">
                  <div className="row justify-content-between">
                    <p className="col-8 me-0 pt-1">Tổng sản phẩm</p>
                    <div className="col-3 ad_dashicon">
                      <i className="fa-solid fa-truck"></i>
                    </div>
                  </div>
                  <h2 className="text-center fw-bold">
                    {this.props.admin && this.props.admin.idproducts.length}
                  </h2>
                </div>
                <div className="mb-sm-4 mb-lg-0 col-sm-9 col-lg-3_ad ad_card">
                  <div className="row justify-content-between">
                    <p className="col-8 me-0 pt-1 pe-0">Số người dùng</p>
                    <div
                      className="col-3 ad_dashicon"
                      style={{ paddingLeft: "0" }}
                    >
                      <i className="fa-solid fa-users"></i>
                    </div>
                  </div>
                  <h2 className="text-center fw-bold">
                    <h2 className="text-center fw-bold">
                      {this.props.admin && this.props.admin.allusers
                        ? this.props.admin.allusers.length
                        : "Loading..."}
                    </h2>
                  </h2>
                </div>
                <div className="mb-sm-4 mb-lg-0 col-sm-9 col-lg-3_ad ad_card">
                  <div className="row justify-content-between">
                    <p className="col-7 me-0 pt-1">Tổng đơn hàng</p>
                    <div className="col-3 ad_dashicon">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                  </div>
                  <h2 className="text-center fw-bold">
                    {Object.keys(this.state.order).length}
                  </h2>
                </div>
                <div className="mb-sm-4 mb-lg-0 col-sm-9 col-lg-3_ad ad_card">
                  <div className="row justify-content-between">
                    <p className="col-8 me-0 pt-1">Tổng doanh thu</p>
                    <div className="col-3 ad_dashicon">
                      <i className="fa-solid fa-hand-holding-dollar"></i>
                    </div>
                  </div>
                  <h2 className="text-center fw-bold mt-2">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(this.state.revenue)}
                  </h2>
                </div>
              </div>
              {/* <div className="row justify-content-around mt-5">
            </div> */}
            </div>
            <div className="chart_gr">
              <h2 className="fw-semibold text-capitalize">thống kê</h2>
              <div className="row justify-content-between">
                <div className="lineChart col-6">
                  {this.state.chartBarData ? (
                    <div>
                      <Bar
                        data={this.state.chartBarData}
                        options={{
                          // scales: {
                          //   xAxes: [
                          //     {
                          //       barThickness: 6, // number (pixels) or 'flex'
                          //       maxBarThickness: 8, // number (pixels)
                          //     },
                          //   ],
                          // },
                        }}
                      />
                      <h5 className="mt-4 text-center fw-semibold">
                        Top Sản Phẩm Bán Chạy
                      </h5>
                    </div>
                  ) : (
                    <p>Không có dữ liệu thống kê.</p>
                  )}
                </div>

                <div className="doughnutChart col-5">
                  {this.state.chartDoughnutData ? (
                    <div>
                      <Doughnut data={this.state.chartDoughnutData} />
                      <h5 className="mt-2 text-center text-capitalize fw-semibold">
                        Số lượng mỗi loại sản phẩm hiện có.
                      </h5>
                    </div>
                  ) : (
                    <p>Không có dữ liệu thống kê.</p>
                  )}
                </div>
              </div>

              <div>
                {this.state.charBarRevenue ? (
                  <div>
                    <Bar
                      data={this.state.charBarRevenue}
                      options={this.options}
                    />
                    <h5 className="mt-2 text-center text-capitalize fw-semibold">
                      Doanh số của cửa hàng theo ngày.
                    </h5>
                  </div>
                ) : (
                  <p>Không có dữ liệu thống kê.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    products: state.getAllProducts.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adOrders: () => dispatch(getAllOrders()),
    adProducts: () => dispatch(fetchProducts()),
    adUsers: () => dispatch(getIdProducts()),
    adAllUsers: () => dispatch(getAllUsers()),
    // adDetailProducts: () => dispatch(getAllDetailProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
