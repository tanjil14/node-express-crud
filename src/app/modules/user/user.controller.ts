import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    // const { user: userData } = req.body;
    console.log(req.body);
    const zodParsedData = userValidationSchema.parse(req.body);

    const result = await UserService.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User is created succesfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

export const UserControllers = { createUser };
