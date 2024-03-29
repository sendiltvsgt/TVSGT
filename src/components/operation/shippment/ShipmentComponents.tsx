import { FieldArray } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { FormikSetFieldValue, HandleFormChange } from "../../../common/common.type";
import { displayStatus, getRupee } from "../../../common/utils";
import { Order } from "../../../entities/OrderEntity";
import { OrderShipment } from "../../../entities/OrderShipmentEntity";
import { Calendar } from 'primereact/calendar';
import { DeliveryPartnerDropdown } from "../../general/GeneralComponents";
import { InputNumber } from "primereact/inputnumber";
import { OrderRenderMode, ShipmentRenderMode, ShippingStatus } from "../../../common/common.enum";
import { FileUpload } from "primereact/fileupload";
import { Badge, BadgeSeverityType, BadgeSizeType } from "primereact/badge";
import { BASE_API_URL } from "../../../config/api.config";

const BillingFromAddressElement = (props: {data: Order}) => {
    return (
        <div className="p-fluid p-component mt-3">
            <p className="font-bold">{props.data.billFromName}</p>
            <p className="line-height-3">
                <>
                    {props.data.billFromAddressText},<br />
                    {props.data.billFromCity}, {props.data.billFromState.name}<br />
                    Zip - {props.data.billingZip}<br />
                    GST No - {props.data.billingGstNumber}<br />
                </>
            </p>
        </div>
    );
}

const ShippingToAddressElement = (props: {data: Order}) => {
    return (
        <div className="p-fluid p-component mt-3">
            <p className="font-bold">{props.data.shippingName}</p>
            <p className="line-height-3">
                <>
                    {props.data.shippingAddressText},<br />
                    {props.data.shippingCity}, {props.data.shippingState.name}<br />
                    Zip - {props.data.shippingZip}<br />
                    GST No - {props.data.shippingGstNumber}<br />
                </>
            </p>
        </div>
    );
}

const BillingToAddressElement = (props: {data: Order}) => {
    return (
        <div className="p-fluid p-component mt-3">
            <p className="font-bold">{props.data.billingName}</p>
            <p className="line-height-3">
                <>
                    {props.data.billingAddressText},<br />
                    {props.data.billingCity}, {props.data.billingState.name}<br />
                    Zip - {props.data.billingZip}<br />
                    GST No - {props.data.billingGstNumber}<br />
                </>
            </p>
        </div>
    );
}

export const OrderShipmentDetails = (props: {values: Partial<OrderShipment>}) => {
    return (
        <>
            <div className="grid p-fluid mt-5 min-h-30rem pb-3 border-bottom-1">
                <div className="col-4 md:col-4">

                    <div className="field grid">
                        <label htmlFor="manufacturer" className="col-4 mb-2 md:col-4 md:mb-0">
                            Manufacturer
                        </label>
                        <div className="col-8 md:col-8">
                            <InputText disabled={true} name="manufacturer" value={props.values.order?.manufacturer.name} />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="billFromAddress" className="mr-1 text-lg font-semibold">Billing From</label>
                        <>
                            {(props.values.order)?<BillingFromAddressElement data={props.values.order} />:null}
                        </>
                    </div>
                    
                </div>
                
                <div className="col-4 md:col-4 border-left-1">

                    <div className="field grid">
                        <label htmlFor="stockist" className="col-4 mb-2 md:col-4 md:mb-0">
                            Stockist
                        </label>
                        <div className="col-8 md:col-8">
                            <InputText disabled={true} name="stockist" value={props.values.order?.stockist.name} />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="shippingAddress" className="mr-1 text-lg font-semibold">Shipping Address</label>
                        <>
                            {(props.values.order)?<ShippingToAddressElement data={props.values.order} />:null}
                        </>
                    </div>

                </div>

                <div className="col-4 md:col-4 mt-6 pt-4">

                    <div className="field">
                        <label htmlFor="billingAddress" className="mr-1 text-lg font-semibold">Billing Address</label>
                        <>
                            {(props.values.order)?<BillingToAddressElement data={props.values.order} />:null}
                        </>
                    </div>

                </div>

            </div>

        </>
    );
}

