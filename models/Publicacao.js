module.exports = (sequelize, DataTypes) => {
    let publicacao = sequelize.define(
        'Publicacao',
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
          },
          texto: {
            type: DataTypes.TEXT,
          },
          imagem:{
            type: DataTypes.STRING(45)
          },
          usuarios_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model:{
                  tableName: "usuarios"
                },
                key:"id"
              }
          },
          createdAt: DataTypes.DATE,
          updatedAt: DataTypes.DATE,
        },
        { 
        tableName: 'publicacoes',
        timestamps: true,
        }
      )
    
     publicacao.associate = (models) => {
       publicacao.belongsTo(models.Usuario, {foreignKey:"usuarios_id", as:"Autor"}),
       publicacao.belongsToMany(
           models.Usuario,
           {as:'curtidores', through:'curtidas', foreignKey:'publicacoes_id', otherKey:'usuarios_id', timestamps: false}
           );
    }
      
    return publicacao;
    
  }