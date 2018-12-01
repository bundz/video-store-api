# video-store-api
A Video Store API

## Como rodar?

```
docker-compose up
```

## O que vai acontecer?
* Dois container MySQL vão executar um para a aplicação outro para os testes.
* A api da video-store estará rodando na porta 3000
* A documentação estará disponível na porta 5000
* Uma pasta chamada Mochawesome-report será criada após os testes serem executados, ela contém um arquivo index.html. Se você abrir esse arquivo um report dos testes será exibido.
* Uma pasta chamada coverage será criada após os testes serem executados. Ela contém a cobertura realizada dos testes sobre o código.


