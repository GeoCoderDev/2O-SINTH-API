const {DataTypes} = require("sequelize");
const connectionSequelize = require("../config/database");

const User = connectionSequelize.define("User", {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,    
        validate:{
            len: [4,30]            
        }
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Created_At: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: false
});


const newUser = new User({
  Name: 'Nombre del Usuario',
  Email: 'correo@ejemplo.com',
  Password: 'clave123',
  salt: 'saltoAleatorio',
  Created_At: new Date(),
});

newUser.save()
  .then(createdUser => {
    console.log('Usuario creado:', createdUser.toJSON());
  })
  .catch(error => {
    console.error('Error al crear el usuario:', error);
  });




module.exports = User;




