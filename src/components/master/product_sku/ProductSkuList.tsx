import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { dateFormater } from '../../../common/utils';
import { FURL_PRODUCT_SKU_ADD, FURL_PRODUCT_SKU_EDIT_WITHOUT_PARAMS } from '../../../config/route.config';
import { PRODUCT_SKU_DELETE_API, PRODUCT_SKU_LIST_API, STORE_URL } from '../../../config/api.config';
import { ProductSku } from '../../../entities/ProductSkuEntity';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';

const ProductSkuList = () => {
    const title: string = "Product SKU";
    const listUrl: string = PRODUCT_SKU_LIST_API;
    const [reload, setReload] = useState<boolean>(false);

    const actionContent = (rowData: ProductSku) => {
        return (
            <div className='flex-wrap'>
                <a href={STORE_URL+"/shop/products/"+rowData.id} target='_blank'  className='p-button m-1' rel="noreferrer">View</a>
                <Link to={FURL_PRODUCT_SKU_EDIT_WITHOUT_PARAMS+rowData.id} className='p-button p-button-info m-1'>Edit</Link>
                <Button onClick={(event)=>commonDeleteFn<ProductSku>(event, rowData, PRODUCT_SKU_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_PRODUCT_SKU_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    return(
        <>
            <GeneralList<ProductSku> title={title} reload={reload} rightToolBarElements={rightToolbarElement} listUrl={listUrl} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="#ID" field="id" sortable filter showFilterMatchModes={false} />
                    <Column header="Name" field="name" sortable filter showFilterMatchModes={false} />
                    <Column header="Code" field="code" sortable filter showFilterMatchModes={false} />
                    <Column header="Short Description" field="shortDescription" sortable filter showFilterMatchModes={false} />
                    <Column header="Price" field="price" sortable filter showFilterMatchModes={false} />
                    <Column header="Manufacturer" field="manufacturer.name" sortable filter showFilterMatchModes={false} />
                    <Column header="Vehicle Model" field="vehicleModel.name" sortable filter showFilterMatchModes={false} />
                    
                    <Column header="Date" field="createdAt" dataType="date" body={dateFormater} />
                    <Column header="Action" body={actionContent} />
                </DataTable>
            )}/>
        </>
    );
};
export default ProductSkuList;