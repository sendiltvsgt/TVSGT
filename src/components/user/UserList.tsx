import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { USER_LIST_API, USER_VIEW_API } from '../../config/api.config';
import { User } from '../../entities/UserEntity';
import { dateFormater } from '../../common/utils';
import { GeneralMasterView } from '../general/GeneralComponents';
import GeneralList from '../general/GeneralList';
import { FURL_USER_ADD, FURL_USER_EDIT_WITHOUT_PARAMS, FURL_USER_RESET_PASSWORD_WITHOUT_PARAMS } from '../../config/route.config';

const UserList = () => {
    const title: string = "Users";
    const listUrl: string = USER_LIST_API;
    const [reload, setReload] = useState<boolean>(false);

    // State for Master View
    const [viewMaster, setViewMaster] = useState<boolean>(false);
    const [viewObjectId, setViewObjectId] = useState<number>(0);

    const actionContent = (rowData: User) => {
        return (
            <div className='flex-wrap'>
                <Link to="#" onClick={() => {
                        setViewObjectId(rowData.id);
                        setViewMaster(true);
                        }
                    } className='p-button m-1'>View</Link>
                <Link to={FURL_USER_EDIT_WITHOUT_PARAMS+rowData.id} className='p-button p-button-info m-1'>Edit</Link>
                <Link to={FURL_USER_RESET_PASSWORD_WITHOUT_PARAMS+rowData.id} className='p-button p-button-info m-1'>Reset Password</Link>
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_USER_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    return(
        <>
            <GeneralList<User> title={title} reload={reload} rightToolBarElements={rightToolbarElement} listUrl={listUrl} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="#ID" field="id" sortable filter showFilterMatchModes={false}  style={{ minWidth: '12rem' }} />
                    <Column header="First Name" field="firstName" sortable filter showFilterMatchModes={false} style={{ minWidth: '12rem' }} />
                    <Column header="Last Name" field="lastName" sortable filter showFilterMatchModes={false} style={{ minWidth: '12rem' }} />
                    <Column header="Email" field="email" sortable filter showFilterMatchModes={false} style={{ minWidth: '12rem' }} />
                    <Column header="Phone" field="phone" sortable filter showFilterMatchModes={false} style={{ minWidth: '12rem' }} />
                    <Column header="Role" field="userType" sortable filter showFilterMatchModes={false} style={{ minWidth: '12rem' }} />
                    <Column header="Date" field="createdAt" dataType="date" style={{ minWidth: '10rem' }} body={dateFormater} />
                    <Column header="Action" body={actionContent} />
                </DataTable>
            )}/>
            <GeneralMasterView
                title={title}
                view={viewMaster}
                setView={setViewMaster}
                urlToRequest={USER_VIEW_API}
                objectId={viewObjectId}
                />

        </>
    );
};
export default UserList;