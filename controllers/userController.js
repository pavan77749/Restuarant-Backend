import userModel from "../model/userModel.js"
import bcrypt from 'bcryptjs'

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

export const updatePasswordController = async (req,res) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User Not found'
            })
        }
        //get data from user
        const {oldPassword,newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:'Please Provide old or new Password'
            })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
    if(!isMatch){
        return res.status(500).send({
            success:false,
            message:'Invalid Credentials'
        })
    }
        //hashing Password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:'Password Updated Successfully',
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in updating Password',
            error:error.message
        })
        
    }
}

export const resetPasswordController = async (req,res) => {
    try {
        const {email,newPassword,answer} = req.body
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:'Please Provide all the fields'
            })
        }
        const user = await userModel.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User Not Found or Invalid answer'
            })
        }
        //hashing Password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:'Password Reset Successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in reseting Password',
            error:error.message
        })
        
    }
}

export const deleteUserController = async (req,res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:'Your account has been Deleted Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Deleting User Profile',
            error:error.message
        })
        
    }
}