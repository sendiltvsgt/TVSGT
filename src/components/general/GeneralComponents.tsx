import { DropdownChangeParams, Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import React, { useState, useEffect } from 'react';
import { getApiData } from '../../common/DataService';
import { GlobalOrderStatus, GlobalShipmentStatus, apiResultToDropdownOption, camelCaseToWords } from '../../common/utils';
import {
    CATEGORY_LIST_API,
    DELIVERY_PARTNER_LIST_API,
    MANUFACTURER_ADDRESS_LIST_API,
    MANUFACTURER_LIST_API,
    PRODUCT_SKU_LIST_API,
    SERVICEABLE_STATE_LIST_API,
    STOCKIST_ADDRESS_LIST_API,
    STOCKIST_LIST_API,
    TAX_RATE_LIST_API,
    VEHICLE_BRAND_LIST_API,
    VEHICLE_MODEL_LIST_API
} from '../../config/api.config';
import { Category } from '../../entities/CategoryEntity';
import { DeliveryPartner } from '../../entities/DeliveryPartnerEntity';
import { ManufacturerAddress } from '../../entities/ManufacturerAddressEntity';
import { Manufacturer } from '../../entities/ManufacturerEntity';
import { ProductSku } from '../../entities/ProductSkuEntity';
import { ServiceableState } from '../../entities/ServiceableStateEntity';
import { StockistAddress } from '../../entities/StockistAddressEntity';
import { Stockist } from '../../entities/StockistEntity';
import { TaxRate } from '../../entities/TaxRateEntity';
import { VehicleModel } from '../../entities/VehicleModelEntity';
import { Dialog } from 'primereact/dialog';
import { VehicleBrand } from '../../entities/VehicleBrandEntity';

export const ManufacturerDropdown = (props: { name: string; value?: any; onChange: (e: DropdownChangeParams) => void; disabled?: boolean }) => {
    const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([]);
    const loadManufacturer = async () => {
        const result = await getApiData<Manufacturer[]>(MANUFACTURER_LIST_API);
        setManufacturerList(apiResultToDropdownOption(result.data));
    };

    useEffect(() => {
        loadManufacturer();
    }, []);

    return <Dropdown name={props.name} disabled={props.disabled} value={props.value} options={manufacturerList} onChange={props.onChange} />;
};

export const VehicleModelDropdown = (props: { name: string; value?: any; onChange: (e: DropdownChangeParams) => void }) => {
    const [vehicleModelList, setVehicleModelList] = useState<VehicleModel[]>([]);
    const loadVehicleModel = async () => {
        const result = await getApiData<VehicleModel[]>(VEHICLE_MODEL_LIST_API);
        setVehicleModelList(apiResultToDropdownOption(result.data));
    };

    useEffect(() => {
        loadVehicleModel();
    }, []);

    return <Dropdown name={props.name} value={props.value} filter options={vehicleModelList} onChange={props.onChange} />;
};

export const VehicleModelDropdownMultiSelect = (props: { name: string; value?: any; onChange: (e: DropdownChangeParams) => void }) => {
    const [vehicleModelList, setVehicleModelList] = useState<VehicleModel[]>([]);
    const loadVehicleModel = () => {
        (async () => {
            const result = await getApiData<VehicleModel[]>(VEHICLE_MODEL_LIST_API);
            setVehicleModelList(apiResultToDropdownOption(result.data, 'fullName'));
        })();
    };

    useEffect(() => {
        loadVehicleModel();
    }, []);

    return <MultiSelect name={props.name} value={props.value} filter options={vehicleModelList} onChange={props.onChange} />;
};

export const CategoryDropdown = (props: { name: string; value?: any; onChange: (e: DropdownChangeParams) => void }) => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const loadCategory = () => {
        (async () => {
            const result = await getApiData<Category[]>(CATEGORY_LIST_API);
            setCategoryList(apiResultToDropdownOption(result.data));
        })();
    };

    useEffect(() => {
        loadCategory();
    }, []);

    return <Dropdown name={props.name} value={props.value} filter options={categoryList} onChange={props.onChange} />;
};

export const StockistDropdown = (props: { name: string; value?: any; onChange: (e: DropdownChangeParams) => void; disabled?: boolean }) => {
    const [stockistList, setStockistList] = useState<Stockist[]>([]);
    const loadStockist = () => {
        (async () => {
            const result = await getApiData<Stockist[]>(STOCKIST_LIST_API);
            setStockistList(apiResultToDropdownOption(result.data));
        })();
    };

    useEffect(() => {
        loadStockist();
    }, []);

    return <Dropdown name={props.name} disabled={props.disabled} value={props.value} filter options={stockistList} onChange={props.onChange} />;
};

