class Validator{
     gameValidator(user_name, game_id, rating){
        let result = {
            status: true,
            errorMassage: []
        }
    
        if(user_name == undefined){
            result.status = false;
            result.errorMassage.push("nome invalido!")
        }
    
        if(isNaN(game_id)){
            result.status = false;
            result.errorMassage.push("appid invalido!")
        }
    
        if(isNaN(rating)){
            result.status = false;
            result.errorMassage.push("nota invalida!")
        }
    
        if(!isNaN(rating)){
            if(rating > 5){
                result.status = false;
                result.errorMassage.push("nota não pode ser maior que 5")
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