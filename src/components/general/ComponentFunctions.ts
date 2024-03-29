import { confirmPopup } from "primereact/confirmpopup";
import { deleteApiData, postApiData, putApiData } from "../../common/DataService";

export const commonDeleteFn = <T extends {id: number},>(event: any, rowData: T, deleteUrl: string, reloadParentComponent?: React.Dispatch<React.SetStateAction<boolean>>) => {
    confirmPopup({
        target: event.currentTarget,
        message: 'Are you sure you want to delete this record?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            deleteApiData<T>(deleteUrl,rowData.id);
            //Callback to notify parent compoentn
            if(reloadParentComponent){
                reloadParentComponent(prevState=>!prevState);
            }
        },
        reject: () => {}
    });
}

export const orderCancelFn = <T extends {id: number},>(event: any, recordId: number, postUrl: string, reloadParentComponent?: React.Dispatch<React.SetStateAction<boolean>>) => {
    confirmPopup({
        target: event.currentTarget,
        message: 'Are you sure you want to cancel this order?',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            await putApiData<T>(postUrl, recordId ,{status: 'CANCELLED'});
            //Callback to notify parent compoentn
            if(reloadParentComponent){
                reloadParentComponent(prevState=>!prevState);
            }
        },
        reject: () => {}
    });
}