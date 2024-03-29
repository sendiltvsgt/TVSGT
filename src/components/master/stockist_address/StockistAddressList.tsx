import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';
import { STOCKIST_ADDRESS_DELETE_API, STOCKIST_ADDRESS_LIST_API } from '../../../config/api.config';
import { StockistAddress } from '../../../entities/StockistAddressEntity';

const StockistAddressList = (props: {stockistId?: number, isDialog?: boolean}) => {
    const title: string = "Stockist Address";
    let listUrl: string = STOCKIST_ADDRESS_LIST_API;
    const [reload, setReload] = useState<boolean>(false);

    //Pre filter the list by stockistId
    if(props.stockistId){
        listUrl = listUrl + "/" + props.stockistId;
    }

    const actionContent = (rowData: StockistAddress) => {
        return (
            <div className='flex-wrap'>
                <Button onClick={(event)=>commonDeleteFn<StockistAddress>(event, rowData, STOCKIST_ADDRESS_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    return(
        <>
            <GeneralList<StockistAddress> title={title} reload={reload} listUrl={listUrl} hideToolBar={props.isDialog} render={(datatableProps: DataTableProps)=>(
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
export default StockistAddressList;