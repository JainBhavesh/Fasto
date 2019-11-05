import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class SqliteDBService {
  databaseObj: SQLiteObject;
  readonly database_name: string = "fasto.db";
  readonly table_name_customers: string = "customers";
  readonly table_name_products: string = "products";

  constructor(public sqlite: SQLite) { }

  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.databaseObj = db;
      this.createTable_customers();
      this.createTable_products();
    }).catch(e => {
      console.log("error " + JSON.stringify(e))
    });
  }

  openDB() {
    return new Promise<any>((resolve, reject) => {
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.databaseObj = db;
        resolve('success');
      });
    });
  }

  createTable_customers() {
    this.databaseObj.executeSql('DROP TABLE IF EXISTS ' + this.table_name_customers).then(() => {
      this.databaseObj.executeSql('CREATE TABLE ' + this.table_name_customers + ' (CustomerCode varchar(10),AltCustomerCode varchar(10),Status varchar(2),CompanyName varchar(50),Address varchar(50),Address2 varchar(50),Address3 varchar(50),City varchar(30),Province varchar(2),PostalCode varchar(10),Country varchar(10),PhoneNumber varchar(12),FaxNumber varchar(12),Terms varchar(5),CurrencyCode varchar(3),GstPayable varchar(5),PstPayable varchar(5),HstPayable varchar(5),DiscountCode varchar(1),PriceCode varchar(2),DeliveryCode varchar(12),Territory varchar(3),CreditLimit varchar(16),EmailAddress varchar(50),WebPassword varchar(50),Notes TEXT)', []).then(() => { }).catch(e => {
        console.log("error " + JSON.stringify(e))
      });
    }).catch(() => {
      this.databaseObj.executeSql('CREATE TABLE ' + this.table_name_customers + ' (CustomerCode varchar(10),AltCustomerCode varchar(10),Status varchar(2),CompanyName varchar(50),Address varchar(50),Address2 varchar(50),Address3 varchar(50),City varchar(30),Province varchar(2),PostalCode varchar(10),Country varchar(10),PhoneNumber varchar(12),FaxNumber varchar(12),Terms varchar(5),CurrencyCode varchar(3),GstPayable varchar(5),PstPayable varchar(5),HstPayable varchar(5),DiscountCode varchar(1),PriceCode varchar(2),DeliveryCode varchar(12),Territory varchar(3),CreditLimit varchar(16),EmailAddress varchar(50),WebPassword varchar(50),Notes TEXT)', []).then(() => { }).catch(e => {
        console.log("error " + JSON.stringify(e))
      });
    });
  }

  insert_customers_Row(val: any) {
    let query = "INSERT INTO " + this.table_name_customers + " (CustomerCode,AltCustomerCode,Status,CompanyName,Address,Address2,Address3,City,Province,PostalCode,Country,PhoneNumber,FaxNumber,Terms,CurrencyCode,GstPayable,PstPayable,HstPayable,DiscountCode,PriceCode,DeliveryCode,Territory,CreditLimit,EmailAddress,WebPassword,Notes) VALUES ";
    let data = [];
    let rowArgs = [];
    val.forEach((cust: any) => {
      rowArgs.push("(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
      data.push(cust.CustomerCode);
      data.push(cust.AltCustomerCode);
      data.push(cust.Status);
      data.push(cust.CompanyName);
      data.push(cust.Address);
      data.push(cust.Address2);
      data.push(cust.Address3);
      data.push(cust.City);
      data.push(cust.Province);
      data.push(cust.PostalCode);
      data.push(cust.Country);
      data.push(cust.PhoneNumber);
      data.push(cust.FaxNumber);
      data.push(cust.Terms);
      data.push(cust.CurrencyCode);
      data.push(cust.GstPayable);
      data.push(cust.PstPayable);
      data.push(cust.HstPayable);
      data.push(cust.DiscountCode);
      data.push(cust.PriceCode);
      data.push(cust.DeliveryCode);
      data.push(cust.Territory);
      data.push(cust.CreditLimit);
      data.push(cust.EmailAddress);
      data.push(cust.WebPassword);
      data.push(cust.Notes);
    });
    query += rowArgs.join(", ");

    this.databaseObj.executeSql(query, [data]).then((response: any) => {
      alert(JSON.stringify(response));
      this.getRows_customers().then(res => {
        alert(JSON.stringify(res));
      })
    }).catch(e => {
      console.log("error insert_customers_Row -> " + JSON.stringify(e))
    });
  }

  createTable_products() {
    this.databaseObj.executeSql('DROP TABLE IF EXISTS ' + this.table_name_products).then(() => {
      this.databaseObj.executeSql('CREATE TABLE ' + this.table_name_products + ' (ItemNumber varchar(20),UPCCode varchar(13),Status varchar(2),Description varchar(75),CategoryCode varchar(3),CatalogueClass varchar(5),MinOrderQty INTEGER,DefaultPrice varchar(7),PriceCode1 varchar(7),PriceCode2 varchar(7),PriceCode3 varchar(7),PriceCode4 varchar(7),PriceCode5 varchar(7),PriceCode6 varchar(7),PriceCode7 varchar(7),PriceCode8 varchar(7),PriceCode9 varchar(7),PriceCode10 varchar(7),PriceCode11 varchar(7),PriceCode12 varchar(7),PriceCode13 varchar(7),PriceCode14 varchar(7),PriceCodeS varchar(7),PriceCodeW varchar(7),UnitOfMeasure varchar(5),QtyOnHand INTEGER,QtyCommitted INTEGER,QtyOnPO INTEGER,CaseSize varchar(7),QtyPerCase INTEGER,QtyPerInnerPack INTEGER,QtyAvailToday INTEGER,QtyAvailAtFirstETA INTEGER,FirstETA varchar(30),BarCode TEXT,Variation varchar(50),Notes TEXT)', []).then(() => { }).catch(e => { console.log("error" + JSON.stringify(e)) });
    }).catch(() => {
      this.databaseObj.executeSql('CREATE TABLE ' + this.table_name_products + ' (ItemNumber varchar(20),UPCCode varchar(13),Status varchar(2),Description varchar(75),CategoryCode varchar(3),CatalogueClass varchar(5),MinOrderQty INTEGER,DefaultPrice varchar(7),PriceCode1 varchar(7),PriceCode2 varchar(7),PriceCode3 varchar(7),PriceCode4 varchar(7),PriceCode5 varchar(7),PriceCode6 varchar(7),PriceCode7 varchar(7),PriceCode8 varchar(7),PriceCode9 varchar(7),PriceCode10 varchar(7),PriceCode11 varchar(7),PriceCode12 varchar(7),PriceCode13 varchar(7),PriceCode14 varchar(7),PriceCodeS varchar(7),PriceCodeW varchar(7),UnitOfMeasure varchar(5),QtyOnHand INTEGER,QtyCommitted INTEGER,QtyOnPO INTEGER,CaseSize varchar(7),QtyPerCase INTEGER,QtyPerInnerPack INTEGER,QtyAvailToday INTEGER,QtyAvailAtFirstETA INTEGER,FirstETA varchar(30),BarCode TEXT,Variation varchar(50),Notes TEXT)', []).then(() => { }).catch(e => { console.log("error" + JSON.stringify(e)) });
    });
  }

  insert_products_Row(val: any) {
    this.databaseObj.executeSql('INSERT INTO ' + this.table_name_products + ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [val.ItemNumber, val.UPCCode, val.Status, val.Description, val.CategoryCode, val.CatalogueClass, val.MinOrderQty, val.DefaultPrice, val.PriceCode1, val.PriceCode2, val.PriceCode3, val.PriceCode4, val.PriceCode5, val.PriceCode6, val.PriceCode7, val.PriceCode8, val.PriceCode9, val.PriceCode10, val.PriceCode11, val.PriceCode12, val.PriceCode13, val.PriceCode14, val.PriceCodeS, val.PriceCodeW, val.UnitOfMeasure, val.QtyOnHand, val.QtyCommitted, val.QtyOnPO, val.CaseSize, val.QtyPerCase, val.QtyPerInnerPack, val.QtyAvailToday, val.QtyAvailAtFirstETA, val.FirstETA, val.BarCode, val.Variation, val.Notes])
      .then(() => {
      })
      .catch(e => {
        alert("error insert_products_Row -> " + JSON.stringify(e))
      });
  }

  getRows_customers() {
    return new Promise<any>((resolve, reject) => {
      this.databaseObj.executeSql("SELECT * FROM " + this.table_name_customers, [])
        .then((res) => {
          resolve(res);
        })
        .catch(e => {
          console.log("error getRows_customers -> " + JSON.stringify(e));
        });
    });
  }

  getRows_products() {
    return new Promise<any>((resolve, reject) => {
      this.databaseObj.executeSql("SELECT * FROM " + this.table_name_products, [])
        .then((res) => {
          resolve(res);
        })
        .catch(e => {
          console.log("error getRows_products -> " + JSON.stringify(e));
        });
    });
  }

  getSearchRows_customers(val: any) {
    return new Promise<any>((resolve, reject) => {
      this.databaseObj.executeSql("SELECT * FROM " + this.table_name_customers + " WHERE (CompanyName LIKE ?)", ['%' + val + '%'])
        .then((res) => {
          resolve(res);
        })
        .catch(e => {
          console.log("error getSearchRows_customers -> " + JSON.stringify(e));
        });
    });
  }

  getSearchRows_product(val: any) {
    return new Promise<any>((resolve, reject) => {
      this.databaseObj.executeSql("SELECT * FROM " + this.table_name_products + " WHERE (ItemNumber LIKE ?)", ['%' + val + '%'])
        .then((res) => {
          resolve(res);
        })
        .catch(e => {
          console.log("error getSearchRows_product -> " + JSON.stringify(e));
        });
    });
  }
}
