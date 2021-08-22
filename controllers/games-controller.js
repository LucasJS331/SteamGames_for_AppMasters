const axios = require("axios");
const gameService = require("../services/game-service");
const validator = require("../validator/game-validator");
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

class GamesController{
  async index(req,res){
      try {
        let gamesCache = await client.get("gameCache")
        if(!gamesCache){
          const resp = (await axios.get("https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json")).data.applist.apps
          let gameList = [];
          // reduzindo o array da resposta
          for(let i = 50; i<=100; i++){
            gameList.push(resp[i])
          }
          await client.set("gameCache", JSON.stringify(gameList), "EX", 1200);
          res.json({gameList});

        } else{
          let gameList = JSON.parse(gamesCache)
          res.json({gameList})
        }
        
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
}

  async getOneGame(req,res){
    const {appid} = req.params;
    try {
      if(!isNaN(appid)){
        // caso id for valido
        const gameInfo = await client.get(`gameInfo${appid}`)
        if(!gameInfo){
          const resp = (await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appid}`)).data
          await client.set(`gameInfo${appid}`, JSON.stringify(resp),"EX",  1200);
          res.json(resp);
          
        } else{
          let game = JSON.parse(gameInfo);
          res.json(game);
        }
      }
      else{
        res.status(400).send("the id has to be a number");
      }
      
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  async addfavorite(req,res){
    const {appid,rating} = req.body;
    const {user_hash} = req.headers;
    try {
      let result = validator.gameValidator(user_hash,appid,rating);
      if(result.status){
        // caso todos os campos da req.body e req.headers forem validos
        const {data} = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appid}`); 
        const convertedResp = Object.values(data); // transformando obj em array
        const gameData ={
          game_name: convertedResp[0].data.name,
          is_free: convertedResp[0].data.is_free,
          detailed_description: convertedResp[0].data.detailed_description,
          type: convertedResp[0].data.type,
          user_name:user_hash,
          game_id: appid,
          rating
        }

        await gameService.addFavorite(gameData);
        res.send("favorite added successfully!");
      } else{
        res.status(400).json(result.errorMassage);
      }
      
    } catch (error) {
      res.sendStatus(500);
      console.log(error);
      
    }
  }

  async deleteFavorite(req,res){
    const {appid} = req.params;
    const {user_hash} = req.headers;

    try {
      let verify = validator.userHash(user_hash);
      if(verify){
        // caso user_hash for valido
        let result = await gameService.delFavorite(appid,user_hash);
        result = result > 0 ? res.send("favorite deleted successfully!") : res.sendStatus(404);  
      }
      else{
        res.status(400).send("user invalid!");
      }
      
    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }

  }

  async getFavorits(req,res){
    const {user_hash} = req.headers;
    try {
      let verify = validator.userHash(user_hash);

      if(verify){
        // Caso o user_hash for valido
        const favorite = await client.get(`favorite:${user_hash}`);
        if(!favorite){
          // caso não houver cache
          let allFavorites = await gameService.allFavorites(user_hash);
          await client.set(`favorite:${user_hash}`, JSON.stringify(allFavorites), "EX",  1200);
          allFavorites = allFavorites.length > 0 ? res.json(allFavorites) : res.sendStatus(404);
        }else{
          // caso houver cache
          let allFavorites = JSON.parse(favorite);
          allFavorites = allFavorites.length > 0 ? res.json(allFavorites) : res.sendStatus(404);
        }
      } else{
        res.status(400).send("user invalid!");
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
    
  }
}

module.exports = new GamesController();