import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { dateFormater } from '../../../common/utils';
import { VEHICLE_BRAND_DELETE_API, VEHICLE_BRAND_LIST_API, VEHICLE_BRAND_VIEW_API } from '../../../config/api.config';
import { FURL_VEHICLE_BRAND_ADD } from '../../../config/route.config';
import { VehicleBrand } from '../../../entities/VehicleBrandEntity';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';
import { GeneralMasterView } from '../../general/GeneralComponents';

const VehicleBrandList = () => {
    const title: string = "Vehicle Brand";
    const listUrl: string = VEHICLE_BRAND_LIST_API;
    const [reload, setReload] = useState<boolean>(false);

    // State for Master View
    const [viewMaster, setViewMaster] = useState<boolean>(false);
    const [viewObjectId, setViewObjectId] = useState<number>(0);

    const actionContent = (rowData: VehicleBrand) => {
        return (
            <div className='flex-wrap'>
                <Link to="#" onClick={() => {
                        setViewObjectId(rowData.id);
                        setViewMaster(true);
                        }
                    } className='p-button m-1'>View</Link>
                <Button onClick={(event)=>commonDeleteFn<VehicleBrand>(event, rowData, VEHICLE_BRAND_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_VEHICLE_BRAND_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    return(
        <>
            <GeneralList<VehicleBrand> title={title} reload={reload} rightToolBarElements={rightToolbarElement} listUrl={listUrl} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="#ID" field="id" sortable filter showFilterMatchModes={false}  />
                    <Column header="Name" field="name" sortable filter showFilterMatchModes={false} />
                    <Column header="Sort" field="sort" sortable filter showFilterMatchModes={false} />
                    <Column header="Date" field="createdAt" dataType="date" body={dateFormater} />
                    <Column header="Action" body={actionContent} />
                </DataTable>
            )}/>
            <GeneralMasterView
                title="Vehicle Brand"
                view={viewMaster}
                setView={setViewMaster}
                urlToRequest={VEHICLE_BRAND_VIEW_API}
                objectId={viewObjectId}
            />

        </>
    );
};
export default VehicleBrandList;