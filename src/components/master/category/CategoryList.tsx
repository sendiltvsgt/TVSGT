import React, { useState } from 'react';
import { DataTable, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { dateFormater } from '../../../common/utils';
import { CATEGORY_DELETE_API, CATEGORY_LIST_API, CATEGORY_VIEW_API } from '../../../config/api.config';
import { Category } from '../../../entities/CategoryEntity';
import { commonDeleteFn } from '../../general/ComponentFunctions';
import GeneralList from '../../general/GeneralList';
import { FURL_CATEGORY_ADD } from '../../../config/route.config';
import { GeneralMasterView } from '../../general/GeneralComponents';

const CategoryList = () => {
    const title: string = "Category";
    const listUrl: string = CATEGORY_LIST_API;
    const [reload, setReload] = useState<boolean>(false);

    // State for Master View
    const [viewMaster, setViewMaster] = useState<boolean>(false);
    const [viewObjectId, setViewObjectId] = useState<number>(0);

    const actionContent = (rowData: Category) => {
        return (
            <div className='flex-wrap'>
                <Link to="#" onClick={() => {
                        setViewObjectId(rowData.id);
                        setViewMaster(true);
                        }
                    } className='p-button m-1'>View</Link>
                <Button onClick={(event)=>commonDeleteFn<Category>(event, rowData, CATEGORY_DELETE_API, setReload)} className='p-button p-button-danger m-1'>Delete</Button>
                <ConfirmPopup />
            </div>
        );
    };

    const rightToolbarElement = () => {
        return (
            <React.Fragment>
                <Link to={FURL_CATEGORY_ADD}>
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </React.Fragment>
        );
    };

    return(
        <>
            <GeneralList<Category> title={title} rightToolBarElements={rightToolbarElement} listUrl={listUrl} reload={reload} render={(datatableProps: DataTableProps)=>(
                <DataTable {...datatableProps}>
                    <Column header="#ID" field="id" sortable filter showFilterMatchModes={false}  style={{ minWidth: '12rem' }} />
                    <Column header="Category" field="name" sortable filter showFilterMatchModes={false} style={{ minWidth: '12rem' }} />
                    <Column header="Parent Category" field="parentCategory.name" filter style={{ minWidth: '12rem' }} />
                    <Column header="Date" field="createdAt" dataType="date" style={{ minWidth: '10rem' }} body={dateFormater} />
                    <Column header="Action" body={actionContent} />
                </DataTable>
            )}/>
            <GeneralMasterView 
                title="Category"
                view={viewMaster}
                setView={setViewMaster}
                urlToRequest={CATEGORY_VIEW_API}
                objectId={viewObjectId}
            />
        </>
    );
};
export default CategoryList;