import SequelizeObject from '../database/connect.js';

const { models } = SequelizeObject;
const { User } = models;

const getAllUsers = () => User.findAll();
const getUser = id => User.findByPK(id);
const createUser = body => User.create(body);
const updateUser = (id, body) => User.update(body, { where: { id } });
const deleteUser = id => User.destroy({ where: { id } });

export default  { getUser, getAllUsers, createUser, updateUser, deleteUser };