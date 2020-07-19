const { index } = require("../models/utils/pointSchema");

const Dev = require('../models/Dev') 
const paresStringAsArray = require('../utils/parseStringAsArray')

module.exports={
    async index(req,res){
        const {latitude, longitude, techs} = req.query

        const techsArray = paresStringAsArray(techs)


        const devs = await Dev.find({
            techs:{
                $in:techsArray,
            },
            location:{
                $near:{
                    $geometry:{
                        type:'Point',
                        coordinates:[longitude, latitude]
                    },
                    $maxDistance: 10000,
                }
            }
        })
        
        console.log(latitude,longitude,techsArray);
        return res.send(devs)
    }
}