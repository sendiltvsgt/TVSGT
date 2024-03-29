import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { MANUFACTURER_ADDRESS_DELETE_API, MANUFACTURER_ADDRESS_LIST_API } from '../../../config/api.config';
import { ManufacturerAddress } from '../../../entities/ManufacturerAddressEntity';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';

const ManufacturerAddressList = (props: {manufacturerId?: number, isDialog?: boolean}) => {
    const title: string = "Manufacturer Address";
    let listUrl: string = MANUFACTURER_ADDRESS_LIST_API;
    const [reload, setReload] = useState<boolean>(false);

    //Pre filter the list by manufacturerId
    if(props.manufacturerId){
        listUrl = listUrl + "/" + props.manufacturerId;
    }

    const actionContent = (rowData: ManufacturerAddress) => {
        return (
            <div className='flex-wrap'>
                <Button onClick={(event)=>commonDeleteFn<ManufacturerAddress>(event, rowData, MANUFACTURER_ADDRESS_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    return(
        <>
            <GeneralList<ManufacturerAddress> title={title} reload={reload} listUrl={listUrl} hideToolBar={props.isDialog} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="Address Title" field="addressTitle" sortable filter showFilterMatchModes={false} />
                    <Column header="Address" field="address" sortable filter showFilterMatchModes={false} />
                    <Column header="City" field="city" sortable filter showFilterMatchModes={false} />
                    <Column header="State" field="state.name" sortable filter showFilterMatchModes={false} />
                    <Column header="Zip" field="zip" sortable filter showFilterMatchModes={false} />
                    <Column header="Phone" field="phone" sortable filter showFilterMatchModes={false} />
                    <Column header="Action" style={{ 'minWidth': '15rem' }} body={actionContent} />
                </DataTable>
            )}/>
        </>
    );
};
export default ManufacturerAddressList;