const Dev = require('../models/Dev')
const axios = require('axios')

const paresStringAsArray = require('../utils/parseStringAsArray')


module.exports={
    async create(req,res){
        const {github_username, techs, latitude, longitude} = req.body


        const devUser = await Dev.findOne({github_username})

        if(devUser !== null){
            return res.status(400).send({erro:'user already created'})
        }

        try {
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
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async index(req,res){
        const devs = await Dev.find()

        return res.json(devs)
    },
    async update( req, res ){
        //update das info de um usuario tirando o github_username  
        let {github_username, name, bio, techs} = req.body

        const devUser = await Dev.findOne({github_username})

        let techsArray = paresStringAsArray(techs)

        if(devUser == null){
            return res.status(400).json('nome nao registrado')
        }

        if(name==""){
           name = devUser.name
        }
        if(bio == ""){
            bio = devUser.bio
        }
        if(techsArray[0] == ""){
            techsArray = devUser.techs
        }

        await Dev.updateOne({
            github_username
        },
        {
            name,
            bio,
            techs:techsArray
        }
        )
       
        return res.json(techsArray)
    },
    async delete(req, res){
        //delete usuario 
        const {github_username} = req.body
        await Dev.deleteOne({
            github_username
        })
        return res.json('user deleted')
    }
    
}