import Task from '../models/task';
import * as Yup from 'yup';

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      task: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failure' });
    }

    const { task } = req.body;

    const tasks = await Task.create({
      user_id: req.userId,
      task,
    });

    return res.json({
      id: tasks.id,
      task: tasks.task,
      check: tasks.check,
    });
  }

  async index(req, res) {
    const tasks = await Task.findAll({
      where: { user_id: req.userId }, //where check: false - Para trazer apenas as que não foram dadas 'check'
    });

    return res.json(
      tasks.map((task) => {
        return {
          id: task.id,
          task: task.task,
          check: task.check,
        };
      })
    );
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      check: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failure' });
    }

    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'task not found' });
    }

    if (task.user_id !== req.userId) {
      return res.status(401).json({ error: 'not allowed request' });
    }

    await task.update(req.body);

    return res.json({
      id: task.id,
      task: task.task,
      check: task.check,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'task not found' });
    }

    if (task.user_id !== req.userId) {
      return res.status(401).json({ error: 'not allowed request' });
    }

    await task.destroy();

    return res.send();
  }
}

export default new TaskController();