export const VehicleBrandDropdown = (props: { name: string; value?: any; onChange: (e: DropdownChangeParams) => void }) => {
    const [vehicleBrandList, setVehicleBrandList] = useState<VehicleBrand[]>([]);
    const loadVehicleBrand = () => {
        (async () => {
            const result = await getApiData<VehicleBrand[]>(VEHICLE_BRAND_LIST_API);
            setVehicleBrandList(apiResultToDropdownOption(result.data));
        })();
    };

    useEffect(() => {
        loadVehicleBrand();
    }, []);

    return <Dropdown name={props.name} value={props.value} filter options={vehicleBrandList} onChange={props.onChange} />;
};

export const ServiceableStateDropdown = (props: { name: string; value?: any; onChange: (e: DropdownChangeParams) => void }) => {
    const [serviceableStateList, setServiceableStateList] = useState<ServiceableState[]>([]);
    const loadServiceableState = () => {
        (async () => {
            const result = await getApiData<ServiceableState[]>(SERVICEABLE_STATE_LIST_API);
            setServiceableStateList(apiResultToDropdownOption(result.data));
        })();
    };

    useEffect(() => {
        loadServiceableState();
    }, []);

    return <Dropdown name={props.name} value={props.value} filter options={serviceableStateList} onChange={props.onChange} />;
};

export const ManufacturerAddressDropdown = (props: { name: string; manufacturerId: number; value?: any; onChange: (e: DropdownChangeParams) => void; disabled?: boolean }) => {
    const [manufacturerAddressList, setManufacturerAddressList] = useState<ManufacturerAddress[]>([]);
    const listUrl = MANUFACTURER_ADDRESS_LIST_API + '/' + props.manufacturerId;

    const loadManufacturerAddress = (listUrlParam: string) => {
        (async () => {
            const result = await getApiData<ManufacturerAddress[]>(listUrlParam);
            setManufacturerAddressList(apiResultToDropdownOption(result.data, 'addressTitle'));
        })();
    };

    useEffect(() => {
        loadManufacturerAddress(listUrl);
    }, [listUrl]);

    return <Dropdown name={props.name} disabled={props.disabled} value={props.value} options={manufacturerAddressList} onChange={props.onChange} />;
};

export const StockistAddressDropdown = (props: { name: string; stockistId: number; value?: any; onChange: (e: DropdownChangeParams) => void; disabled?: boolean }) => {
    const [stockistAddressList, setStockistAddressList] = useState<StockistAddress[]>([]);
    const listUrl = STOCKIST_ADDRESS_LIST_API + '/' + props.stockistId;

    const loadStockistAddress = (listUrlParam: string) => {
        (async () => {
            const result = await getApiData<StockistAddress[]>(listUrlParam);
            setStockistAddressList(apiResultToDropdownOption(result.data, 'addressTitle'));
        })();
    };

    useEffect(() => {
        loadStockistAddress(listUrl);
    }, [listUrl]);

    return <Dropdown name={props.name} disabled={props.disabled} value={props.value} options={stockistAddressList} onChange={props.onChange} />;
};

export const ProductSkuDropdown = React.memo((props: { name: string; manfacturerId: number; value?: any; onChange: (e: DropdownChangeParams) => void; disabled?: boolean }) => {
    const [productSkuList, setProductSkuList] = useState<ProductSku[]>([]);

    const loadProductSku = (listUrlParam: string) => {
        (async () => {
            const result = await getApiData<ProductSku[]>(listUrlParam);
            setProductSkuList(apiResultToDropdownOption(result.data));
        })();
    };

    useEffect(() => {
        loadProductSku(PRODUCT_SKU_LIST_API + '/' + props.manfacturerId + '?page.count=1000');
    }, [props.manfacturerId, props.value]);
    console.log('item', props.value);
    return <Dropdown name={props.name} disabled={props.disabled} value={props.value} filter options={productSkuList} onChange={props.onChange} />;
});

export const TaxRateDropdown = (props: { name: string; value?: any; onChange: (e: DropdownChangeParams) => void }) => {
    const [taxRateList, setTaxRateList] = useState<TaxRate[]>([]);
    const loadTaxRate = () => {
        (async () => {
            const result = await getApiData<TaxRate[]>(TAX_RATE_LIST_API);
            setTaxRateList(apiResultToDropdownOption(result.data));
        })();
    };

    useEffect(() => {
        loadTaxRate();
    }, []);

    return <Dropdown name={props.name} value={props.value} filter options={taxRateList} onChange={props.onChange} />;
};

