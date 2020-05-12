import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'shared/SequelizeTypings/typings/SequelizeAttributes';
import { RoleInstance, RoleAttributes } from 'shared/SequelizeTypings/models';

const RoleFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes,
): Sequelize.Model<RoleInstance, RoleAttributes> => {
    const attributes: SequelizeAttributes<RoleAttributes> = {
        name: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.DATE,
        },
    };

    const Role = sequelize.define<RoleInstance, RoleAttributes>('Role', attributes);

    Role.associate = (models) => {
        Role.belongsTo(models.Church);
        Role.belongsToMany(models.User, { through: 'RoleGroup', as: 'duty' });
    };

    return Role;
};

export default RoleFactory;
