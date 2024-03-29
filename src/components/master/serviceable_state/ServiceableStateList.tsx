import React, { useEffect, useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { dateFormater } from '../../../common/utils';
import { SERVICEABLE_STATE_LIST_API, SERVICEABLE_STATE_DELETE_API, SERVICEABLE_STATE_VIEW_API } from '../../../config/api.config';
import { FURL_SERVICEABLE_STATE_ADD } from '../../../config/route.config';
import { ServiceableState } from '../../../entities/ServiceableStateEntity';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';
import { formatDate } from '@fullcalendar/react';
import { GeneralMasterView } from '../../general/GeneralComponents';

const ServiceableStateList = () => {
    const title: string = "Serviceable State";
    const listUrl: string = SERVICEABLE_STATE_LIST_API;
    const [reload, setReload] = useState<boolean>(false);
    const [viewMaster, setViewMaster] = useState<boolean>(false);
    const [viewObjectId, setViewObjectId] = useState<number>(0);

    const actionContent = (rowData: ServiceableState) => {
        return (
            <div className='flex-wrap'>
                <Link to="#" onClick={() => {
                        setViewObjectId(rowData.id);
                        setViewMaster(true);
                        }
                    } className='p-button m-1'>View</Link>
                <Button onClick={(event)=>commonDeleteFn<ServiceableState>(event, rowData, SERVICEABLE_STATE_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_SERVICEABLE_STATE_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    return(
        <>
            <GeneralList<ServiceableState> title={title} reload={reload} rightToolBarElements={rightToolbarElement} listUrl={listUrl} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="#ID" field="id" sortable filter showFilterMatchModes={false}  />
                    <Column header="Name" field="name" sortable filter showFilterMatchModes={false} />
                    <Column header="Code" field="code" sortable filter showFilterMatchModes={false} />
                    <Column header="Date" field="createdAt" dataType="date" body={dateFormater} />
                    <Column header="Action" body={actionContent} />
                </DataTable>
            )}/>
            <GeneralMasterView 
                title="Serviceable State"
                view={viewMaster}
                setView={setViewMaster}
                urlToRequest={SERVICEABLE_STATE_VIEW_API}
                objectId={viewObjectId}
                renderParams={[
                    {
                        key: "id",
                    },
                    {
                        key: "name",
                    },
                    {
                        key: "code",
                    },
                    {
                        key: "createdAt",
                        label: "Created On",
                        transformation: (str: any) => formatDate(str)
                    },
                ]}
            />
        </>
    );
};
export default ServiceableStateList;