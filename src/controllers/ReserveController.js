import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';

class ReserveController {
  async index(req, res) {
    const { user_id } = req.headers;

    const reserves = await Reserve.find({ user: user_id }).populate('house');

    res.json(reserves);
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);
    if (!house) {
      res.status(400).json({ error: 'Essa casa não existe.' });
    }

    if (house.status !== true) {
      res.status(400).json({ error: 'Essa casa não está disponível.' });
    }

    const user = await User.findById(user_id);
    if (String(user._id) === String(house.user)) {
      res.status(401).json({ error: 'Reserva não permitida.' });
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });

    await reserve.populate('house').populate('user').execPopulate();

    return res.json(reserve);
  }

  async destroy(req, res) {
    const { reserve_id } = req.body;

    await Reserve.findByIdAndDelete({ _id: reserve_id });

    res.send();
  }
}

export default new ReserveController();
