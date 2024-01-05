import {Router, Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import {ITask} from '../../models/mongoose/Task';
import TaskModel from '../../models/mongoose/TaskModel'
const router = Router();

const taskValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('completed').isBoolean().withMessage('Completed must be a boolean'),
];

// Add your CRUD API implementation here

router.get('/', async (req: Request, res: Response) => {
  const tasks: ITask[] = await TaskModel.find();
  res.json(tasks);
});

router.get('/:id', async (req: Request, res: Response) => {
  const task: ITask | null = await TaskModel.findOne({_id: req.params.id as string});
  if (!task) {
    res.status(404).send('Task not found');
  } else {
    res.json(task);
  }
});

router.post('/', taskValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const task = new TaskModel({
    title: req.body.title,
    description: req.body.description,
    completed: false,
  });
  await task.save();
  res.status(201).json(task);
});

router.put('/:id', taskValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const filter = { id: req.params.id };
  const update = req.body;

  const task = await TaskModel.findOneAndUpdate(filter, update, {
    new: true
  });

  if (!task) {
    res.status(404).send('Task not found');
  } else {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed || task.completed;

    res.json(task);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const result: any = await TaskModel.deleteOne({ _id: req.params.id});
  console.log(result)
  if (result.deletedCount === 0) {
    res.status(404).send({ status: true, message: 'Task not found'});
  } else {
    res.status(204).send({ status: true, message: 'Delted.'});
  }
});

export default router;