//Author : Pallavi Cherukupalli (B00887062)
const mongoose = require("mongoose");
const BlogModel = require("../models/BlogModel");


exports.addBlogs = async (req, res) => {
  try {
    const newBlogModel = new BlogModel({
        _id: new mongoose.Types.ObjectId(),
        BlogContent: req.body.content,
        TimePosted: req.body.time
    })
    newBlogModel.save().then((resp) => {
      res.status(200).json({
        message: "Blog added successfully",
        status: true,
      });
    })
    }catch(exception){
        res.status(500).json({
            message: exception.message,
            status: false,
          });
    }
}


exports.deleteBlog = async (req, res) => {
try {
    const blogId = req.params.id
    const response = await BlogModel.findByIdAndDelete(blogId);
        res.status(200).json({
          message: "Blog deleted successfully",
          status: true,
          Data : response
        });
      }catch(exception){
        res.status(500).json({
            message: exception.message,
            status: false,
        });
      }
  }


exports.updateBlog = async (req, res) => {
    try{
        const blogId = req.params.id;
        const updatedBlog = {
            BlogContent: req.body.content,
            TimePosted: req.body.time,
          };
          const newupdatedBlog = await BlogModel.findByIdAndUpdate(
            blogId,
            {
              $set: updatedBlog,
            },
            { new: true }
          );
        res.status(200).json({
            Message: "Blog updated Successfully !!",
            Status: true,
            Data: newupdatedBlog,
          });
    }catch(ex){
        res.status(500).json({
            Message:ex.message,
            Status: false
          });
    }
}

exports.getAllBlogs = async (req, res) => {
    try {
        const blogList = await BlogModel.find({});
        res.status(200).json({
          blogs: blogList,
          success: true,
        });
      } catch (err) {
        res.status(500).json({
          message: err.message,
          success: false,
        });
      }
}

 
