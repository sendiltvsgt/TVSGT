import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { dateFormater } from '../../../common/utils';
import { FURL_AUTOMOBILE_TYPE_ADD } from '../../../config/route.config';
import { AUTOMOBILE_TYPE_DELETE_API, AUTOMOBILE_TYPE_LIST_API, AUTOMOBILE_TYPE_VIEW_API } from '../../../config/api.config';
import { AutomobileType } from '../../../entities/AutomobileType';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';
import { GeneralMasterView } from '../../general/GeneralComponents';

const AutomobileTypeList = () => {
    const title: string = "Automobile Type";
    const listUrl: string = AUTOMOBILE_TYPE_LIST_API;
    const [reload, setReload] = useState<boolean>(false);

    // State for Master View
    const [viewMaster, setViewMaster] = useState<boolean>(false);
    const [viewObjectId, setViewObjectId] = useState<number>(0);

    const actionContent = (rowData: AutomobileType) => {
        return (
            <div className='flex-wrap'>
                <Link to="#" onClick={() => {
                        setViewObjectId(rowData.id);
                        setViewMaster(true);
                        }
                    } className='p-button m-1'>View</Link>
                <Button onClick={(event)=>commonDeleteFn<AutomobileType>(event, rowData, AUTOMOBILE_TYPE_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_AUTOMOBILE_TYPE_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    return(
        <>
            <GeneralList<AutomobileType> title={title} reload={reload} rightToolBarElements={rightToolbarElement} listUrl={listUrl} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="#ID" field="id" sortable filter showFilterMatchModes={false}  style={{ minWidth: '12rem' }} />
                    <Column header="Name" field="name" sortable filter showFilterMatchModes={false} style={{ minWidth: '12rem' }} />
                    <Column header="Date" field="createdAt" dataType="date" style={{ minWidth: '10rem' }} body={dateFormater} />
                    <Column header="Action" body={actionContent} />
                </DataTable>
            )}/>
            <GeneralMasterView
                title="Automobile Type"
                view={viewMaster}
                setView={setViewMaster}
                urlToRequest={AUTOMOBILE_TYPE_VIEW_API}
                objectId={viewObjectId}
                />

        </>
    );
};
export default AutomobileTypeList;