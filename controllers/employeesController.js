const Employee = require('../model/User');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) {
        return res.status(204).json({
            message: 'No employees found.'
        });
        
    }
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({'message': "First and last names required!"});
    }
    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        res.status(201).json(result);
    }
    catch (err){
        console.log(err);
    }

}

const updateEmployee = async (req, res)=> {
    if (!req?.body?.id) {
        return res.status(400).json({'message': "ID parameter is required."});
    }
    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if(!employee){
        return res.status(204).json({"message": `No employee matches ID ${req.body.id}`});
    }
    if(req.body?.firstname) employee.firstname = req.body.firstname;
    if(req.body?.lastname) employee.lastname = req.body.lastname; 
    const result = await employee.save();
    res.json(result);
}
const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message': "ID parameter is required."});
    }

    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if(!employee) 
        return res.status(204).json({"message": `No employee matches ID ${req.body.id}`}); //if employee is not found, return error
    const result = await Employee.deleteOne({_id: req.body.id});
    res.json(result);
}

const getEmployeebyID = async(req, res) => {
        if (!req?.params?.id) {                                                   //request will be in the form of http://localhost:5000/employees?id=1
            return res.status(400).json({'message': "ID parameter is required."});
        }
        const employee = await Employee.findOne({_id: req.params.id}).exec();
        if(!employee) 
            res.status(400).json({"message": "Employee not found"});
        res.json(employee)    //serve the data of a specific id
    }


module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeebyID
}

