
const Sequelize = require('sequelize');

                 
const sequelize = new Sequelize('EventDrivenTraining', 'postgres', 'mypassword', {
    host: 'localhost', 
    dialect: 'postgres'  
});
                        
sequelize.authenticate().then(
    function() { 
        console.log('Connected to EventDrivenTraining postgres database');
    },
    function(err){ 
        console.log(err);
    }
);
                 
module.exports = sequelize;