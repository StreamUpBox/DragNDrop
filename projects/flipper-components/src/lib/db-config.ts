import { InjectionToken } from '@angular/core';
import { Menu } from './entries';
import { Taxes } from './entries/taxes';
import { Reason } from './entries/reason';


export const APP_CONFIG = new InjectionToken<FlipperDBConfig[]>('APP_CONFIG');

export enum TABLES {
    USER = 'users',
    BUSINESS = 'business',
    TYPES = 'types',
    MENU = 'menu',
    BRANCHES = 'branches',
    BUSINESSCATEGORY = 'businessCategory',
    USERBUSINESS = 'userBusiness',
    TAXES = 'taxes',
    PRODUCTS = 'products',
    VARIANTS = 'variants',
    REASON = 'reasons',
    STOCKS = 'stocks',
    BRANCHPRODUCTS = 'branchProducts'
}

export type TABLE = TABLES.USER |
TABLES.TYPES | TABLES.MENU |
 TABLES.BUSINESS | TABLES.BRANCHES |
 TABLES.BUSINESSCATEGORY | TABLES.USERBUSINESS |
  TABLES.TAXES | TABLES.PRODUCTS | TABLES.VARIANTS |
   TABLES.STOCKS | TABLES.REASON | TABLES.BRANCHPRODUCTS;





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
            PRIMARY KEY (id)`
        },
        {
            name: TABLES.BUSINESSCATEGORY,
            query: `id int(11) NOT NULL AUTO_INCREMENT,
                name STRING,
                typeId int(11) NOT NULL,
                PRIMARY KEY (id)`,
        },
        {
            name: TABLES.REASON,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
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
            PRIMARY KEY (id)`
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
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                name STRING,
                country STRING,
                currency STRING,
                businessUrl STRING,
                active BOOL,
                userId int(11) NOT NULL,
                typeId int(11) NOT NULL,
                categoryId int(11) NOT NULL,
                createdAt DATETIME,
                updatedAt DATETIME,
                PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.BRANCHES,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                name STRING,
                active BOOL,
                businessId int(11) NOT NULL,
                createdAt DATETIME,
                updatedAt DATETIME,
                PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.USERBUSINESS,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                    userId int(11) NOT NULL,
                    businessId int(11) NOT NULL,
                    PRIMARY KEY (id)
                    `
        },
        {
            name: TABLES.TAXES,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                        name STRING,
                        percentage int(11),
                        active BOOL,
                        isDefault BOOL,
                        businessId int(11) NOT NULL,
                        createdAt DATETIME,
                        updatedAt DATETIME,
                        PRIMARY KEY (id)
                        `
        },
        {
            name: TABLES.PRODUCTS,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
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
                    createdAt DATETIME,
                    updatedAt DATETIME,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.BRANCHPRODUCTS,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                     productId int(11) NOT NULL,
                     branchId int(11) NOT NULL,
                    PRIMARY KEY (id)
                `
        },
        {
            name: TABLES.VARIANTS,
            query: ` id int(11) NOT NULL AUTO_INCREMENT,
                    name STRING,
                    productName STRING,
                    SKU STRING,
                    categoryName STRING NULL,
                    productId int(11) NOT NULL,
                    supplyPrice int(11) NULL,
                    retailPrice int(11) NULL,
                    wholeSalePrice int(11) NULL,
                    unitId int(11) NULL,
                    isActive BOOL,
                    inStock int(11) NULL,
                    isDraft BOOL,
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
                    reasonId int(11) NOT NULL,
                    lowStock int(11) NOT NULL,
                    currentStock int(11) NOT NULL,
                    unitId int(11) NULL,
                    active BOOL,
                    inStock int(11) NULL,
                    canTrackingStock BOOL,
                    showlowStockAlert BOOL,
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
            icon: 'inventory.svg',
            route: 'admin/pos',
            active: false,
            isSetting: false,
        },
        {
            name: 'Invertory',
            icon: 'invertory.svg',
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
    defaultTaxes: [
        {
            name: 'no Tax',
            percentage: 0,
            businessId: 0,

            active: true,
            isDefault: true,
            createdAt: new Date(),
            updatedAt: new Date()
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
    defaultTaxes: Array<Taxes>;
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
};
