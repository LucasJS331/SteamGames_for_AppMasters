class Validator{
     gameValidator(user_name, game_id, rating){
        let result = {
            status: true,
            errorMassage: []
        }
    
        if(user_name == undefined){
            result.status = false;
            result.errorMassage.push("user_hash is invalid!")
        }
    
        if(isNaN(game_id)){
            result.status = false;
            result.errorMassage.push("appid is invalid!")
        }
    
        if(isNaN(rating)){
            result.status = false;
            result.errorMassage.push("rating is invalid!")
        }
    
        if(!isNaN(rating)){
            if(rating > 5){
                result.status = false;
                result.errorMassage.push("rating can not be greater than 5");
            }
        }
        return result; 
    }
    userHash(user){
        if(user == undefined){
            return false;
        }else{
            return true;
        }
    }
}

module.exports = new Validator();