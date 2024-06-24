import categoryModel from "../model/categoryModel.js";

export const createCategoryController =  async(req,res) => {
    try {
        const {title, imageURL} = req.body
        if(!title){
            return res.status(401).send({
                success:false,
                message:'Please Provide the category'
            })
        }
        const existingCategory = await categoryModel.findOne({title})
        if(existingCategory){
            return res.status(200).send({
                success:false,
                message:'Category already exists'
            })
        }
        const category = await new categoryModel({
            title,
            imageURL
        }).save()
        
        res.status(201).send({
            success:true,
            message:'Category Created Successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in creating Category',
            error:error.message
        })
        
    }
}

// get all category
export const getAllCategoryController =  async(req,res) =>{
    try {
        const category = await categoryModel.find({})
        //validation
        if(!category){
            return res.status(404).send({
                success:false,
                message:'Category not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Category Fetched Successfully',
            totalCount:category.length,
            category
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting all category',
            error:error.message
        })
    }
}

export const updateCategoryController = async(req,res) => {
    try {
        const {id} = req.params 
        const {title,imageURL } = req.body
        const updateCategory = await categoryModel.findByIdAndUpdate(
            id,
            {title,imageURL},
            {new:true}
        )
        if(!updateCategory) {
            return res.status(404).send({
                success:false,
                message:'No Category Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            updateCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in updating Category Controller',
            error:error.message
        })
        
    }
}

// Delete Category
export const deleteCategoryController = async(req,res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message:'Please provide category id'
            })
        }
        const category = await categoryModel.findById(id)
        if(!category) {
            return res.status(404).send({
                success:false,
                message:'Category Not Found'
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category Deleted Successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Deleting Category',
            error:error.message
        })

        
    }
}