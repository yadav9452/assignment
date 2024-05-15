const mongoose = require("mongoose");

const student = mongoose.Schema({
    StudentId:Number,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
	stream : { type: mongoose.Schema.Types.ObjectId, ref: 'streams'},
	subject : { type: mongoose.Schema.Types.ObjectId, ref: 'subjects'},
    role:{
        type:String,enum:["student","admin"],default:"student"
    }

},{
    versionKey:false
})

const StudentModel = mongoose.model('students',student);

module.exports={
    StudentModel
}