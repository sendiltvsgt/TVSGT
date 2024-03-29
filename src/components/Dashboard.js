import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { ProgressBar } from 'primereact/progressbar';
import { getRupee } from '../common/utils';
import { Badge } from 'primereact/badge';
import { RenderRestriction } from './general/Restriction';
import { OrderStatus, UserRole } from '../common/common.enum';
import { format, getTime, parseISO, startOfMonth, startOfYear, subDays, subMonths } from 'date-fns';
import { getApiData } from '../common/DataService';
import { OPEN_ORDER_STATS, ORDER_DELIVERY_STATS, ORDER_LIST_API, SALES_STATS_BY_STOCKIST } from '../config/api.config';
import { OrderStatusBadge } from './operation/order/OrderComponents';
import { SALES_STATS_BY_PRODUCT } from '../config/api.config';
import { SALES_STATS_BY_BRAND } from '../config/api.config';
import { SALES_STATS_BY_MONTH } from '../config/api.config';

const chartOptions = {
    plugins: {
        legend: {
            display: false
        }
    },
    maintainAspectRatio: false,
    hover: {
        mode: 'index'
    },
    scales: {
        x: {
            display: true,
            grid: {
                color: 'transparent'
            },
            ticks: {
                color: '#BFC2C6'
            }
        },
        y: {
            display: true,
            grid: {
                color: 'rgba(191, 194, 198, .45)',
                borderDash: [5, 10]
            },
            ticks: {
                color: '#BFC2C6',
                min: 0,
                stepSize: 5
            }
        }
    }
};

const getChartValues = (label, data) => {
    const borderColor = getComputedStyle(document.body).getPropertyValue('--primary-color') || '#2c84d8';
    const backgroundColor = getComputedStyle(document.body).getPropertyValue('--primary-lighter-color') || '#2c84d8';
    return {
        labels: label,
        datasets: [
            {
                label: 'Revenue',
                data: data,
                borderColor: [borderColor],
                borderWidth: 4,
                fill: true,
                backgroundColor: [backgroundColor],
                tension: 0.4
            }
        ]
    };
};

