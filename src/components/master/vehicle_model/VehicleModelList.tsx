import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { dateFormater } from '../../../common/utils';
import { VehicleModel } from '../../../entities/VehicleModelEntity';
import { VEHICLE_MODEL_DELETE_API, VEHICLE_MODEL_LIST_API, VEHICLE_MODEL_VIEW_API } from '../../../config/api.config';
import { FURL_VEHICLE_MODEL_ADD } from '../../../config/route.config';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';
import { GeneralMasterView } from '../../general/GeneralComponents';

const VehicleModelList = () => {
    const title: string = "Vehicle Model";
    const listUrl: string = VEHICLE_MODEL_LIST_API;
    const [reload, setReload] = useState<boolean>(false);

    // State for Master View
    const [viewMaster, setViewMaster] = useState<boolean>(false);
    const [viewObjectId, setViewObjectId] = useState<number>(0);

    const actionContent = (rowData: VehicleModel) => {
        return (
            <div className='flex-wrap'>
                <Link to="#" onClick={() => {
                        setViewObjectId(rowData.id);
                        setViewMaster(true);
                        }
                    } className='p-button m-1'>View</Link>
                <Button onClick={(event)=>commonDeleteFn<VehicleModel>(event, rowData, VEHICLE_MODEL_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_VEHICLE_MODEL_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    return(
        <>
            <GeneralList<VehicleModel> title={title} reload={reload} rightToolBarElements={rightToolbarElement} listUrl={listUrl} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="#ID" field="id" sortable filter showFilterMatchModes={false}  />
                    <Column header="Name" field="name" sortable filter showFilterMatchModes={false} />
                    <Column header="Sort" field="sort" sortable filter showFilterMatchModes={false} />
                    <Column header="Vehicle Brand" field="vehicleBrand.name" sortable filter showFilterMatchModes={false} />
                    <Column header="Date" field="createdAt" dataType="date" body={dateFormater} />
                    <Column header="Action" style={{ 'minWidth': '15rem' }} body={actionContent} />
                </DataTable>
            )}/>
            <GeneralMasterView
                title="Vehicle Model"
                view={viewMaster}
                setView={setViewMaster}
                objectId={viewObjectId}
                urlToRequest={VEHICLE_MODEL_VIEW_API}
            />
        </>
    );
};
export default VehicleModelList;