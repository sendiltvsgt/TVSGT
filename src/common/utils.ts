import { formatDate } from '@fullcalendar/react';

export const dateFormater = (rowData: any) => {
    return formatDate(rowData.createdAt);
};

export const apiResultToDropdownOption = (result: any[], keyToRender?: string) => {
    let output = [];
    for (let value of result) {
        output.push({ label: (keyToRender && value[keyToRender]) || value.title || value.name, value: value } as any);
    }
    return output;
};

export const valueForDropdown = (value: any, keyToRender?: string) => {
    if (value) {
        return { ...value };
    } else {
        return null;
    }
};

export const displayStatus = (data?: string) => {
    if (!data) return 'NA';
    //Split the string by _ and capitalize the first letter of each word
    return data
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const displayDate = (date?: Date) => {
    if (!date) return '-';
    return formatDate(date, { year: 'numeric', month: 'long', day: 'numeric' });
};

export const displayShortDate = (date: Date) => {
    if (!date) return '-';
    return formatDate(date, { month: 'short', day: 'numeric' });
};

export const displayDateTime = (date?: Date) => {
    if (!date) return '-';
    return formatDate(date, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
};

export const getRupee = (value?: number) => {
    if (!value) return '₹ 0';
    return `₹ ${getNumberWithCommas(value)}`;
};

export const getNumberWithCommas = (value: number) => {
    return value.toLocaleString('en-IN');
};

export const roundNumber = (value: number) => {
    return Math.round(value);
};

export const camelCaseToWords = function (value: string) {
    const result = value.match(/^[a-z]+|[A-Z][a-z]*/g);
    if (!result) return value;
    return result
        .map(function (x) {
            return x[0].toUpperCase() + x.slice(1).toLowerCase();
        })
        .join(' ');
};

export const GlobalOrderStatus = [
    { name: 'PENDING CONFIRMATION', value: 'PENDING_CONFIRMATION' },
    { name: 'CONFIRMED', value: 'CONFIRMED' }, // Payment Due
    { name: 'CANCELLED', value: 'CANCELLED' },
    { name: 'PAYMENT RECEIVED', value: 'PAYMENT_RECEIVED' }, // Pending Fulfillment
    { name: 'PARTIALLY SHIPPED', value: 'PARTIALLY_SHIPPED' }, // Pending Fulfillment
    { name: 'SHIPPED', value: 'SHIPPED' }, // Delivered
    { name: 'DELIVERED', value: 'DELIVERED' } // Delivered
];

export const GlobalShipmentStatus = [
    { name: 'INITIATED', value: 'INITIATED' },
    { name: 'IN PROGRESS', value: 'IN_PROGRESS' },
    { name: 'DELIVERED', value: 'DELIVERED' },
    { name: 'DELIVERY FAILED', value: 'DELIVERY_FAILED' }
];