const Dashboard = () => {
    // Tile data
    const [tileData, setTileData] = useState({
        newOrder: 0,
        pendingConfirmation: 0,
        pendingFullFillment: 0,
        delivered: 0,
        orderValue: 0
    });

    const [recentOrder, setRecentOrder] = useState([]);

    const [topProducts, setTopProducts] = useState([]);
    const [topProductsTopValue, setTopProductsTopValue] = useState(0.01);

    const [topBrand, setTopBrand] = useState([]);
    const [topBrandTotal , setTopBrandTotal] = useState(0.01);

    const [chart, setChart] = useState(getChartValues([],[]));
    const [statData, setStatData] = useState({
        avgVolume: 0,
        stockistCount: 0,
        orderFullfilled: 0,
        totalSale: 0
    });


    // Remote calls
    useEffect(()=>{
        const dateFormat = "yyyy-MM-dd";
        const currentTime = new Date();
        const currentDate = format(currentTime, dateFormat);
        const threeDaysAgo = format(subDays(currentTime, 3), dateFormat);
        const monthStart = format(startOfMonth(currentTime),dateFormat);
        const sixMonthStart = format(subMonths(currentTime, 6),dateFormat);
        const yearStart = format(startOfYear(currentTime),dateFormat);

        (async () => {
            let newOrderThreeDaysCount = 0
            let pendingConfirmationCount = 0;
            let pendingFullFillmentCount = 0;
            let deliveredThreeDaysCount = 0;
            let totalOrderValueMTDValue = 0;

            // Loading Open Order Stats - All
            const openOrderResult = await getApiData(OPEN_ORDER_STATS);
            // Loading Pending confirmation and pending fullfillment
            if(openOrderResult && openOrderResult.data){

                for (let datum of openOrderResult.data){
                    if(datum.status === OrderStatus.PENDING_CONFIRMATION){
                        pendingConfirmationCount = datum.count;
                    }
                    // All open order status total is pending fullfillment count
                    pendingFullFillmentCount += datum.count;
                }
            }
            
            // Loading 3 days order and delivery stats
            const allOrderResultThreeDays = await getApiData(ORDER_DELIVERY_STATS, {from: threeDaysAgo, to: currentDate});
            // Loading 3 days newOrder and Delivered Order
            if(allOrderResultThreeDays && allOrderResultThreeDays.data){

                if(allOrderResultThreeDays.data.all){
                    newOrderThreeDaysCount = allOrderResultThreeDays.data.all.count;
                }

                if(allOrderResultThreeDays.data.delivered){
                    deliveredThreeDaysCount = allOrderResultThreeDays.data.delivered.count;
                }
            }

            // Loading all order - MTD
            const allOrderResultMTD = await getApiData(ORDER_DELIVERY_STATS, {from: monthStart, to: currentDate});
            // Loading 3 days newOrder and Delivered Order
            if(allOrderResultMTD && allOrderResultMTD.data){

                if(allOrderResultMTD.data.all){
                    totalOrderValueMTDValue = allOrderResultMTD.data.all.total;
                }
            }

            // Loading order list - Limiting 4
            let fewRecentOrders = [];
            const recentOrderResult = await getApiData(ORDER_LIST_API, {"page.count": 4, "page.start": 1});
            if(recentOrderResult && recentOrderResult.data){
                fewRecentOrders = recentOrderResult.data;
            }


            // Load Top Product
            let topProducts = [];
            let topProductsTopValue = 0;
            const valueByTopProduct = await getApiData(SALES_STATS_BY_PRODUCT, {from: yearStart, to: currentDate});
            if(valueByTopProduct && valueByTopProduct.data){
                topProducts = valueByTopProduct.data;
                topProductsTopValue = Math.max(...topProducts.map(obj => obj.total))
            }

            // Load Top Brand
            let topBrand = [];
            let topBrandTotal = 0;
            const valueByTopBrand = await getApiData(SALES_STATS_BY_BRAND, {from: yearStart, to: currentDate});
            if(valueByTopBrand && valueByTopBrand.data){
                topBrand = valueByTopBrand.data;
                topBrandTotal = valueByTopBrand.data.reduce((acc, obj)=>acc+obj.total,0);
            }

            // Load Monthwise Sales
            let monthWiseSales = [];
            const monthSaleResult = await getApiData(SALES_STATS_BY_MONTH, {from: sixMonthStart, to: currentDate});
            if(monthSaleResult && monthSaleResult.data){
                monthWiseSales = monthSaleResult.data.reverse();
            }

            // Load Monthwise Sales
            let stockistCount = 0;
            const stockistCountResult = await getApiData(SALES_STATS_BY_STOCKIST, {from: yearStart, to: currentDate});
            if(stockistCountResult && stockistCountResult.count){
                stockistCount = stockistCountResult.count;
            }

            // Loading 12 month order and delivery stats
            let totalYearlySale = 0;
            let totalYearlyVolume = 0;
            let totalYearlyFullfilledVolume = 0;
            const allOrderResultYearly = await getApiData(ORDER_DELIVERY_STATS, {from: yearStart, to: currentDate});
            if(allOrderResultYearly && allOrderResultYearly.data){
                totalYearlySale = allOrderResultYearly.data.all.total;
                totalYearlyVolume = allOrderResultYearly.data.all.count;
                totalYearlyFullfilledVolume = allOrderResultYearly.data.delivered.count;
            }

            // Assign tile
            setTileData({
                newOrder: newOrderThreeDaysCount,
                pendingConfirmation: pendingConfirmationCount,
                pendingFullFillment: pendingFullFillmentCount,
                delivered: deliveredThreeDaysCount,
                orderValue: totalOrderValueMTDValue
            });

            // Assign recent orders
            setRecentOrder(fewRecentOrders);

            // Assign Top Product
            setTopProducts(topProducts);
            setTopProductsTopValue(topProductsTopValue);

            // Assign Top Brand
            setTopBrand(topBrand);
            setTopBrandTotal(topBrandTotal);

            // Assign Monthwise Sales
            setChart(getChartValues(
                        monthWiseSales.map(data=>format(parseISO(data.month),"MMM")),
                        monthWiseSales.map(data=>data.total)
                    ));
            
            // Assign Stats
            setStatData({
                avgVolume: (totalYearlyVolume/12).toFixed(2),
                stockistCount: stockistCount,
                orderFullfilled: totalYearlyFullfilledVolume,
                totalSale: totalYearlySale
            });

            
        })();

    },[]);

    return (
        <div className="layout-dashboard">
            <div className="grid">
                <div className="col-12 pb-0">
                    <div className="grid">
                        <div className="col">
                            <div className="card overview-box white">
                                <div className="overview-info">
                                    <h6>New Orders (Last 3 Days)</h6>
                                    <RenderRestriction allowedRoles={[UserRole.MANUFACTURER]}>
                                        <h1>{tileData.newOrder}</h1>
                                    </RenderRestriction>
                                </div>
                                <i className="pi pi-image"></i>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card overview-box blue">
                                <div className="overview-info">
                                    <h6>Pending Confirmation</h6>
                                    <h1>{tileData.pendingConfirmation}</h1>
                                </div>
                                <i className="pi pi-users"></i>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card overview-box gray">
                                <div className="overview-info">
                                    <h6>Pending Fullfillment</h6>
                                    <h1>{tileData.pendingFullFillment}</h1>
                                </div>
                                <i className="pi pi-globe"></i>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card overview-box darkgray">
                                <div className="overview-info">
                                    <h6>Delivered (Last 3 days)</h6>
                                    <h1>{tileData.delivered}</h1>
                                </div>
                                <i className="pi pi-th-large"></i>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card overview-box orange">
                                <div className="overview-info">
                                    <h6>Order Value (MTD)</h6>
                                    <h1>{getRupee(tileData.orderValue)}</h1>
                                </div>
                                <i className="pi pi-cloud"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 md:col-3">
                    <div className="card schedule">
                        <div className="card-header">
                            <div className="card-title">
                                <h6>New Orders</h6>
                            </div>
                        </div>
                        <ul>
                            {recentOrder.map((data, index)=>
                                <li key={index}>
                                    <div className="schedule-header">
                                        <h6>{data.orderNumber}</h6>
                                        <span>{format(parseISO(data.createdAt),"hh:mm a")}</span>
                                    </div>
                                    <button className="p-link">{data.stockist.name}</button>
                                    <span><span className='font-bold mr-2'>{getRupee(data.orderTotal)}</span> <OrderStatusBadge status={data.status} size="normal" /></span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="col-12 md:col-9">
                    <div className="grid">
                        <div className="col-12">
                            <div className="card device-status">
                                <div className="grid">
                                    <div className="col-12 xl:col-9">
                                        <div className="card-header">
                                            <div className="card-title">
                                                <h6>Top moving 10 Products (Last 12 Months)</h6>
                                            </div>
                                        </div>
                                        {topProducts.sort((a,b)=>b.total-a.total).map((data, index)=>
                                            <div key={index} className="progress grid">
                                                <span className="col-3">{data.productSku.name}</span>
                                                <div className=' col-8'><ProgressBar className="progressBar" value={(data.total/topProductsTopValue)*100} showValue={false}></ProgressBar></div>
                                                <span className="col-1">{data.total}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12 xl:col-3">
                                        <div className="card-header">
                                            <div className="card-title">
                                                <h6>Brands</h6>
                                            </div>
                                        </div>
                                        <div className="grid grid-nogutter">
                                            {topBrand.sort((a,b)=>b.total-a.total).map((data,index)=>
                                                <div className="col-3 xl:col-12" key={index}>
                                                    <div className="device">
                                                        <span>
                                                            <span>{index+1}</span> {data.vehicleBrand.name}
                                                        </span>
                                                        <span className="status">{Math.round((data.total/topBrandTotal)*100,0)}%</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 md:col-12 xl:col-8">
                    <div className="grid">
                        <div className="col-12">
                            <div className="card chart">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h6>Order Value</h6>
                                        <p className="subtitle">6 Months</p>
                                    </div>
                                </div>
                                <Chart type="line" data={chart} options={chartOptions} style={{ maxHeight: '330px' }}></Chart>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                <div className="col-12 xl:col-4">
                    <div className="grid">
                        <div className="col-12 md:col-6 xl:col-12">
                            <div className="card statistics">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h6>Statistics</h6>
                                        <p className="subtitle">Sales</p>
                                    </div>
                                    <p className="subtitle">Last 12 Months</p>
                                </div>
                                <div className="grid">
                                    <div className="col-12 md:col-6">
                                        <div className="statistic-item">
                                            <div className="item-title">
                                                <span>🐳</span>
                                                <h5>{statData.avgVolume}</h5>
                                            </div>
                                            <h6>Avg volume/month</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <div className="statistic-item">
                                            <div className="item-title">
                                                <span>🖥 </span>
                                                <h5>{statData.stockistCount}</h5>
                                            </div>
                                            <h6>Stockist Count</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <div className="statistic-item">
                                            <div className="item-title">
                                                <span>🎁 </span>
                                                <h5>{statData.orderFullfilled}</h5>
                                            </div>
                                            <h6>Order Fullfilled</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <div className="statistic-item">
                                            <div className="item-title">
                                                <span>💵 </span>
                                                <h5>{getRupee(statData.totalSale)}</h5>
                                            </div>
                                            <h6>Sales total</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
