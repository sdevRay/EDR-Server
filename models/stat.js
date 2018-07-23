module.exports = (sequelize, DataTypes) => {
    return sequelize.define('stat', {
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                
            }
        },
        discipline: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                len: [1, 50],
            }
        },
        // training for distance or time?
        measurement: {
            type: DataTypes.ENUM,
            values: ['Distance', 'Time']
        },
        //  need to confirm units.  people training for marathons work in miles. people training for 5ks,10ks etc work in KMs.
        unit: {
            type: DataTypes.ENUM,
            values: ['Kilometers', 'Miles']
        },
        //   user can enter either a current distance they can do, or current time, or both.     -rce
        currentDistance: {
            type: DataTypes.INTEGER,      
            allowNull: true,
            validate: {
                
            }
        },
        //    user will input time in Hours, Minutes and seconds on the front end. The controller (or services) on the backend will turn that value into raw seconds in the database.  Will make it easier to compare values to their goal.   -rce
        currentHours: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        currentMinutes: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        currentSeconds: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        // currentHours*3600 + currentMinutes*60 + currentSeconds = totalSeconds   ....Obvi
        totalSeconds: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
}