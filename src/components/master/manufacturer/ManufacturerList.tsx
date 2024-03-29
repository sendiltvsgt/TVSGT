import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { dateFormater } from '../../../common/utils';
import { MANUFACTURER_DELETE_API, MANUFACTURER_LIST_API, MANUFACTURER_VIEW_API } from '../../../config/api.config';
import { FURL_MANUFACTURER_ADD } from '../../../config/route.config';
import { Manufacturer } from '../../../entities/ManufacturerEntity';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';
import ManufacturerAddressAdd from '../manufacturer_address/ManufacturerAddressAdd';
import { Dialog } from 'primereact/dialog';
import ManufacturerAddressList from '../manufacturer_address/ManufacturerAddressList';
import { GeneralMasterView } from '../../general/GeneralComponents';

const ManufacturerList = () => {
    const title: string = "Manufacturer";
    const listUrl: string = MANUFACTURER_LIST_API;
    const [reload, setReload] = useState<boolean>(false);
    const [manufacturerAddressAddDialogVisible, setManufacturerAddressAddDialogVisible] = useState<boolean>(false);
    const [manufacturerAddressDialogListVisible, setManufacturerAddressDialogListVisible] = useState<boolean>(false);

    // State for Master View
    const [viewMaster, setViewMaster] = useState<boolean>(false);
    const [viewObjectId, setViewObjectId] = useState<number>(0);

    const actionContent = (rowData: Manufacturer) => {
        return (
            <div className='flex-wrap'>
                <Button className='m-1' label="Add Address" icon="pi pi-external-link" onClick={() => setManufacturerAddressAddDialogVisible(true)} />
                <ManufacturerAddressAddDialog />
                <Button className='m-1' label="List Address" icon="pi pi-external-link" onClick={() => setManufacturerAddressDialogListVisible(true)} />
                <ManufacturerAddressListDialog manufacturerId={rowData.id} />
                <Link to="#" onClick={() => {
                        setViewObjectId(rowData.id);
                        setViewMaster(true);
                        }
                    } className='p-button m-1'>View</Link>
                <Button onClick={(event)=>commonDeleteFn<Manufacturer>(event, rowData, MANUFACTURER_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_MANUFACTURER_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    const ManufacturerAddressAddDialog = () => {
        return (
            <Dialog header="Manufacturer Address - Add" visible={manufacturerAddressAddDialogVisible} style={{ width: '50vw' }} onHide={() => setManufacturerAddressAddDialogVisible(false)}>
                <ManufacturerAddressAdd hideTitle={true} isDialog={true} />
            </Dialog>
        );
    };

    const ManufacturerAddressListDialog = (props: {manufacturerId: number}) => {
        return (
            <Dialog header="Manufacturer Address - List" visible={manufacturerAddressDialogListVisible} style={{ width: '80vw' }} onHide={() => setManufacturerAddressDialogListVisible(false)}>
                <ManufacturerAddressList manufacturerId={props.manufacturerId} isDialog={true} />
            </Dialog>
        );
    };

    return(
        <>
            <GeneralList<Manufacturer> title={title} reload={reload} rightToolBarElements={rightToolbarElement} listUrl={listUrl} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="#ID" field="id" sortable filter showFilterMatchModes={false}  />
                    <Column header="Name" field="name" sortable filter showFilterMatchModes={false} />
                    <Column header="HO City" field="hoCity" sortable filter showFilterMatchModes={false} />
                    <Column header="HO State" field="hoState" sortable filter showFilterMatchModes={false} />
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
                urlToRequest={MANUFACTURER_VIEW_API}
                objectId={viewObjectId}
            />
        </>
    );
};
export default ManufacturerList;