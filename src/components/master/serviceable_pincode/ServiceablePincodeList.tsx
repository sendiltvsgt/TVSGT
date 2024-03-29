import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { dateFormater } from '../../../common/utils';
import { SERVICEABLE_PINCODE_LIST_API, SERVICEABLE_PINCODE_DELETE_API, SERVICEABLE_PINCODE_VIEW_API } from '../../../config/api.config';
import { FURL_SERVICEABLE_PINCODE_ADD } from '../../../config/route.config';
import { ServiceablePincode } from '../../../entities/ServiceablePincodeEntity';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';
import { GeneralMasterView } from '../../general/GeneralComponents';

const ServiceablePincodeList = () => {
    const title: string = "Serviceable Pincode";
    const listUrl: string = SERVICEABLE_PINCODE_LIST_API;
    const [reload, setReload] = useState<boolean>(false);

    // State for Master View
    const [viewMaster, setViewMaster] = useState<boolean>(false);
    const [viewObjectId, setViewObjectId] = useState<number>(0);

    const actionContent = (rowData: ServiceablePincode) => {
        return (
            <div className='flex-wrap'>
                <Link to="#" onClick={() => {
                        setViewObjectId(rowData.id);
                        setViewMaster(true);
                        }
                    } className='p-button m-1'>View</Link>
                <Button onClick={(event)=>commonDeleteFn<ServiceablePincode>(event, rowData, SERVICEABLE_PINCODE_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_SERVICEABLE_PINCODE_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    return(
        <>
            <GeneralList<ServiceablePincode> title={title} reload={reload} rightToolBarElements={rightToolbarElement} listUrl={listUrl} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="#ID" field="id" sortable filter showFilterMatchModes={false}  />
                    <Column header="Pincode" field="pincode" sortable filter showFilterMatchModes={false} />
                    <Column header="City/Town" field="cityOrTown" sortable filter showFilterMatchModes={false} />
                    <Column header="State" field="state.name" sortable filter showFilterMatchModes={false} />
                    <Column header="Date" field="createdAt" dataType="date" body={dateFormater} />
                    <Column header="Action" body={actionContent} />
                </DataTable>
            )}/>
            <GeneralMasterView 
                title="Serviceable Pincode"
                view={viewMaster}
                setView={setViewMaster}
                urlToRequest={SERVICEABLE_PINCODE_VIEW_API}
                objectId={viewObjectId}
            />
        </>
    );
};
export default ServiceablePincodeList;