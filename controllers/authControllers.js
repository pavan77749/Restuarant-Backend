import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import JWT  from "jsonwebtoken"

export const registerController = async (req, res) => {
  try {
    const { username, email, phone, address, password , answer} = req.body;
    //validation
    if (!username || !email || !phone || !address || !password || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }

    //check existing user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "User already Exist",
        error: error.message,
      });
    }

    //hashing Password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = await userModel.create({
      username,
      phone,
      email,
      password:hashedPassword,
      address,
      answer
    });
    res.status(201).send({
      success: true,
      message: "User is Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      error: error.message,
    });
  }
};

//login controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email or Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found ",
      });
    }
    //check user Password || compare Password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(500).send({
            success:false,
            message:'Invalid Credentials'
        })
    }

    //token
    const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn : "7d"
    })

    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      token,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error: error.message,
    });
  }
};
