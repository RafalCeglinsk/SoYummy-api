import { Schema, model } from "mongoose"

const IndegredientsSchema = new Schema ({
    name: {
        type: String
    },
    desc: {
        type:String
    },
    img: {
        type:String
    }
})

const IndegredientsModel = model("Indegredient", IndegredientsSchema)

export default IndegredientsModel