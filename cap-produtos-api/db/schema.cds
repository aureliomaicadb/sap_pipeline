namespace db;

@cds.persistence.exists
@cds.persistence.name : 'PRODUTOS'
entity Produtos {
  key ID   : Integer;
      NOME : String(100);
}