import express from 'express';
import UserModel from "../controllers/user.js";

const { createUser, getUser, getAllUsers, updateUser, deleteUser } = UserModel
const router = express.Router();

router.get('/', async (req, res) =>  {
    return res.json(await getAllUsers());
});

router.get('/:id', async (req, res) =>  {
    const { params } = req;
    const { id } = params;
    return res.json(await getUser(id))
});

router.post('/', async (req, res) => {
    //mockedUser - you should remove after testing
    const user = {
        email: 'express-sire@express-sire.com',
        password: '1234',
    }
    const {body} = req;
    return res.json(await createUser(body || user ))
} );

router.put('/:id', async (req, res) => {
    const { params, body} = req;
    const { id } = params;
    return res.json(await updateUser(id,body))
} );

router.delete('/:id', async (req, res) => {
    const { params } = req;
    const { id } = params;
    return res.json(await deleteUser(id))
} );

export default router;
