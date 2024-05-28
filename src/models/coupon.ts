export interface IBatchDetails {
    id: number;
    createdAt: string;
    updatedAt: string;
    batchCode: string;
    batchType: string;
    cashback: number;
    fixedPart: string;
    fromDate: string;
    toDate: string;
    totalCount: number;
    utilizedCount: number;
    isDiscontinued: boolean;
    product: Product;
    manufacturer: Manufacturer;
    remainingCount: number;
    active: boolean;
}

export interface Product {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    code: string;
    slug: string;
    shortDescription: string;
    longDescription: string;
    uom: string;
    boxContents: string;
    specifications: Specification[];
    hsnCode: string;
    taxRate: TaxRate;
    price: number;
    active: boolean;
    manufacturer: Manufacturer;
    category: Category;
    productSeries: string;
    primaryImage: string;
    isBestseller: boolean;
    isFeatured: boolean;
    deactivatedOn: any;
    vehicleModel: any;
    newArrivalUntil: any;
    primaryImageUrl: string;
    isNewArrival: boolean;
}

export interface Specification {
    key: string;
    value: string;
    header: string;
    isHighlight: boolean;
}

export interface TaxRate {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    rate: number;
}

export interface Manufacturer {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    hoAddress: string;
    hoCity: string;
    hoState: string;
    hoZip: string;
    email: string;
    phone: string;
    secondaryPhone: string;
}

export interface Category {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    sort: number;
    shortDescription: string;
    longDescription: string;
    parentCategory: Category;
}
export interface ICoupon {
    id: number;
    createdAt: string;
    updatedAt: string;
    couponCode: string;
    couponType: string;
    isScannable: boolean;
    status: string;
    readyForScanningDate: string;
    scannedDate: any;
    couponBatch: CouponBatch;
    cashback: number;
}

export interface CouponBatch {
    id: number;
    createdAt: string;
    updatedAt: string;
    batchCode: string;
    batchType: string;
    cashback: number;
    fixedPart: string;
    fromDate: string;
    toDate: string;
    totalCount: number;
    utilizedCount: number;
    isDiscontinued: boolean;
    product: Product;
    manufacturer: Manufacturer;
    remainingCount: number;
    active: boolean;
}
