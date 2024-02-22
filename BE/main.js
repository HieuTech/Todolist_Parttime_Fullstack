import { log } from "console";
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'; // Import cors
import bodyParser from "body-parser";

const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: "http://localhost:5174", // Cấu hình nguồn gốc được phép
  optionsSuccessStatus: 200, // Lưu ý một vài front-end frameworks cần điều này
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

//getall
app.get("/api/v1/todo",async( req,res)=>{
    try {
        const todo = await prisma.todo.findMany()
        res.status(200).json(todo);
            
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})
//post
app.post("/api/v1/todo", async (req, res) => {
  try {
    const { todo_title } = req.body;

    const newPost = await prisma.todo.create({
      data: {
        todo_title,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
app.patch("/api/v1/todo/:id",async (req,res)=>{

    try {
        const {id} = req.params
        const { todo_title,status } = req.body;
        const postId = await prisma.todo.findUnique({
            where:{
                id: Number(id)
            }
        })
        if(!postId){
            return res.status(404).json({
                error: "post not found"
            })
        }
        
        const updateTodo = await prisma.todo.update({
          where: {
            id: Number(id),
          },
          data: {
            todo_title,
            status
          },
        });
        res.status(200).json(updateTodo)

    }catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
})

app.delete("/api/v1/todo/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const checkExits = await prisma.todo.findUnique({
            where: {
                id : Number(id)
            }
        })
        if(!checkExits){
            return res.status(404).json({
                error:"Post not found"
            })
        }

        const postDelete = await prisma.todo.delete({
            where:{ id : Number(id)}
        })
        res.status(200).json(postDelete)

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})




app.listen("3000", () => {
  console.log("ok");
});
