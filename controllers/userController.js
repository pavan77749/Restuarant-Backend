import userModel from "../model/userModel.js"

export const getUserController = async(req,res) =>{
    try {
        //find user
        const user = await userModel.findOne({_id: req.body.id})
        //validation
        if(!user) {
            return res.status(404).send({
                success:false,
                message:'User Not Found'
            })
        }
        //hindle password
        user.password = undefined
        //resp
        res.status(200).send({
            success:true,
            message:'User get Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get User API',
            error:error.message
        })
        
    }
}

export const updateUserController = async (req,res) => {
    try {
        // find user 
        const user = await userModel.findById({_id: req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found'
            })
        }
        //update
        const {username,phone,address} = req.body
        if(username) user.username = username
        if(phone) user.phone = phone
        if(address) user.address = address
        //save 
        await user.save()
        res.status(200).send({
            success:true,
            message:"User Updated Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:false,
            message:'Error in Updating User',
            error:error.message
        })
        
    }
}