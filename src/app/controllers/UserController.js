import User from '../models/user';
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failure' });
    }
    console.log(process.env.DB_USER);
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'email already exists.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      email,
      name,
    });
  }

  async get(req, res){
    const foundUser = await User.findByPk(req.userId);
    if(!foundUser){
      return res.status(404).json({ error: 'User not Found!' });
    }
    return res.json({
      user: foundUser
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failure' });
    }

    const { oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'wrong password.' });
    }

    const { id, name } = await user.update(req.body);
    return res.json({ id, name });
  }
}

export default new UserController();
