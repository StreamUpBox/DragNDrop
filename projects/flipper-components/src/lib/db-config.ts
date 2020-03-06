import { InjectionToken } from '@angular/core';
import { Menu } from './entries';
import { Taxes } from './entries/taxes';
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





export const DEFAULT_FLIPPER_DB_CONFIG: FlipperDBConfig = {

    database: { name: 'flipper', engine: 'LOCALSTORAGE' },
    tables: [
        {
            name: TABLES.USER,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
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
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                    name STRING,
                    typeId int(11) NOT NULL,
                    syncedOnline BOOL,
                    PRIMARY KEY (id)
                `,
        },
        {
            name: TABLES.REASON,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
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
            query: `id int(11) NOT NULL AUTO_INCREMENT,
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
                id int(11) NOT NULL AUTO_INCREMENT,
                name STRING,
                country STRING,
                currency STRING,
                businessUrl STRING,
                timeZone STRING,
                active BOOL,
                userId int(11) NOT NULL,
                typeId int(11) NOT NULL,
                categoryId int(11) NOT NULL,
                taxRate int(11) NOT NULL,
                syncedOnline BOOL,
                createdAt DATETIME,
                updatedAt DATETIME,
                PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.BRANCHES,
            query: `
                id int(11) NOT NULL AUTO_INCREMENT,
                name STRING,
                active BOOL,
                businessId int(11) NOT NULL,
                syncedOnline BOOL,
                mapLatitude STRING NULL,
                mapLongitude STRING NULL,
                createdAt DATETIME,
                updatedAt DATETIME,
                PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.USERBUSINESS,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                    userId int(11) NOT NULL,
                    businessId int(11) NOT NULL,
                    syncedOnline BOOL,
                    PRIMARY KEY (id)
                    `
        },
        {
            name: TABLES.TAXES,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                    name STRING,
                    percentage int(11),
                    active BOOL,
                    isDefault BOOL,
                    businessId int(11) NOT NULL,
                    syncedOnline BOOL,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                        `
        },
        {
            name: TABLES.PRODUCTS,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                    name STRING,
                    categoryId int(11) NULL,
                    description STRING NULL,
                    picture STRING NULL,
                    taxId int(11) NULL,
                    active BOOL,
                    hasPicture BOOL,
                    isDraft BOOL,
                    isCurrentUpdate BOOL,
                    businessId int(11) NOT NULL,
                    supplierId int(11) NULL,
                    syncedOnline BOOL,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.BRANCHPRODUCTS,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                    productId int(11) NOT NULL,
                    branchId int(11) NOT NULL,
                    syncedOnline BOOL,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.VARIANTS,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                    name STRING,
                    productName STRING,
                    SKU STRING,
                    categoryName STRING NULL,
                    brandName  STRING NULL,
                    productId int(11) NOT NULL,
                    unit STRING NULL,
                    isActive BOOL,
                    isDraft BOOL,
                    syncedOnline BOOL,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.STOCKS,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                    branchId int(11) NOT NULL,
                    variantId int(11) NOT NULL,
                    lowStock int(11) NOT NULL,
                    currentStock int(11) NOT NULL,
                    supplyPrice int(11) NULL,
                    retailPrice int(11) NULL,
                    wholeSalePrice int(11) NULL,
                    active BOOL,
                    isDraft BOOL,
                    syncedOnline BOOL,
                    canTrackingStock BOOL,
                    showlowStockAlert BOOL,
                    syncedOnline BOOL,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.ORDER,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                    branchId int(11) NOT NULL,
                    userId int(11) NOT NULL,
                    orderNumber STRING NOT NULL,
                    customerId int(11) NULL,
                    status STRING NOT NULL,
                    reference STRING NULL,
                    orderType STRING NOT NULL,
                    supplierId int(11) NULL,
                    subTotal int(11) NULL,
                    supplierInvoiceNumber STRING NULL,
                    taxRate int(11) NULL,
                    taxAmount int(11) NULL,
                    discountRate int(11) NULL,
                    discountAmount int(11) NULL,
                    cashReceived int(11) NULL,
                    customerChangeDue int(11) NULL,
                    saleTotal int(11) NULL,
                    customerSaving int(11) NULL,
                    paymentId int(11) NULL,
                    orderNote STRING NULL,
                    active BOOL,
                    isDraft BOOL,
                    syncedOnline BOOL,
                    deliverDate DATETIME,
                    orderDate DATETIME,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.ORDERDETAILS,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                    orderId int(11) NOT NULL,
                    variantId int(11) NOT NULL,
                    variantName STRING NOT NULL,
                    price int(11) NULL,
                    quantity int(11) NOT NULL,
                    unit STRING NULL,
                    taxAmount int(11) NULL,
                    taxRate int(11) NULL,
                    discountAmount int(11) NULL,
                    discountRate int(11) NULL,
                    subTotal int(11) NULL,
                    discountRate int(11) NULL,
                    discountAmount int(11) NULL,
                    note STRING NULL,
                    syncedOnline BOOL,
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.STOCKHISTORY,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                    variantId int(11) NOT NULL,
                    variantName STRING NOT NULL,
                    stockId int(11) NOT NULL,
                    quantity int(11) NOT NULL,
                    reason STRING NULL,
                    note STRING NULL,
                    isPreviously BOOL,
                    isDraft BOOL,
                    syncedOnline BOOL,
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
                    syncedOnline BOOL,
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
                    syncedOnline BOOL,
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
            route: 'admin/analytics',
            active: true,
            isSetting: false,
        },
        {
            name: 'POS',
            icon: 'pos.svg',
            route: 'admin/pos',
            active: false,
            isSetting: false,
        },
        {
            name: 'Inventory',
            icon: 'inventory.svg',
            route: 'admin/inventory',
            active: false,
            isSetting: false,
        },
        {
            name: 'Settings',
            icon: 'settings.svg',
            route: 'admin/settings',
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
    defaultType: [
        {
            name: 'Beauty and Personal Care',
            category: [
                {
                    name: 'Beauty Salon'
                },
                {
                    name: 'Hair Salon/Barbershop'
                },
                {
                    name: 'Independent Stylist/Barber'
                },
                {
                    name: 'Massage Therapist'
                },
                {
                    name: 'Nail Salon'
                },
                {
                    name: 'Spa'
                },
                {
                    name: 'Tanning Salon'
                },
                {
                    name: 'Tattoo/Piercing'
                }


            ]
        },
        {
            name: 'Retail',
            category: [
                {
                    name: 'Pharamcy'
                },
                {
                    name: 'Grocery/Market'
                },
                {
                    name: 'Pet Store'
                },
                {
                    name: 'Electronics'
                },
                {
                    name: 'Hardware Store'
                },
                {
                    name: 'Eyewear'
                },
                {
                    name: 'Outdoor Markets'
                },
                {
                    name: 'Speciality Shop'
                },
                {
                    name: 'Sporting Goods'
                },
                {
                    name: 'Hobby Shop'
                },
                {
                    name: 'Jewelry and Watches'
                },
                {
                    name: 'Flowers and Gifts'
                }


            ]
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
    bucket: localStorage.getItem('bucket'),
    syncUrl: localStorage.getItem('syncUrl') + '/' + localStorage.getItem('bucket'),
    canSync: JSON.parse(localStorage.getItem('canSync')),
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
    products: TABLES.STOCKS + '_' + localStorage.getItem('channel'),
    branchProducts: TABLES.BRANCHPRODUCTS + '_' + localStorage.getItem('channel'),
    reasons: TABLES.REASON + '_' + localStorage.getItem('channel'),
    orders: TABLES.ORDER + '_' + localStorage.getItem('channel'),
    orderDetails: TABLES.ORDERDETAILS + '_' + localStorage.getItem('channel'),
    stockHistories: TABLES.STOCKHISTORY + '_' + localStorage.getItem('channel'),
    subscription: TABLES.SUBSCRIPTION + '_' + localStorage.getItem('channel'),
    }
};
// localStorage.setItem("lastname", "Smith");
