import { FieldArray } from "formik";
import { Badge, BadgeSeverityType, BadgeSizeType } from "primereact/badge";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import React, { useEffect, useState } from "react";
import { OrderRenderMode, OrderRenderModeRole, OrderStatus } from "../../../common/common.enum";
import { FormikSetFieldValue, HandleFormChange } from "../../../common/common.type";
import { displayDate, displayStatus, getRupee, roundNumber, valueForDropdown } from "../../../common/utils";
import { ManufacturerAddress } from "../../../entities/ManufacturerAddressEntity";
import { Order } from "../../../entities/OrderEntity";
import { StockistAddress } from "../../../entities/StockistAddressEntity";
import { ManufacturerDropdown, ManufacturerAddressDropdown, StockistDropdown, StockistAddressDropdown, ProductSkuDropdown } from "../../general/GeneralComponents";

const ManufacturerAddressElement = (props: {data: ManufacturerAddress}) => {
    return (
        <div className="p-fluid p-component mt-3">
            <p className="font-bold">{props.data.manufacturer.name}</p>
            <p className="line-height-3">
                {props.data.addressTitle},<br />
                {props.data.address},<br />
                {props.data.city}, {props.data.state.name}<br />
                Zip - {props.data.zip}<br />
                GST No - {props.data.gstNumber}<br />
            </p>
        </div>
    );
}

const StockistAddressElement = (props: {data: StockistAddress}) => {
    return (
        <div className="p-fluid p-component mt-3">
            <p className="font-bold">{props.data.stockist.name}</p>
            <p className="line-height-3">
                {props.data.addressTitle},<br />
                {props.data.address},<br />
                {props.data.city}, {props.data.state.name}<br />
                Zip - {props.data.zip}<br />
                GST No - {props.data.gstNumber}<br />
            </p>
        </div>
    );
}