export const OrderShipmentOtherDetailsView = (props: {values: Partial<OrderShipment>, handleChange?: HandleFormChange, setFieldValue?: FormikSetFieldValue}) => {
    return (
        <div className="grid p-fluid mt-2 pb-4 min-h-20rem border-bottom-1">
            <div className="col-4 md:col-4">
                <p className="mt-2 mb-1"><span className="font-bold">Shipment Number:</span></p><InputText disabled={true} name="shipmentNumber" value={props.values.shipmentNumber} onChange={props.handleChange} />
                <p className="mt-2 mb-1"><span className="font-bold">Tracking Number:</span></p><InputText disabled={true} name="trackingNumber" value={props.values.trackingNumber} onChange={props.handleChange} />
                <p className="mt-2 mb-1"><span className="font-bold">Shipping Date:</span></p><Calendar disabled={true} name="shippingDate" dateFormat="dd/mm/yy" value={new Date(props.values.shippingDate!)} />
            </div>

            <div className="col-4 md:col-4">
                {props.values.orderInvoice?.invoiceFileLink && <a className='p-button' rel="noreferrer" href={BASE_API_URL+"/order/invoice/download/"+props.values.orderInvoice?.id} target="_blank">Invoice</a>}
            </div>

            <div className="col-4 md:col-4">
                <p className="mt-2 mb-1"><span className="font-bold">Delivery Partner:</span></p> <DeliveryPartnerDropdown disabled={true} name="deliveryPartner" value={props.values.deliveryPartner} />
                <p className="mt-2 mb-1"><span className="font-bold">Invoice Number:</span></p><InputText disabled={true} name="orderInvoice.invoiceNumber" value={props.values.orderInvoice?.invoiceNumber} />
                <p className="mt-2 mb-1"><span className="font-bold">Invoice Date:</span></p><Calendar disabled={true} name="orderInvoice.invoiceDate" dateFormat="dd/mm/yy" value={new Date(props.values.orderInvoice?.invoiceDate!)} />
            </div>
        </div>
    );
}

export const OrderShipmentOtherDetails = (props: {values: Partial<OrderShipment>, handleChange?: HandleFormChange, setFieldValue?: FormikSetFieldValue}) => {
    const customBase64Uploader = async ( uploadedFile: any,  setFieldValue: any, name: string) => {
        const file = uploadedFile;
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = function () {
            const base64data = reader.result;
            setFieldValue(name, base64data);
        };
    };

    return (
        <div className="grid p-fluid mt-2 pb-4 min-h-20rem border-bottom-1">
            <div className="col-4 md:col-4">
                <p className="mt-2 mb-1"><span className="font-bold">Shipment Number <span className="text-orange-500">*</span>:</span></p><InputText required name="shipmentNumber" value={props.values.shipmentNumber} onChange={props.handleChange} />
                <p className="mt-2 mb-1"><span className="font-bold">Tracking Number <span className="text-orange-500">*</span>:</span></p><InputText name="trackingNumber" value={props.values.trackingNumber} onChange={props.handleChange} />
                <p className="mt-2 mb-1"><span className="font-bold">Shipping Date <span className="text-orange-500">*</span>:</span></p><Calendar name="shippingDate" dateFormat="dd/mm/yy" value={new Date(props.values.shippingDate!)} onChange={props.handleChange} />
            </div>

            <div className="col-4 md:col-4">
                <p className="mt-2 mb-1"><span className="font-bold">Invoice Upload:</span></p>
                <FileUpload name="file" mode="basic" accept="application/pdf" maxFileSize={1000000} chooseLabel="Upload" uploadLabel="Upload" cancelLabel="Cancel" chooseOptions={{icon: 'pi pi-fw pi-plus', className: 'p-button-primary'}} onSelect={(event) => {customBase64Uploader(event.files[0], props.setFieldValue, "file");}} />
            </div>

            <div className="col-4 md:col-4">
                <p className="mt-2 mb-1"><span className="font-bold">Delivery Partner <span className="text-orange-500">*</span>:</span></p> <DeliveryPartnerDropdown name="deliveryPartner" value={props.values.deliveryPartner} onChange={props.handleChange} />
                <p className="mt-2 mb-1"><span className="font-bold">Invoice Number <span className="text-orange-500">*</span>:</span></p><InputText name="orderInvoice.invoiceNumber" value={props.values.orderInvoice?.invoiceNumber} onChange={props.handleChange} />
                <p className="mt-2 mb-1"><span className="font-bold">Invoice Date <span className="text-orange-500">*</span>:</span></p><Calendar name="orderInvoice.invoiceDate" dateFormat="dd/mm/yy" value={new Date(props.values.orderInvoice?.invoiceDate!)} onChange={props.handleChange} />
            </div>
        </div>
    );
}

