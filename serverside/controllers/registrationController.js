const UserList = require('../models/registrationModels'); // Import the UserList model

// Create a new user
exports.createUser = async (req, res) => {
  try {


    const{name,team,email,studentID}=req.body

    if(!name ||!email||!studentID){
        return res.status(400).json({message:'All fields are required'})
    }

    //check dups

    const duplicate = await UserList.findOne({studentID}).lean().exec()

    if(duplicate)
    {
        return res.status(409).json({message: 'Duplicate studentID'})
    }


    const userObject = {name,team,email,studentID}

    const user = await UserList.create(userObject)

    if(user){
        res.status(201).json({message:`New user ${name} created` })
    }else{
        res.status(400).json({message:'Invalid user data received'})
    }




    //const newUser = new UserList(req.body); // Create a new instance of the UserList model with the request body
    //await newUser.save(); // Save the new user to the database
    res.status(201).json(newUser); // Return the new user as a response with a 201 status code
  } catch (error) {
    res.status(400).json({ message: error.message }); // Return an error message with a 400 status code if there is a problem creating the user
  }
};