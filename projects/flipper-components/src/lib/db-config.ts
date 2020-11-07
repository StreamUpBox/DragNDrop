import { InjectionToken } from '@angular/core';
import { Menu } from './entries';
import { Reason } from './entries/reason';


export const APP_CONFIG = new InjectionToken<FlipperDBConfig[]>('APP_CONFIG');

export enum TABLES {
    USER = 'user',
    BUSINESS = 'business',
    TYPES = 'businessTypes',
    MENU = 'menus',
    BRANCHES = 'branches',
    BUSINESSCATEGORY = 'businessCategories',
    USERBUSINESS = 'businessUsers',
    TAXES = 'taxes',
    PRODUCTS = 'products',
    VARIANTS = 'variants',
    REASON = 'reasons',
    STOCKS = 'stocks',
    BRANCHPRODUCTS = 'branchProducts',
    ORDER= 'orders',
    ORDERDETAILS= 'orderDetails',
    STOCKHISTORY= 'stockHistory',
    DEVICE= 'devices',
    RECEIPT= 'receipts',
    SUBSCRIPTION= 'subscription',
}

export type TABLE =
    TABLES.USER
  | TABLES.TYPES
  | TABLES.MENU
  | TABLES.BUSINESS
  | TABLES.BRANCHES
  | TABLES.BUSINESSCATEGORY
  | TABLES.USERBUSINESS
  | TABLES.TAXES
  | TABLES.PRODUCTS
  | TABLES.VARIANTS
  | TABLES.STOCKS
  | TABLES.ORDER
  | TABLES.ORDERDETAILS
  | TABLES.REASON
  | TABLES.DEVICE
  | TABLES.RECEIPT
  | TABLES.STOCKHISTORY
  | TABLES.BRANCHPRODUCTS
  | TABLES.SUBSCRIPTION;





