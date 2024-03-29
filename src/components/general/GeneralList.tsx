import { DataTableFilterMetaData, DataTablePFSEvent, DataTableProps } from 'primereact/datatable';
import { getApiData } from '../../common/DataService';
import { DEFAULT_LIST_ROW_COUNT } from '../../config/app.config';
import { JSObjectDto } from '../../common/common.dto';
import React, { useEffect, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';

type GeneralListPropParams = {
    title: string;
    listUrl: string;
    apiFilterParams?: JSObjectDto;
    reload?: boolean;
    hideToolBar?: boolean;
    render: (x: DataTableProps) => JSX.Element;
    rightToolBarElements?: () => React.ReactNode;
};

const GeneralList = <T,>(props: GeneralListPropParams) => {
    const [listData, setListData] = useState<T[]>([]);
    const [listDataCount, setListDataCount] = useState<number | undefined>(0);
    const [listDataFilter, setListDataFilter] = useState<JSObjectDto>({ 'order.column': 'id', 'order.direction': 'DESC', 'page.start': '0', 'page.count': DEFAULT_LIST_ROW_COUNT.toString(), ...props.apiFilterParams });
    const [listLoading, setListLoading] = useState<boolean>(true);

    useEffect(() => {
        //Load Data
        (async () => {
            console.log(listDataFilter);
            const result = await getApiData<T[]>(props.listUrl, listDataFilter);
            setListData(result.data);
            setListDataCount(result.count);
            setListLoading(false);
        })();
    }, [listDataFilter, props.listUrl, props.reload]);

    useEffect(() => {
        setListDataFilter((prevState: JSObjectDto) => ({ ...prevState, ...props.apiFilterParams } as JSObjectDto));
    }, [props.apiFilterParams]);

    const onPagination = (event: DataTablePFSEvent) => {
        console.log('Page');
        //Page Start and row to display
        if (event.first !== undefined && event.rows) {
            setListDataFilter({ ...listDataFilter, 'page.start': (event.first / event.rows).toString(), 'page.count': event.rows.toString() });
        }
    };

    const onFilter = (event: DataTablePFSEvent) => {
        console.log('Filter');
        let copiedListDataFilter = { ...listDataFilter };
        let filterString: JSObjectDto = {};
        //Page Start and row to display
        if (event.filters !== undefined) {
            //let filterString = {};
            for (let [key, value] of Object.entries(event.filters)) {
                console.log(value);
                const searchValue = (value as DataTableFilterMetaData).value;
                if (searchValue !== null && searchValue !== '') {
                    filterString['search.' + key] = searchValue;
                } else {
                    if (copiedListDataFilter['search.' + key] !== undefined) {
                        console.log('deleted');
                        delete copiedListDataFilter['search.' + key];
                    }
                }
            }
        }
        setListDataFilter({ ...copiedListDataFilter, ...filterString });
    };

    const onSort = (event: DataTablePFSEvent) => {
        console.log('Sort');
        //Page Start and row to display
        if (event.sortField !== undefined && event.sortOrder) {
            setListDataFilter({ ...listDataFilter, 'order.column': event.sortField, 'order.direction': listDataFilter['order.direction'] === 'ASC' ? 'DESC' : 'ASC' });
        }
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <h3 style={{ verticalAlign: 'text-top', marginBottom: '.5rem' }}>{props.title}</h3>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        if (props.rightToolBarElements) {
            return (
                <React.Fragment>
                    <div className="my-2">{props.rightToolBarElements()}</div>
                </React.Fragment>
            );
        }
    };

    const datatableProps: DataTableProps = {
        value: listData,
        paginator: true,
        onPage: onPagination,
        className: 'p-datatable-gridlines',
        showGridlines: true,
        rows: parseInt(`${listDataFilter['page.count']}`),
        first: parseInt(`${listDataFilter['page.start']}`) * parseInt(`${listDataFilter['page.count']}`),
        totalRecords: listDataCount,
        onFilter: onFilter,
        onSort: onSort,
        lazy: true,
        filterDisplay: 'row',
        globalFilterMatchMode: 'equals',
        loading: listLoading,
        responsiveLayout: 'scroll',
        emptyMessage: 'No data found.'
    };

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    {!props.hideToolBar && <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>}
                    {props.render(datatableProps)}
                </div>
            </div>
        </div>
    );
};

export default GeneralList;
