// métodos: index, show, update, store, destroy
/*
index: listar sessões
store: Cria sessão
show: listar uma ÚNICA sessão
update: atualizar alguma sessão
destroy: deletar sessão
*/
import * as yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
