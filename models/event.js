module.exports = (sequelize, DataTypes) => {
    return sequelize.define('event', {
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
            type: DataTypes.DATE,
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
        owner: {
            type: DataTypes.INTEGER
        }
    })
}