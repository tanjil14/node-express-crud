import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);
router.put('/:userId/orders', UserControllers.addNewProduct);
router.get('/:userId/orders', UserControllers.getOrders);
router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);

export const UserRoutes = router;
