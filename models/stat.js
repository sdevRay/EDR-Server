module.exports = (sequelize, DataTypes) => {
    return sequelize.define('stat', {
        date: {
            type: DataTypes.DATE,
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
        //  need to confirm units.  people training for marathons work in miles. people training for 5ks,10ks etc work in KMs.
        unit: {
            type: DataTypes.ENUM,
            values: ['Kilometers', 'Miles']
        },
        //   user can enter either a current distance they can do, or current time, or both.     -rce
        currentDistance: {
            type: DataTypes.DECIMAL(10,2),  
            allowNull: true,
            validate: {
                
            }
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
}