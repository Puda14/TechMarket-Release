import React, {useEffect, useState} from 'react';
import {dashboardApi} from "../../../api/dashboardApi.js";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ComposedChart,
    ResponsiveContainer,
    Label
} from 'recharts';
import {useSelector} from "react-redux";
import user from "../../assets/ic_glass_users.png";
import saleweek from "../../assets/ic_glass_bag.png";
import product from "../../assets/ic_glass_buy.png";
import {userApi} from "../../../api/userApi.js";

function Dashboard() {
    const [combinedData, setCombinedData] = useState([]);
    const [weeklySalesData, setWeeklySalesData] = useState([]);
    const productList = useSelector(state => state.products.data);
    const [sumProduct, setSumProduct] = useState(productList.length);
    const [SumUser, setSumUser] = useState();
    const [sumPuscharOrderTo7dayRecent, setSumPuscharOrderTo7dayRecent] = useState();

    useEffect(() => {
        setSumProduct(productList.length);
    }, [productList]);

    const fetch = async () => {
        try {
            const res1 = await dashboardApi.sumOrderTo5MonthRecent();
            const res2 = await dashboardApi.sumPuscharOrderTo5MonthRecent();
            const res3 = await userApi.getAllUsers();
            const res4 = await dashboardApi.sumPuscharOrderTo7dayRecent();

            const orders = res1.data.map(item => ({month: item._id, orders: item.total}));
            const income = res2.data.map(item => ({month: item._id, income: item.total}));

            setSumUser(res3.data.data.length);

            const currentMonth = new Date().getMonth() + 1;
            const months = Array.from({length: 5}, (_, i) => {
                const month = currentMonth - 4 + i;
                return month > 0 ? month : month + 12;
            });

            const combined = months.map(month => {
                const orderItem = orders.find(item => item.month === month) || {orders: 0};
                const incomeItem = income.find(item => item.month === month) || {income: 0};
                return {month, orders: orderItem.orders, income: incomeItem.income};
            });

            setCombinedData(combined);
            setSumPuscharOrderTo7dayRecent(res4.data);

            // Prepare data for the weekly sales bar chart
            const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            const weeklySales = [2, 3, 4, 5, 6, 7, 1].map(dayId => {
                const dayName = daysOfWeek[dayId - 2] || "Sunday";
                const salesItem = res4.data.find(item => item._id === dayId) || {total: 0};
                return {day: dayName, sales: salesItem.total};
            });
            setWeeklySalesData(weeklySales);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const numberFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    return (
        <div className={' grid'}>
            <div>

                <div className={'flex items-center justify-center bg-green-300 p-10'}>
                    <div className={'flex items-center justify-center w-full '}>
                        <p className={'font-bold text-[46px] uppercase  text-center'}>Thống kê</p>
                    </div>
                    <div className={'flex items-center gap-16 justify-center'}>
                        <div className={'rounded-xl shadow-lg bg-white grid grid-cols-[40%,auto] py-8 px-4 w-[24vw]'}>
                            <img src={product} alt=""/>
                            <div>
                                <p className={'font-bold text-3xl'}>{sumProduct}</p>
                                <p className={'font-medium text-lg text-gray-400'}>Item store</p>
                            </div>
                        </div>
                        <div className={'rounded-xl shadow-lg bg-white grid grid-cols-[40%,auto] py-8 px-4 w-[24vw]'}>
                            <img src={user} alt=""/>
                            <div>
                                <p className={'font-bold text-3xl'}>{SumUser}</p>
                                <p className={'font-medium text-lg text-gray-400'}>User</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex items-center justify-between gap-2 mt-4 flex-col '}>
                <div className={'w-full bg-[#62D1D2] grid grid-cols-[90%,10%] p-6'}>
                    <ResponsiveContainer height={400} width={'100%'} className={'bg-white rounded-xl shadow-lg p-10'}>

                        <ComposedChart data={combinedData}>
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="month">
                                <Label value="Months" offset={-20} position="insideBottom"/>
                            </XAxis>
                            <YAxis yAxisId="right">
                                <Label value="Đã bán (sản phẩm)" angle={-90} position="insideRight"
                                       style={{textAnchor: 'middle'}} offset={120}/>
                            </YAxis>
                            <YAxis yAxisId="left" orientation="right">
                                <Label value="Doanh thu (VND)" angle={-90} position="insideLeft"
                                       style={{textAnchor: 'middle'}} offset={50}/>
                            </YAxis>
                            <Tooltip
                                formatter={(value, name) => {
                                    if (name === 'Đã bán (sản phẩm)') {
                                        return numberFormatter.format(value);
                                    } else if (name === 'Doanh thu (VND)') {
                                        return `${numberFormatter.format(value)} đ`;
                                    }
                                    return value;
                                }}
                            />
                            <Legend verticalAlign="bottom" align="center"
                                    wrapperStyle={{paddingTop: '50px', fontSize: 12}}/>
                            <Bar yAxisId="left" dataKey="orders" fill="#62D1D2" barSize={40} name="Đã bán (sản phẩm)"
                                 className={'!rounded-t-4'}/>
                            <Line yAxisId="right" type="monotone" dataKey="income" stroke="#ff7300"
                                  name="Doanh thu (VND)"/>
                        </ComposedChart>
                    </ResponsiveContainer>
                    <div className={'w-full h-full flex items-center justify-start'}>
                        <div className={'text-2xl uppercase top-4 font-bold p-4 text-center ml-6  text-white ' }>Biểu đồ danh thu của tuần
                        </div>
                    </div>

                </div>
                <div className={'w-full bg-green-300 grid grid-cols-[10%,90%] p-6'}>
                    <div className={'w-full h-full flex items-center'}>
                        <div className={'text-2xl uppercase top-4 font-bold p-4 mr-6 justify-end text-center text-white'}>Biểu đồ của 6 tháng gần nhất
                        </div>
                    </div>
                    <ResponsiveContainer height={500} width={'100%'}
                                         className={'bg-white rounded-xl shadow-lg  p-10 relative'}>
                        <BarChart data={weeklySalesData}>
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="day">
                                {/*<Label value="Days" offset={-20} position="insideBottom" />*/}
                            </XAxis>
                            <YAxis>
                                <Label value="Sales (VND)" angle={-90} position="insideLeft"
                                       style={{textAnchor: 'middle'}}
                                       offset={-60}/>
                            </YAxis>
                            <Tooltip
                                formatter={(value) => `${numberFormatter.format(value)} đ`}
                            />
                            <Legend verticalAlign="bottom" align="center"
                                    wrapperStyle={{paddingTop: '50px', fontSize: 12}}/>
                            <Bar dataKey="sales" fill="#82ca9d" barSize={100} name="Sales (VND)"
                                 className={'!rounded-t-4'}/>
                        </BarChart>
                    </ResponsiveContainer>


                </div>


            </div>
        </div>
    );
}

export default Dashboard;
