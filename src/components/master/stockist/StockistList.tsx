import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { dateFormater } from '../../../common/utils';
import { STOCKIST_LIST_API, STOCKIST_DELETE_API, STOCKIST_VIEW_API } from '../../../config/api.config';
import { FURL_STOCKIST_ADD } from '../../../config/route.config';
import { Stockist } from '../../../entities/StockistEntity';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';
import { Dialog } from 'primereact/dialog';
import StockistAddressAdd from '../stockist_address/StockistAddressAdd';
import StockistAddressList from '../stockist_address/StockistAddressList';
import { GeneralMasterView } from '../../general/GeneralComponents';

const StockistList = () => {
    const title: string = "Stockist";
    const listUrl: string = STOCKIST_LIST_API;
    const [reload, setReload] = useState<boolean>(false);
    const [stockistAddressDialogListVisible, setStockistAddressDialogListVisible] = useState<boolean>(false);
    const [stockistAddressAddDialogVisible, setStockistAddressAddDialogVisible] = useState<boolean>(false);
    const [selectedStockist, setSelectedStockist] = useState(0);

    // State for Master View
    const [viewMaster, setViewMaster] = useState<boolean>(false);
    const [viewObjectId, setViewObjectId] = useState<number>(0);

    const actionContent = (rowData: Stockist) => {
        return (
            <div className='flex-wrap'>
                <Button className='m-1' label="Add Address" icon="pi pi-external-link" onClick={() => setStockistAddressAddDialogVisible(true)} />
                <StockistAddressAddDialog />
                <Button className='m-1' label="List Address" icon="pi pi-external-link" onClick={() => {setStockistAddressDialogListVisible(true);setSelectedStockist(rowData.id);}} />
                <Link to="#" onClick={() => {
                        setViewObjectId(rowData.id);
                        setViewMaster(true);
                        }
                    } className='p-button m-1'>View</Link>
                <Button onClick={(event)=>commonDeleteFn<Stockist>(event, rowData, STOCKIST_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_STOCKIST_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    const StockistAddressAddDialog = () => {
        return (
            <Dialog header="Stockist Address Add" visible={stockistAddressAddDialogVisible} style={{ width: '50vw' }} onHide={() => setStockistAddressAddDialogVisible(false)}>
                <StockistAddressAdd hideTitle={true} isDialog={true} />
            </Dialog>
        );
    };
    
    const StockistAddressListDialog = () => {
        return (
            <Dialog header="Stockist Address List" visible={stockistAddressDialogListVisible} style={{ width: '80vw' }} onHide={() => setStockistAddressDialogListVisible(false)}>
                <StockistAddressList stockistId={selectedStockist} isDialog={true} />
            </Dialog>
        );
    };

    return(
        <>
            <GeneralList<Stockist> title={title} reload={reload} rightToolBarElements={rightToolbarElement} listUrl={listUrl} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="#ID" field="id" sortable filter showFilterMatchModes={false}  />
                    <Column header="Name" field="name" sortable filter showFilterMatchModes={false} />
                    <Column header="Email" field="email" sortable filter showFilterMatchModes={false} />
                    <Column header="Phone" field="phone" sortable filter showFilterMatchModes={false} />
                    <Column header="Date" field="createdAt" dataType="date" body={dateFormater} />
                    <Column header="Action" body={actionContent} />
                </DataTable>
            )}/>
            <GeneralMasterView 
                title={title}
                view={viewMaster}
                setView={setViewMaster}
                urlToRequest={STOCKIST_VIEW_API}
                objectId={viewObjectId}
            />
            <StockistAddressListDialog />
        </>
    );
};
export default StockistList;