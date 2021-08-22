# 🐱‍👤 Api de games para App Masters 🐱‍👤 #

<p align="center"> 
  <a href="https://steam-games-app-masters.herokuapp.com/">Projeto hospedado na Heroku </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://appmasters.io/pt/">App Masters</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#documentacao">Documentação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias Usadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;

</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=7159c1&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=7159c1&labelColor=000000">
</p>

<a id="#sobre"></a>
# 📘 Sobre
Esta é uma API que foi criada durante o processo seletivo da App Masters

## Funcionalidades:
- Retorna uma lista de games
- Retorna um game de sua escolha
- Você pode listar, adicionar ou excluir um favorito

&nbsp;
<a id="documentacao"></a>
# 📍 EndPoints
## GET/

Essa EndPoint é responsavel por retornar uma lista de games 

### Parametros:

Nenhum

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber a listagem dos games
```
{
   "gameList": [
        {
            "appid": 1198240,
            "name": "Danger City"
        },
        {
            "appid": 1198250,
            "name": "Pirates on Deck VR"
        },
        {
            "appid": 1198260,
            "name": "Beneath steel clouds"
        },
        {
            "appid": 1198270,
            "name": "The Button Witch"
        },
        {
            "appid": 1198280,
            "name": "The Angel Inn Guide and Artbook"
        },
        {
            "appid": 1198290,
            "name": "Space Block Buster"
        },
        {
            "appid": 1198310,
            "name": "Mr.King Luo!Don't be kidding"
        },
        {
            "appid": 1198320,
            "name": "像素男友"
        },
        {
            "appid": 1198340,
            "name": "Summoner VR"
        },
        {
            "appid": 1198350,
            "name": "Memory Match Saga - Expansion Pack 6"
        }
    ]
}
```


## GET/game/:appid

Essa EndPoint é responsavel por retornar um game especifico! 

### Parametros:

- appid: é preciso indicar o appid do game no final da endpoint.

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber os dados do game escolhido.
```
{
     "1198280": {
        "success": true,
        "data": {
            "type": "dlc",
            "name": "The Angel Inn Guide and Artbook",
            "steam_appid": 1198280,
            "required_age": 0,
            "is_free": false,
    }
}
```

### Bad request! 400

Acontece quando o appid for de um formato invalido.
```
{
    "the appid has to be a number"
}

```

## POST/favorite/

Esse EndPoint é responsavel por registrar um novo favorito! 
### Headers:
- user_hash: Indica o usuario que está realizando a ação

### Parametros:

- appid: indica o id do game

- rating: indica a nota para o game

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber um sinal de sucesso!
```
{
    "favorite added successfully!"
}
```

### Bad request! 400

Acontece quando todos ou um dos parametros for invalido.
```
{
    [
        "user_hash is invalid!",
        "appid is invalid!",
        "rating can not be greater than 5"
        
]
}

```


## GET/favorite/

Essa EndPoint é responsavel por retornar a lista de favoritos 

### Headers:
- user_hash: Indica o usuario que está realizando a ação

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber a lista de favoritos de acordo com o user_hash.
```
[
    {
        "id": 65,
        "game_id": "1198400",
        "game_name": "Rhythm Fighter",
        "is_free": 0,
        "rating": 3,
        "type": "game" 
    },
    {
        "id": 75,
        "game_id": "1198380",
        "game_name": "COWBOY YAKUZA",
        "is_free": 0,
        "rating": 5,
        "type": "game",
    }
```

### Bad request! 400

Acontece quando o user_hash for invalido.
```
{
    "user_hash is invalid!"
    
}
```

## DELETE/game/:appi

Essa EndPoint é responsavel por deletar um favorito!

### Headers:
- user_hash: Indica o usuario que está realizando a ação


### Parametros:

- appid: indica o appid do favorito selecionado

### Respostas:

### Ok! 200

Caso esta resposta acontença você ira receber um sinal de sucesso!
```
{
    favorite deleted successfully!
}
```

### Bad request! 400

Acontece quando o user_hash for invalido.
```
{
    "user_hash is invalid!"
    
}
```

### Not Found! 404

Acontece quando o favorito não é encontrado no banco de dados
```
{
    "Not Found!"
    
}
```
<a id="tecnologias"></a>
## 💻 Tecnolgias usadas nesse Projeto:
 * Node.js
 * JavaScript
 * MySQL
 * Express,
 * knex.js
 * Redis
