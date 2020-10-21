var jwt = require('jsonwebtoken');
var signkey = 'mes_qdhd_mobile_xhykjyxgs';

module.exports = {
    setToken:function(username,userid){
        return new Promise((resolve,reject)=>{
            const token = jwt.sign({
                name:username,
                _id:userid
            },'signkey',{ expiresIn:'0.2h' });
            resolve(token);
        })
    },
    
    verToken: function(token){
        return new Promise((resolve,reject)=>{
            jwt.verify(token, 'signkey', (err , decoded) => {
                if(!err) {
                    resolve(true);
                } else {
                    reject(false)
                }
            });
           
        })
    }

}


