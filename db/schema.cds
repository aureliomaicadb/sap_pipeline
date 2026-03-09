using {
    Country ,
    Currency ,
    Language ,
    User ,
    cuid ,
    managed ,
    temporal
} from '@sap/cds/common';

namespace demo;

entity Books : cuid, managed {
  title  : String;
  author : String;
  price  : Decimal(9,2);
  currency : Currency;
}