export const DEFAULT_FLIPPER_DB_CONFIG = {
    database: { name: 'flipper', engine: 'LOCALSTORAGE' },
    tables: [
        {
            name: TABLES.USER,
            query: `id STRING,
                    name STRING,
                    email STRING,
                    active BOOL,
                    token STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
            `
        },
        {
            name: TABLES.BUSINESSCATEGORY,
            query: `id STRING,
                    name STRING,
                    typeId STRING,
                    syncedOnline BOOL,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.REASON,
            query: `id STRING,
                    name STRING,
                    operation STRING,
                    active BOOL,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                 `
        },
        {
            name: TABLES.TYPES,
            query: `id STRING,
                    name STRING,
                    syncedOnline BOOL,
                    PRIMARY KEY (id)
            `
        },
        {
            name: TABLES.MENU,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                name STRING,
                icon STRING,
                route STRING,
                active BOOL,
                isSetting BOOL,
                PRIMARY KEY (id)`
        },
        {
            name: TABLES.BUSINESS,
            query: `
                id STRING,
                name STRING,
                country STRING,
                currency STRING,
                businessUrl STRING,
                timeZone STRING,
                active BOOL,
                userId STRING,
                typeId STRING,
                categoryId STRING,
                createdAt DATETIME,
                updatedAt DATETIME,
                PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.BRANCHES,
            query: `
                id STRING,
                name STRING,
                active BOOL,
                businessId STRING,
                mapLatitude STRING NULL,
                mapLongitude STRING NULL,
                createdAt DATETIME,
                updatedAt DATETIME,
                PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.USERBUSINESS,
            query: `id STRING,
                    userId STRING,
                    businessId STRING,
                    PRIMARY KEY (id)
                    `
        },
        {
            name: TABLES.TAXES,
            query: `id STRING,
                    name STRING,
                    percentage int(11),
                    active BOOL,
                    isDefault BOOL,
                    businessId STRING,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                        `
        },
        {
            name: TABLES.PRODUCTS,
            query: `id STRING,
                    name STRING,
                    categoryId int(11) NULL,
                    description STRING NULL,
                    picture STRING NULL,
                    taxId int(11) NULL,
                    active BOOL,
                    hasPicture BOOL,
                    isDraft BOOL,
                    isCurrentUpdate BOOL,
                    businessId STRING,
                    supplierId STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.BRANCHPRODUCTS,
            query: `id STRING,
                    productId STRING,
                    branchId STRING,
                    channel STRING,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.VARIANTS,
            query: `id STRING,
                    name STRING,
                    SKU STRING,
                    productId STRING,
                    unit STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.STOCKS,
            query: ` id STRING,
                    branchId STRING,
                    variantId STRING,
                    productId STRING,
                    lowStock STRING,
                    currentStock STRING,
                    supplyPrice int(11) NULL,
                    retailPrice int(11) NULL,
                    canTrackingStock BOOL,
                    showLowStockAlert BOOL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.ORDER,
            query: `id STRING,
                    branchId STRING NOT NULL,
                    deviceId STRING NULL,
                    orderNumber STRING NOT NULL,
                    customerId STRING NULL,
                    status STRING NOT NULL,
                    reference STRING NULL,
                    orderType STRING NOT NULL,
                    supplierId STRING NULL,
                    subTotal int(11) NULL,
                    supplierInvoiceNumber STRING NULL,
                    taxRate int(11) NULL,
                    taxAmount int(11) NULL,
                    discountRate int(11) NULL,
                    discountAmount int(11) NULL,
                    cashReceived int(11) NULL,
                    customerChangeDue int(11) NULL,
                    saleTotal int(11) NULL,
                    paymentId STRING NULL,
                    orderNote STRING NULL,
                    active BOOL,
                    isDraft BOOL,
                    channel STRING,
                    deliverDate DATETIME,
                    orderDate DATETIME,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.ORDERDETAILS,
            query: ` id STRING NOT NULL,
                    orderId STRING NOT NULL,
                    variantId STRING NOT NULL,
                    variantName STRING NOT NULL,
                    price int(11) NULL,
                    quantity int(11) NOT NULL,
                    unit STRING NULL,
                    taxAmount int(11) NULL,
                    taxRate int(11) NULL,
                    discountAmount int(11) NULL,
                    discountRate int(11) NULL,
                    subTotal int(11) NULL,
                    note STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.STOCKHISTORY,
            query: `id STRING,
                    variantId STRING,
                    stockId STRING,
                    productId STRING,
                    quantity int(11) NOT NULL,
                    reason STRING NULL,
                    note STRING NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.DEVICE,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                    branchId int(11) NOT NULL,
                    name int(11) NOT NULL,
                    token STRING NOT NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.RECEIPT,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                    branchId int(11) NOT NULL,
                    businessName int(11) NOT NULL,
                    digitalLogo STRING  NULL,
                    printedLogo STRING  NULL,
                    showLocation BOOL  NULL,
                    color STRING  NULL,
                    address1 STRING  NULL,
                    address1 STRING  NULL,
                    city STRING  NULL,
                    customerText STRING  NULL,
                    returnPolicy STRING  NULL,
                    showItemNote BOOL  NULL,
                    channel STRING,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        }
    ],
    demo: {
        email: 'admin@admin.com',
        password: 'admin',
    },
    defaultMenu: [
        {
            name: 'Analytics',
            icon: 'analytics.svg',
            route: 'analytics',
            active: true,
            isSetting: false,
        },
        {
            name: 'POS',
            icon: 'pos.svg',
            route: 'pos',
            active: false,
            isSetting: false,
        },
        {
            name: 'Inventory',
            icon: 'inventory.svg',
            route: 'inventory',
            active: false,
            isSetting: false,
        },
        {
            name: 'Transactions',
            icon: 'transaction.svg',
            route: 'transactions',
            active: false,
            isSetting: false,
        },
        {
            name: 'Settings',
            icon: 'settings.svg',
            route: 'settings',
            active: false,
            isSetting: true,
        }
    ],
    defaultReasons: [
        {
            name: 'Stock Received',
            operation: 'add',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Inventory Re-count',
            operation: 'add',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Damage',
            operation: 'remove',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Theft',
            operation: 'remove',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Loss',
            operation: 'remove',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Restock Return',
            operation: 'add',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    defaultCategory: [
        {
            name: 'Beauty Salon',
            id: 'beauty-salon',
            type_id:'beauty-and-personal-care'
        },
        {
            name: 'Hair Salon/Barbershop',
            id: 'hair-salon/barbershop',
            type_id:'beauty-and-personal-care'
        },
        {
            name: 'Independent Stylist/Barber',
            id: 'independent-stylist/barber',
            type_id:'beauty-and-personal-care'
        },
        {
            name: 'Massage Therapist',
            id: 'massage-therapist',
            type_id:'beauty-and-personal-care'
        },
        {
            name: 'Nail Salon',
            id: 'nail-salon',
            type_id:'beauty-and-personal-care'
        },
        {
            name: 'Spa',
            id: 'spa',
            type_id:'beauty-and-personal-care'
        },
        {
            name: 'Tanning Salon',
            id: 'tanning-salon',
            type_id:'beauty-and-personal-care'
        },
        {
            name: 'Tattoo/Piercing',
            id: 'tattoo/piercing',
            type_id:'beauty-and-personal-care'
        },
        {
            name: 'Pharamcy',
            id: 'pharamcy',
            type_id:'retail'
        },
        {
            name: 'Grocery/Market',
            id: 'grocery/market',
            type_id:'retail'
        },
        {
            name: 'Pet Store',
            id: 'pet-store',
            type_id:'retail'
        },
        {
            name: 'Electronics',
            id: 'electronics',
            type_id:'retail'
        },
        {
            name: 'Hardware Store',
            id: 'hardware-store',
            type_id:'retail'
        },
        {
            name: 'Eyewear',
            id: 'eyewear',
            type_id:'retail'
        },
        {
            name: 'Outdoor Markets',
            id: 'outdoor-markets',
            type_id:'retail'
        },
        {
            name: 'Speciality Shop',
            id: 'speciality-shop',
            type_id:'retail'
        },
        {
            name: 'Sporting Goods',
            id: 'sporting-goods',
            type_id:'retail'
        },
        {
            name: 'Hobby Shop',
            id: 'hobby-shop',
            type_id:'retail'
        },
        {
            name: 'Jewelry and Watches',
            id: 'jewelry-and-watches',
            type_id:'retail'
        },
        {
            name: 'Flowers and Gifts',
            id: 'flowers-and-gifts',
            type_id:'retail'
        }
    ],
    defaultType: [
        {
            name: 'Beauty and Personal Care',
            id: 'beauty-and-personal-care',
        },
        {
            name: 'Retail',
            id: 'retail',
        }
    ]
};

export interface FlipperDBConfig {
    [key: string]: any;

    database: { name: string, engine: string };
    tables: Array<{ name: TABLE, query: string }>;
    defaultMenu: Array<Menu>;
    defaultReasons: Array<Reason>;
    defaultType: Array<{ name: string, category: any[] }>;
}


export const Tables = {
    user: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.USER,
    business: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BUSINESS,
    branch: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BRANCHES,
    menu: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.MENU,
    type: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.TYPES,
    businessCategory: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BUSINESSCATEGORY,
    userBusiness: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.USERBUSINESS,
    taxes: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.TAXES,
    variants: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.VARIANTS,
    products: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.PRODUCTS,
    stocks: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.STOCKS,
    branchProducts: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.BRANCHPRODUCTS,
    reasons: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.REASON,
    order: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.ORDER,
    orderDetails: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.ORDERDETAILS,
    stockHistory: DEFAULT_FLIPPER_DB_CONFIG.database.name + '.' + TABLES.STOCKHISTORY,
};

export const PouchConfig = {
    channel: localStorage.getItem('channel'),
    sessionId: localStorage.getItem('sessionId'),
    // bucket: localStorage.getItem('bucket'),
    bucket: 'main',
    syncUrl: localStorage.getItem('syncUrl') + '/' + localStorage.getItem('bucket'),
    canSync: JSON.parse(localStorage.getItem('canSync')),
    user:localStorage.getItem('user'),
    password:localStorage.getItem('password'),
    Tables: {
    user: TABLES.USER + '_' + localStorage.getItem('channel'),
    business: TABLES.BUSINESS + '_' + localStorage.getItem('channel'),
    branches: TABLES.BRANCHES + '_' + localStorage.getItem('channel'),
    menus: TABLES.MENU,
    businessTypes: TABLES.TYPES,
    businessCategories: TABLES.BUSINESSCATEGORY,
    businessUsers: TABLES.USERBUSINESS + '_' + localStorage.getItem('channel'),
    taxes: TABLES.TAXES + '_' + localStorage.getItem('channel'),
    variants: TABLES.VARIANTS + '_' + localStorage.getItem('channel'),
    products: TABLES.PRODUCTS + '_' + localStorage.getItem('channel'),
    branchProducts: TABLES.BRANCHPRODUCTS + '_' + localStorage.getItem('channel'),
    reasons: TABLES.REASON + '_' + localStorage.getItem('channel'),
    orders: TABLES.ORDER + '_' + localStorage.getItem('channel'),
    orderDetails: TABLES.ORDERDETAILS + '_' + localStorage.getItem('channel'),
    stockHistories: TABLES.STOCKHISTORY + '_' + localStorage.getItem('channel'),
    subscription: TABLES.SUBSCRIPTION + '_' + localStorage.getItem('channel'),
    stocks: TABLES.STOCKS + '_' + localStorage.getItem('channel'),
    }
};
// localStorage.setItem("lastname", "Smith");