export const DeliveryPartnerDropdown = (props: { name: string; value?: any; onChange?: (e: DropdownChangeParams) => void; disabled?: boolean }) => {
    const [deliveryPartnerList, setDeliveryPartnerList] = useState<DeliveryPartner[]>([]);
    const loadDeliveryPartner = () => {
        (async () => {
            const result = await getApiData<DeliveryPartner[]>(DELIVERY_PARTNER_LIST_API);
            setDeliveryPartnerList(apiResultToDropdownOption(result.data));
        })();
    };

    useEffect(() => {
        loadDeliveryPartner();
    }, []);

    return <Dropdown disabled={props.disabled} name={props.name} value={props.value} options={deliveryPartnerList} onChange={props.onChange} />;
};

export const OrderStatusDropdownListFilter = (props: { name?: string; value: any; filterApplyCallback: any; disabled?: boolean }) => {
    const status = GlobalOrderStatus;
    const orderStatusList = apiResultToDropdownOption(status);
    const selectedItem = status.filter((x) => x.value === props.value)[0];

    return <Dropdown disabled={props.disabled} name={props.name} value={selectedItem} options={orderStatusList} onChange={(e) => props.filterApplyCallback(e.value.value)} />;
};

export const OrderStatusDropdown = (props: { name?: string; value?: any; onChange?: any; disabled?: boolean }) => {
    const status = GlobalOrderStatus;
    const orderStatusList = apiResultToDropdownOption(status);
    const selectedItem = status.filter((x) => x.value === props.value)[0];

    return <Dropdown disabled={props.disabled} name={props.name} value={selectedItem} options={orderStatusList} onChange={props.onChange} />;
};

export const ShipmentStatusDropdown = (props: { name?: string; value?: any; onChange?: any; disabled?: boolean }) => {
    const status = GlobalShipmentStatus;
    const shipmentStatusList = apiResultToDropdownOption(status);
    const selectedItem = status.filter((x) => x.value === props.value)[0];

    return <Dropdown disabled={props.disabled} name={props.name} value={selectedItem} options={shipmentStatusList} onChange={props.onChange} />;
};

export const StockistDropdownListFilter = (props: { name?: string; value?: any; filterApplyCallback: any; disabled?: boolean }) => {
    const [stockistList, setStockistList] = useState<Stockist[]>([]);
    const [selectedItem, setSelectedItem] = useState<Stockist>();
    const loadStockist = (inputValue: string) => {
        (async () => {
            const result = await getApiData<Stockist[]>(STOCKIST_LIST_API);
            setStockistList(apiResultToDropdownOption(result.data));
            setSelectedItem(result.data.filter((x) => x.name === inputValue)[0]);
        })();
    };

    useEffect(() => {
        loadStockist(props.value);
    }, [props.value]);

    return <Dropdown name={props.name} disabled={props.disabled} value={selectedItem} filter options={stockistList} onChange={(e) => props.filterApplyCallback(e.value.name)} />;
};

export const ManufacturerDropdownListFilter = (props: { name?: string; value?: any; filterApplyCallback?: any; disabled?: boolean }) => {
    const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([]);
    const [selectedItem, setSelectedItem] = useState<Manufacturer>();
    const loadManufacturer = (inputValue: string) => {
        (async () => {
            const result = await getApiData<Manufacturer[]>(MANUFACTURER_LIST_API);
            setManufacturerList(apiResultToDropdownOption(result.data));
            setSelectedItem(result.data.filter((x) => x.name === inputValue)[0]);
        })();
    };

    useEffect(() => {
        loadManufacturer(props.value);
    }, [props.value]);

    return <Dropdown name={props.name} disabled={props.disabled} value={selectedItem} options={manufacturerList} onChange={(e) => props.filterApplyCallback(e.value.name)} />;
};



export const ProductDropdownListFilter = (props: { name?: string; value?: any; filterApplyCallback?: any; disabled?: boolean }) => {
    const [ProductList, setProductList] = useState<ProductSku[]>([]);
    const [selectedItem, setSelectedItem] = useState<ProductSku>();
    const loadManufacturer = (inputValue: string) => {
        (async () => {
            const result = await getApiData<ProductSku[]>(PRODUCT_SKU_LIST_API);
            setProductList(apiResultToDropdownOption(result.data));
            setSelectedItem(result.data.filter((x) => x.name === inputValue)[0]);
        })();
    };

    useEffect(() => {
        loadManufacturer(props.value);
    }, [props.value]);

    return <Dropdown name={props.name} disabled={props.disabled} value={selectedItem} options={ProductList} onChange={(e) => props.filterApplyCallback(e.value.name)} />;
};