export const OrderShipmentLineItemElememt = (props: {values: Partial<OrderShipment>, handleChange: HandleFormChange, setFieldValue: FormikSetFieldValue, orderValue?: Order}) => {
    return (
        <React.Fragment>
            <h4 className='text-center'>Item(s)</h4>
            <FieldArray name="lineItems" >
                {({ insert, remove, push }) =>
                    (
                        <React.Fragment>
                            <div className="grid p-fluid border-bottom-1 border-200 mb-3">
                                <div className="col-3 md:col-3"><span className="font-bold">Product</span></div>
                                <div className="col-2 md:col-2"><span className="font-bold">Shipment Quantity</span></div>
                                <div className="col-1 md:col-1"><span className="font-bold">Fullfilled Quanity</span></div>
                                <div className="col-1 md:col-1"><span className="font-bold">Available Quanity</span></div>
                                <div className="col-1 md:col-1 text-right"><span className="font-bold">Tax Rate</span></div>
                                <div className="col-1 md:col-1 text-right"><span className="font-bold">Price</span></div>
                                <div className="col-1 md:col-1 text-right"><span className="font-bold">Total</span></div>
                                <div className="col-2 md:col-2 text-right"><span className="font-bold">Total with Tax</span></div>
                                {/* <div className="col-1 md:col-1"></div> */}
                            </div>

                        {props.values.lineItems && props.values.lineItems.length > 0 &&
                            props.values.lineItems.map((lineItem, index) => (
                                <div key={index}>
                                    <div className="grid p-fluid">

                                        <div className="col-3 md:col-3 my-auto">
                                            {lineItem.productSku?.name}
                                        </div>

                                        <div className="col-2 md:col-2">
                                            <div className="field grid">
                                                <div className="col-12 md:col-12">
                                                    <InputNumber max={lineItem.quantity} name={`lineItems.${index}.quantity`} value={lineItem.quantity} onChange={({originalEvent, value})=>{if(props.setFieldValue)props.setFieldValue(originalEvent.currentTarget.getAttribute('name')!, value)}} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-1 md:col-1 vertical-align-text-top text-right my-auto">
                                            {(props.orderValue?.lineItems[index])?props.orderValue.lineItems[index].fullfilledQuantity:0}
                                            {" "}
                                            {lineItem.productSku.uom}
                                        </div>

                                        <div className="col-1 md:col-1 vertical-align-text-top text-right my-auto">
                                            {(props.orderValue?.lineItems[index])?props.orderValue.lineItems[index].acceptedQuantity:0}
                                            {" "}
                                            {lineItem.productSku.uom}
                                        </div>

                                        <div className="col-1 md:col-1 vertical-align-text-top text-right my-auto">
                                            {lineItem.productSku?.taxRate?.name}
                                        </div>

                                        <div className="col-1 md:col-1 text-right my-auto">
                                            {getRupee(lineItem.productSku?.price)}                      
                                        </div>

                                        <div className="col-1 md:col-1 text-right my-auto">
                                            {getRupee(lineItem.productSku?.price * lineItem.quantity)}
                                        </div>

                                        <div className="col-2 md:col-2 text-right my-auto">
                                            {getRupee(lineItem.productSku?.price * lineItem.quantity)}
                                        </div>

                                        {/* <div className="col-1 md:col-1">
                                            <Button type='button' className='m-1' icon="pi pi-minus" onClick={()=>remove(index)}></Button>
                                        </div> */}

                                    </div>
                                </div>
                            ))}

                            </React.Fragment>
                    )        
                }
            </FieldArray>

            <div className="font-bold text-right">
                <div className="grid p-fluid">
                    <div className="col-2 md:col-2 col-offset-8 my-auto">IGST</div>
                    <div className="col-2 md:col-2">{getRupee(props.values.orderInvoice?.igst)}</div>
                </div>
                <div>
                    <div className="grid p-fluid">
                        <div className="col-2 md:col-2 col-offset-8 my-auto">CGST</div>
                        <div className="col-2 md:col-2">{getRupee(props.values.orderInvoice?.cgst)}</div>
                    </div>
                </div>
                <div>
                    <div className="grid p-fluid">
                        <div className="col-2 md:col-2 col-offset-8 my-auto">SGST</div>
                        <div className="col-2 md:col-2">{getRupee(props.values.orderInvoice?.sgst)}</div>
                    </div>
                </div>
                <div className="grid p-fluid">
                    <div className="col-2 md:col-2 col-offset-8 my-auto">Shipping Charges(₹)</div>
                    <div className="col-2 md:col-2"><InputNumber inputClassName="text-right" name="orderInvoice.shippingCharges" value={props.values.orderInvoice?.shippingCharges} onChange={({originalEvent, value})=>{if(props.setFieldValue)props.setFieldValue(originalEvent.currentTarget.getAttribute('name')!, value)}} /></div>
                </div>
                <div className="grid p-fluid">
                    <div className="col-2 md:col-2 col-offset-8 my-auto">Discount(₹)</div>
                    <div className="col-2 md:col-2"><InputNumber name="orderInvoice.discount" inputClassName="text-right" value={props.values.orderInvoice?.discount} onChange={({originalEvent, value})=>{if(props.setFieldValue)props.setFieldValue(originalEvent.currentTarget.getAttribute('name')!, value)}} /></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export const OrderShipmentLineItemElememtView = React.memo((props: {values: Partial<OrderShipment>}) => {
    return (
        <React.Fragment>
            <h4 className='text-center'>Item(s)</h4>
            
                        <React.Fragment>
                            <div className="grid p-fluid border-bottom-1 border-200 mb-3">
                                <div className="col-3 md:col-3"><span className="font-bold">Product</span></div>
                                <div className="col-2 md:col-2"><span className="font-bold">Shipment Quantity</span></div>
                                <div className="col-1 md:col-1 text-right"><span className="font-bold">Tax Rate</span></div>
                                <div className="col-1 md:col-1 text-right"><span className="font-bold">Price</span></div>
                                <div className="col-2 md:col-2 text-right"><span className="font-bold">Total</span></div>
                                <div className="col-2 md:col-2 text-right"><span className="font-bold">Total with Tax</span></div>
                                <div className="col-1 md:col-1"></div>
                            </div>

                            {props.values.lineItems && props.values.lineItems.length > 0 && props.values.lineItems.map((lineItem, index) => (
                                <div className="grid p-fluid" key={lineItem.id}>

                                    <div className="col-3 md:col-3 my-auto">
                                        {lineItem.productSku?.name}
                                    </div>

                                    <div className="col-2 md:col-2">
                                        <div className="field grid">
                                            <div className="col-12 md:col-12">
                                                {lineItem.quantity}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-1 md:col-1 vertical-align-text-top text-right my-auto">
                                        {lineItem.productSku?.taxRate?.name}
                                    </div>

                                    <div className="col-1 md:col-1 text-right my-auto">
                                        {getRupee(lineItem.productSku?.price)}                      
                                    </div>

                                    <div className="col-2 md:col-2 text-right my-auto">
                                        {getRupee(lineItem.productSku?.price * lineItem.quantity)}
                                    </div>

                                    <div className="col-2 md:col-2 text-right my-auto">
                                        {getRupee(lineItem.productSku?.price * lineItem.quantity)}
                                    </div>

                                </div>
                            ))}   

                        </React.Fragment>

        </React.Fragment>
    )
});

export const OrderShipmentStatusBadge = (props: {status?: ShippingStatus, size?: BadgeSizeType}) => {
    let status = props.status;
    let severity: BadgeSeverityType | undefined = undefined;
    switch(status){
        case ShippingStatus.INITIATED:
            severity = "warning";
            break;
        case ShippingStatus.DELIVERED:
            severity = "success";
            break;
    }

    return (
        <>
            <Badge value={displayStatus(status)} severity={severity?severity:undefined} size={props.size?props.size:"normal"} />
        </>
    )
}