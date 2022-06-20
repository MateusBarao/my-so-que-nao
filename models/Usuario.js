module.exports = (sequelize, DataTypes) => {
   let usuario = sequelize.define(
        'Usuario',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nome: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(45),
                allowNull: false,
                unique: true
            },
            senha: {
                type: DataTypes.STRING(64),
                allowNull: false
            },
            foto: {
                type: DataTypes.STRING(45),
                allowNull: true
            }
        },
        {
            tableName: 'usuarios',
            timestamps: true,
            paranoid: true
        }
    )
    usuario.associate = (models) => {
        usuario.hasMany(
            models.Publicacao, 
            {foreignKey:"usuarios_id", as:"publicacoes"} 
        )
    }
    
    return usuario;
}