export const GeneralMasterView = React.memo(
    <T,>({ title, view, setView, objectId, urlToRequest, renderParams }: { title: string; view: boolean; setView: React.Dispatch<React.SetStateAction<boolean>>; objectId: number; urlToRequest: string; renderParams?: Record<string, any>[] }) => {
        const viewUrl: string = urlToRequest;
        const [data, setData] = useState<Record<string, any>>({});
        useEffect(() => {
            //Load Data
            (async () => {
                if (objectId > 0) {
                    const result = await getApiData<T>(viewUrl + '/' + objectId);
                    if (result && result.data) {
                        setData(result.data);
                    }
                }
            })();
        }, [objectId, viewUrl]);

        const DisplayData = ({ keyData, valueData }: { keyData: string; valueData: string }) => {
            if (valueData && typeof valueData === 'object') {
                // Add Nested object primary display key
                if (valueData['name']) {
                    valueData = valueData['name'];
                } else if (valueData['title']) {
                    valueData = valueData['title'];
                } else {
                    valueData = 'NA';
                }
            }

            return (
                <div key={keyData} className="col-6 flex">
                    <p className="flex-1 font-bold mr-3 text-blue-500 w-2">{camelCaseToWords(keyData)}</p>
                    <p className="flex-1 w-10">{valueData || 'NA'}</p>
                </div>
            );
        };

        return (
            <Dialog header={title} visible={view} style={{ width: '50vw' }} onHide={() => setView(false)}>
                <div className="grid">
                    {renderParams && renderParams.length && data
                        ? renderParams.map((param, index) => {
                              const keyData: string = param.label ? param.label : camelCaseToWords(param.key);
                              const valueData: string = param.transformation ? param.transformation(data[param.key]) : data[param.key];
                              return <DisplayData key={index} keyData={keyData} valueData={valueData} />;
                          })
                        : Object.keys(data).map((key, index) => {
                              const keyData: string = camelCaseToWords(key);
                              const valueData: string = data[key];
                              return <DisplayData key={index} keyData={keyData} valueData={valueData} />;
                          })}
                </div>
            </Dialog>
        );
    }
);
export const ManufacturerDropdownHook = (props: {
    id: string;
    className?: string;
    name: string;
    optionLabel?: string;
    placeholder: string;
    value?: any;
    onChange: (e: DropdownChangeParams) => void;
    disabled?: boolean;
    focusInputRef?: React.Ref<HTMLInputElement>;
}) => {
    const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([]);
    const loadManufacturer = async () => {
        const result = await getApiData<Manufacturer[]>(MANUFACTURER_LIST_API);
        setManufacturerList(apiResultToDropdownOption(result.data));
    };

    useEffect(() => {
        loadManufacturer();
    }, []);

    return (
        <Dropdown
            id={props.id}
            className={props.className}
            placeholder={props.placeholder}
            optionLabel={props.optionLabel}
            focusInputRef={props.focusInputRef}
            disabled={props.disabled}
            value={props.value}
            options={manufacturerList}
            onChange={props.onChange}
        />
    );
};

export const ProductSkuDropdownHook = React.memo(
    (props: {
        id: string;
        className?: string;
        name: string;
        optionLabel?: string;
        placeholder: string;
        value?: any;
        onChange: (e: DropdownChangeParams) => void;
        disabled?: boolean;
        focusInputRef?: React.Ref<HTMLInputElement>;
        manfacturerId: number;
    }) => {
        const [productSkuList, setProductSkuList] = useState<ProductSku[]>([]);

        const loadProductSku = async (listUrlParam: string) => {
            const result = await getApiData<ProductSku[]>(listUrlParam);
            setProductSkuList(apiResultToDropdownOption(result.data));
        };

        useEffect(() => {
            if (props.manfacturerId) {
                loadProductSku(PRODUCT_SKU_LIST_API + '/' + props.manfacturerId + '?page.count=1000');
            }
        }, [props.manfacturerId, props.value]);
        return <Dropdown name={props.name} className={props.className} placeholder={props.placeholder} disabled={!props.disabled} value={props.value} filter options={productSkuList} onChange={props.onChange} />;
    }
);
