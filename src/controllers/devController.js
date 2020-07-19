const Dev = require('../models/Dev')
const axios = require('axios')
const { index } = require('../models/utils/pointSchema')
const paresStringAsArray = require('../utils/parseStringAsArray')


module.exports={
    async create(req,res){
        const {github_username, techs, latitude, longitude} = req.body


        const devUser = await Dev.findOne({github_username})

        if(devUser !== null){
            return res.status(400).send({erro:'user already created'})
        }

    
        const response = await axios.get(`https://api.github.com/users/${github_username}`)    
    
        const {name = login, avatar_url, bio} = response.data
        
        const techsArray = paresStringAsArray(techs)
    
    
        const location = {
            type:'Point',
            coordinates:[longitude,latitude]
        }
    
        const dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })
    
        return res.send({dev})
    },
    async index(req,res){
        const devs = await Dev.find()

        return res.json(devs)
    },
    async update(req,res ){
        //update das info de um usuario tirando o github_username  
    },
    async delete(req, res){
        //delete usuario 
    }
    
}