
const Sequelize = require('sequelize');

                 
const sequelize = new Sequelize(process.env.PGDB, process.env.PGUSER, process.env.PGPASS, {
    host: process.env.PGHOST, 
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