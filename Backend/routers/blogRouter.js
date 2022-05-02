//Author : Pallavi Cherukupalli (B00887062)
const express = require("express");
const blogRouter = express.Router();
const blogManagementController = require('../controllers/blogManagementController');
blogRouter.post('/addBlogs', blogManagementController.addBlogs);
blogRouter.get("/getAllBlogs", blogManagementController.getAllBlogs);
blogRouter.delete('/deleteBlog/:id', blogManagementController.deleteBlog);
blogRouter.put("/updateBlog/:id", blogManagementController.updateBlog);
module.exports = blogRouter;
