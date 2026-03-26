using { db } from '../db/schema';

service catalog {
  @cds.persistence.exists
  @cds.persistence.name : 'PRODUTOS'
  entity Produtos as projection on db.Produtos;
}