export const OrderDetails = (props: {values: Partial<Order>, handleChange: HandleFormChange, orderRenderMode?: OrderRenderMode, orderRenderModeRole?: OrderRenderModeRole}) => {
    return (
        <>
            <div className="grid p-fluid mt-5 min-h-30rem pb-3 border-bottom-1">
                <div className="col-4 md:col-4">
                    
                    <div className="field grid">
                        <label htmlFor="manufacturer" className="col-4 mb-2 md:col-4 md:mb-0">
                            Manufacturer
                        </label>
                        <div className="col-8 md:col-8">
                            <ManufacturerDropdown 
                                disabled={(props.orderRenderMode === OrderRenderMode.VIEW || props.orderRenderMode === OrderRenderMode.EDIT || props.orderRenderModeRole === OrderRenderModeRole.MANUFACTURER)?true:false}
                                name="manufacturer"
                                value={valueForDropdown(props.values.manufacturer)}
                                onChange={props.handleChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="billFromAddress" className="mr-1">Billing From</label>
                        <div>
                            {(props.values.manufacturer)?
                                <ManufacturerAddressDropdown
                                    disabled={((props.orderRenderMode ===  OrderRenderMode.VIEW) || (props.orderRenderMode === OrderRenderMode.EDIT && props.orderRenderModeRole === OrderRenderModeRole.MANUFACTURER))?true:false}
                                    manufacturerId={props.values.manufacturer.id}
                                    name="billFromAddress"
                                    value={valueForDropdown(props.values.billFromAddress)}
                                    onChange={props.handleChange} 
                                />
                            :<p className='mt-2'>Select manufacturer for address</p>}
                        </div>
                        <>
                            {(props.values.billFromAddress && props.values.billFromAddress.manufacturer)?<ManufacturerAddressElement data={props.values.billFromAddress} />:null}
                        </>
                    </div>
                    
                </div>

                <div className="col-4 md:col-4 border-left-1">
                    <div className="field grid">
                        <label htmlFor="stockist" className="col-4 mb-2 md:col-4 md:mb-0">
                            Stockist
                        </label>
                        <div className="col-8 md:col-8">
                            <StockistDropdown 
                                disabled={(props.orderRenderMode === OrderRenderMode.VIEW || props.orderRenderMode === OrderRenderMode.EDIT)?true:false}
                                name="stockist"
                                value={valueForDropdown(props.values.stockist)}
                                onChange={props.handleChange} 
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="billingAddress" className="mr-1">Billing Address</label>
                        <div>
                            {(props.values.stockist)?
                                <StockistAddressDropdown
                                    disabled={((props.orderRenderMode ===  OrderRenderMode.VIEW) || (props.orderRenderMode === OrderRenderMode.EDIT && props.orderRenderModeRole === OrderRenderModeRole.MANUFACTURER))?true:false}
                                    stockistId={props.values.stockist.id}
                                    name="billingAddress"
                                    value={valueForDropdown(props.values.billingAddress)}
                                    onChange={props.handleChange} 
                                />
                            :<p className='mt-2'>Select stockist for address</p>}
                        </div>
                        <>
                            {(props.values.billingAddress && props.values.billingAddress.stockist)?<StockistAddressElement data={props.values.billingAddress} />:null}
                        </>
                    </div>

                </div>

                <div className="col-4 md:col-4">
                    <div className="field grid h-2rem mt-1"></div>

                    <div className="field">
                        <label htmlFor="shippingAddress" className="mr-1">Shipping Address</label>

                        <div>
                            {(props.values.stockist)?
                                <StockistAddressDropdown
                                    disabled={((props.orderRenderMode ===  OrderRenderMode.VIEW) || (props.orderRenderMode === OrderRenderMode.EDIT && props.orderRenderModeRole === OrderRenderModeRole.MANUFACTURER))?true:false}
                                    stockistId={props.values.stockist.id}
                                    name="shippingAddress"
                                    value={valueForDropdown(props.values.shippingAddress)}
                                    onChange={props.handleChange} 
                                />
                            :<p className='mt-2'>Select stockist for address</p>}
                        </div>
                        <>
                            {(props.values.shippingAddress && props.values.shippingAddress.stockist)?<StockistAddressElement data={props.values.shippingAddress} />:null}
                        </>
                    </div>

                </div>

            </div>

        </>
    );
}

export const OrderOtherDetails = (props: {values: Partial<Order>, handleChange: HandleFormChange, setFieldValue: FormikSetFieldValue, orderRenderMode?: OrderRenderMode}) => {
    return (
        <div className="grid p-fluid mt-2 min-h-20rem border-bottom-1">
            <div className="col-4 md:col-4">
                <p><span className="font-bold">Order Placed By:</span> {props.values.placedBy?.firstName}</p>
                <p><span className="font-bold">Order Placed On:</span> {displayDate(props.values.createdAt)}</p>
                <p><span className="font-bold">Est Shipping Date:</span> 
                <Calendar className="mt-2" name="estimatedShippingDate" dateFormat="dd/mm/yy" disabled={(props.orderRenderMode ===  OrderRenderMode.VIEW)?true:false} value={new Date(props.values.estimatedShippingDate!)} onSelect={({value})=>{props.setFieldValue('estimatedShippingDate', value)}} />
                </p>
            </div>

            <div className="col-4 md:col-4">
                <p><span className="font-bold">Order Confirmed By:</span> {props.values.confirmedBy?.firstName}</p>
                <p><span className="font-bold">Order Confirmed On:</span> {displayDate(props.values.createdAt)}</p>
            </div>

            <div className="col-4 md:col-4">
                <p><span className="font-bold">Order Total (incl. GST):</span> {getRupee(props.values.orderTotal)}</p>
                <p><span className="font-bold">Order Fullfilled On:</span> {props.values.fulfilmentDate?.toString()}</p>
                <p><span className="font-bold">Est Delivery Date:</span> 
                    <Calendar className="mt-2" name="estimatedDeliveryDate" dateFormat="dd/mm/yy" disabled={(props.orderRenderMode ===  OrderRenderMode.VIEW)?true:false} value={new Date(props.values.estimatedDeliveryDate!)} onSelect={({value})=>{props.setFieldValue('estimatedDeliveryDate', value)}} />
                </p>
            </div>

            <div className="col-12 md:col-12">
                <p><b>Customer Note:</b> {props.values.customerNotes || 'N/A'}</p>
            </div>
        </div>
    );
}

export const OrderLineItemElememt = React.memo((props: {values: Partial<Order>, handleChange: HandleFormChange, setFieldValue: FormikSetFieldValue, setFieldTouched: any, orderRenderMode?: OrderRenderMode}) => {
    console.log('OrderLineItemElememt', props.values.lineItems);
    return (
        <React.Fragment>
            <h4 className='text-center'>Item(s)</h4>
            <FieldArray name="lineItems" >
                {({ insert, remove, push }) =>
                    (
                        <React.Fragment>
                            <div className="grid p-fluid border-bottom-1 border-200 mb-3">
                                <div className="col-5 md:col-4"><span className="font-bold">Product</span></div>
                                <div className="col-1 md:col-1"><span className="font-bold">Ordered Qty</span></div>
                                <div className="col-1 md:col-2"><span className="font-bold">Available Qty</span></div>
                                <div className="col-1 md:col-1 text-right"><span className="font-bold">Price</span></div>
                                <div className="col-1 md:col-1 text-right"><span className="font-bold">Tax Rate</span></div>
                                {/* <div className="col-2 md:col-1 text-right"><span className="font-bold">Total</span></div> */}
                                <div className="col-2 md:col-2 text-right"><span className="font-bold">Total with Tax</span></div>
                                <div className="col-1 md:col-1"></div>
                            </div>

                        {props.values.lineItems && props.values.lineItems.length > 0 &&
                            props.values.lineItems.map((lineItem, index) => (
                                <div key={index}>
                                    <div className="grid p-fluid">

                                        <div className="col-5 md:col-4">
                                            {/* <ProductSkuDropdown manfacturerId={props.values.manufacturer!.id} disabled={(props.orderRenderMode === OrderRenderMode.EDIT || props.orderRenderMode ===  OrderRenderMode.VIEW)?true:false} name={`lineItems.${index}.productSku`} value={valueForDropdown(lineItem.productSku)} onChange={props.handleChange} /> */}
                                            {(props.orderRenderMode === OrderRenderMode.VIEW || props.orderRenderMode === OrderRenderMode.EDIT) ? <p>{lineItem.productSku.name}</p>:<ProductSkuDropdown manfacturerId={props.values.manufacturer!.id} name={`lineItems.${index}.productSku`} value={valueForDropdown(lineItem.productSku)} onChange={props.handleChange} />}
                                        </div>

                                        <div className="col-1 md:col-1">
                                            <InputNumber min={0} type="text" name={`lineItems.${index}.orderedQuantity`} inputClassName="text-right" disabled={(props.orderRenderMode === OrderRenderMode.EDIT || props.orderRenderMode ===  OrderRenderMode.VIEW)?true:false} value={lineItem.orderedQuantity} onChange={({originalEvent, value})=>{if(props.setFieldValue)props.setFieldValue(originalEvent.currentTarget.getAttribute('name')!, value)}} />
                                        </div>

                                        <div className="col-1 md:col-2">
                                            <InputNumber min={0} max={lineItem.orderedQuantity} name={`lineItems.${index}.acceptedQuantity`} inputClassName="text-right" disabled={(props.orderRenderMode === OrderRenderMode.ADD || props.orderRenderMode === OrderRenderMode.VIEW)?true:false} value={lineItem.acceptedQuantity!} onChange={({originalEvent, value})=>{if(props.setFieldValue){props.setFieldValue(originalEvent.currentTarget.getAttribute('name')!, value);props.setFieldTouched(originalEvent.currentTarget.getAttribute('name')!,true);}}} />
                                            {
                                                ((props.values.status === OrderStatus.PARTIALLY_SHIPPED) || (props.values.status === OrderStatus.SHIPPED) || (props.values.status === OrderStatus.DELIVERED)) &&
                                                <p className="text-center font-bold">Shipped Qty: {lineItem.fullfilledQuantity?lineItem.fullfilledQuantity:0} {lineItem.productSku?.uom}</p>}
                                        </div>

                                        <div className="col-1 md:col-1 text-right my-auto">
                                            {getRupee(lineItem.productSku?.price)}                      
                                        </div>

                                        <div className="col-1 md:col-1 vertical-align-text-top text-right my-auto">
                                            {lineItem.productSku?.taxRate?.name}
                                        </div>

                                        {/* <div className="col-1 md:col-1 text-right my-auto">
                                            {getRupee(lineItem.productSku?.price*lineItem.orderedQuantity)}
                                        </div> */}

                                        <div className="col-2 md:col-2 text-right my-auto">
                                            {
                                                getRupee(
                                                    ((lineItem.lineItemTotal === undefined)?
                                                        (lineItem.productSku?.price*lineItem.orderedQuantity*(1+(((lineItem.productSku && lineItem.productSku.taxRate)?lineItem.productSku.taxRate.rate:0)/100)))
                                                        :lineItem.lineItemTotal)
                                                )
                                            }
                                        </div>

                                        <div className="col-1 md:col-1">
                                            {props.orderRenderMode === OrderRenderMode.ADD && <Button type='button' className='m-1' icon="pi pi-minus" onClick={()=>remove(index)}></Button>}
                                        </div>

                                    </div>
                                </div>
                            ))}

                            <div className="col-2">
                                {props.orderRenderMode === OrderRenderMode.ADD && <Button type='button' iconPos="right" className='p-button-rounded p-button-sm' label="Add" icon="pi pi-plus" onClick={()=>push({productSku: null,orderedQuantity: 0})}></Button>}
                            </div>
                            </React.Fragment>
                    )        
                }
            </FieldArray>

            <div className="font-bold text-right">
                {
                    props.orderRenderMode !== OrderRenderMode.ADD && 
                    <React.Fragment>
                        <div className="grid p-fluid">
                            <div className="col-2 md:col-2 col-offset-8">Order Value</div>
                            <div className="col-2 md:col-2">{getRupee(props.values.orderValue)}</div>
                        </div>
                        <div className="grid p-fluid">
                            <div className="col-2 md:col-2 col-offset-8">SGST</div>
                            <div className="col-2 md:col-2">{getRupee(props.values.sgst)}</div>
                        </div>
                        <div className="grid p-fluid">
                            <div className="col-2 md:col-2 col-offset-8">CGST</div>
                            <div className="col-2 md:col-2">{getRupee(props.values.cgst)}</div>
                        </div>
                        <div className="grid p-fluid">
                            <div className="col-2 md:col-2 col-offset-8">IGST</div>
                            <div className="col-2 md:col-2">{getRupee(props.values.igst)}</div>
                        </div>
                    </React.Fragment>
                }

                <div className="grid p-fluid">
                    <div className="col-2 md:col-2 col-offset-8 my-auto">Shipping Charges(₹)</div>
                    <div className="col-2 md:col-2"><InputNumber disabled={(props.orderRenderMode === OrderRenderMode.VIEW)?true:false} inputClassName="text-right" name="shippingCharges" value={props.values.shippingCharges} onChange={({originalEvent, value})=>{if(props.setFieldValue)props.setFieldValue(originalEvent.currentTarget.getAttribute('name')!, value)}} /></div>
                </div>
                <div className="grid p-fluid">
                    <div className="col-2 md:col-2 col-offset-8 my-auto">Discount(₹)</div>
                    <div className="col-2 md:col-2"><InputNumber disabled={(props.orderRenderMode === OrderRenderMode.VIEW)?true:false} name="discount" inputClassName="text-right" value={props.values.discount} onChange={({originalEvent, value})=>{if(props.setFieldValue)props.setFieldValue(originalEvent.currentTarget.getAttribute('name')!, value)}} /></div>
                </div>
                <div className="grid p-fluid">
                    <div className="col-2 md:col-2 col-offset-8"><h3>Order Total</h3></div>
                    <div className="col-2 md:col-2 my-auto">
                        {getRupee(roundNumber( ((props.values.orderTotal) || ((props.values.lineItems)?props.values.lineItems!.reduce((total,{productSku,orderedQuantity})=>total+((productSku?.price*orderedQuantity*(1+((productSku && productSku.taxRate)?(productSku.taxRate.rate/100):0)))||0),0):0) + ((props.values.shippingCharges?props.values.shippingCharges:0) - (props.values.discount?props.values.discount:0)))))}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
});

export const OrderStatusBadge = (props: {status?: OrderStatus, size?: BadgeSizeType}) => {
    let status = props.status;
    let severity: BadgeSeverityType | undefined = undefined;
    switch(status){
        case OrderStatus.PENDING_CONFIRMATION:
            severity = "warning";
            break;
        case OrderStatus.PAYMENT_RECEIVED:
            severity = "success";
            break;
        case OrderStatus.PARTIALLY_SHIPPED:
            severity = "info";
            break;
        case OrderStatus.SHIPPED:
            severity = "success";
            break;
        case OrderStatus.DELIVERED:
            severity = "success";
            break;
        case OrderStatus.CANCELLED:
            severity = "danger";
            break;
    }

    return (
        <>
            <Badge value={displayStatus(status)} severity={severity?severity:undefined} size={props.size?props.size:"normal"} />
        </>
    )
}

export const ConfirmOrderDialog = (props: {data: Partial<Order>, display: boolean, changeOrderStatus: (data: Partial<Order>, status: OrderStatus) => void, setConfirmOrderDialogState: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <Dialog header="Confirm Order" visible={props.display} style={{width: '50vw'}} modal={true} onHide={() => props.setConfirmOrderDialogState(false)}>
            <React.Fragment>
                <div className="grid p-fluid border-bottom-1 border-200 mb-3">
                    <div className="col-6 md:col-6"><span className="font-bold">Product</span></div>
                    <div className="col-3 md:col-3 text-right"><span className="font-bold">Ordered Qty</span></div>
                    <div className="col-3 md:col-3 text-right"><span className="font-bold">Available Qty</span></div>
                </div>
                {props.data.lineItems && props.data.lineItems.length > 0 &&
                        props.data.lineItems.map((lineItem, index) => (
                            <div key={index}>
                                <div className="grid p-fluid">

                                    <div className="col-6 md:col-6">
                                        <p className="font-bold">{lineItem.productSku.name}</p>
                                    </div>

                                    <div className="col-3 md:col-3">
                                        <p className='text-right'>{lineItem.orderedQuantity}</p>
                                    </div>

                                    <div className="col-3 md:col-3">
                                        <p className="font-bold text-right">{lineItem.acceptedQuantity}</p>
                                    </div>

                                </div>
                            </div>
                        )
                    )
                }
                <div className="flex justify-content-center">
                    <Button type='button' className="p-button-primary mt-5 m-1" label="Edit Order" onClick={()=>props.setConfirmOrderDialogState(false)} />
                    <Button type='button' className="p-button-success mt-5 m-1" label="Confirm Order" onClick={()=>props.changeOrderStatus(props.data,OrderStatus.CONFIRMED)} />
                </div>
            </React.Fragment>

        </Dialog>
    )
}