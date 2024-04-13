const UserList = require("../models/registrationModels");

const mongoose = require("mongoose");

// View all Users from UserLists 
const viewAllUsers = async (req, res) => {
  try {
    const viewallUsers = await UserList.find({}).sort({ createdAt: -1 });
    res.status(200).json(viewallUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one user by objectID SAMPLE
const viewUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user (wrong objectid" });
    }

    const user = await UserList.findById(id);

    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by objectID @ Neil
const updateUser = async (req, res) => {
  try {

    
    const {name,team,email, studentID}=req.body

    if(!studentID)
    {
        return res.status(400).json({message:'student ID needed'})
    }

    const user = await UserList.findOne({ studentID: studentID }).exec()

    if(!user)
    {
        return res.status(400).json({message:'Student not Found'})
    }

    /*
    const duplicate_email = await User.findOne({email}).lean.exec()

    if(duplicate_email & duplicate_email?._studentID.toString() !==studentID)
    {
        return res.status(409).json({message: 'Duplicate email'})
    }
    */
    if (name)
      user.name =name
    if (email)
      user.email=email
    user.studentID = studentID
    if (team)
      user.team=team
    

    const updateUser = await user.save()

    res.json({message: `${studentID} updated` })
    /*
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "unavailable ObjectId" });
    }

    const user = await UserList.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ error: "No such user" });
    }

    */
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by objectID @Ed
const deleteUser = async (req, res) => {
  try {
    const {studentID}= req.body
    if(!studentID)
    {
        return res.status(400).json({message:'Student ID Required'})
    }
    const user = await UserList.findOne({ studentID: studentID }).exec();


    if (!user){
        return res.status(400).json({message:'Student not found'})
    }

    const result=await user.deleteOne()

    const reply = `User with ID ${studentID} deleted`

    res.json(reply)
    //await UserList.findByIdAndDelete(req.params.id);
    //res.json({ message: 'User List deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  viewUser,
  deleteUser,
  updateUser,
  viewAllUsers,
};
