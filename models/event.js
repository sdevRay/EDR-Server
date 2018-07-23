module.exports = (sequelize, DataTypes) => {
    return sequelize.define('event', {
        objective: {
            type: DataTypes.STRING,
        },
        eventName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        eventCity: {
            type: DataTypes.STRING,
        },
        eventState: {
            type: DataTypes.STRING,
        },
        eventDate: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                
            }
        },
        //  running event, cycling, swimming??
        eventType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                len: [1, 50],
            }
        },
        //  some events are measured in KMs some in Miles
        unit: {
            type: DataTypes.ENUM,
            values: ['Kilometers', 'Miles']
        },
        //   distance of the event
        eventDistance: {
            type: DataTypes.DECIMAL(10,2),      
            allowNull: false,
            validate: {
                
            }
        },
        //    user will input time in Hours, Minutes and seconds on the front end. The controller (or services) on the backend will turn that value into raw seconds in the database.  Will make it easier to compare values to their goal.   -rce
        goalHours: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        goalMinutes: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        goalSeconds: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        // currentHours*3600 + currentMinutes*60 + currentSeconds = totalSeconds   ....Obvi
        goalTotalSeconds: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
}