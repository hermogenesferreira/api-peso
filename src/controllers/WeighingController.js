import { Sequelize } from 'sequelize';
import Cow from '../models/Cow';
import Weighing from '../models/Weighing';
const conn = require('../database/index');
const conn2 = require('../database/index');


class WeighingController {
  async index(req, res) {
    try {
      const weighings = await   Weighing.findAll({
        include: Cow });
      return res.json(weighings);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const weighing = await conn.query(`SELECT cows.name, cows.birth, cows.gender, cows.status, AVG(weighings.value) AS media, weighings.cowId FROM cows INNER JOIN weighings WHERE cows.id AND weighings.cowId = ${id}`);
      res.status(200).json({ weighing });
    } catch (err) {
      return res.json(500).json(err);
    }
  }

  async showWidget(req, res) {
    try {
      const widget = await conn2.query(`SELECT (SELECT COUNT(cows.id) FROM cows) AS cows, (SELECT COUNT(weighings.id) FROM weighings) AS weighings, (SELECT AVG(weighings.value) FROM weighings) AS media`);
      res.status(200).json({ widget });
    } catch (err) {
      return res.json(500).json({message: "Internal server error"});
    }
  }

  async create(req, res) {
    try {
      const { value, date, cowId } = req.body;
      const weighing = {value, date, cowId};
      await Weighing.create(weighing);
      res.status(201).json({ message: `Weighing create sucess.`, weighing });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const weighing = await Weighing.findByPk(id);
      const { value, date, cowId } = req.body;
      if(weighing){
        await Weighing.update(
          {value, date, cowId},
          {where: {id: id }},
        );
        res.status(200).json({message: "Weighing sucessfully updated"});
      }
    } catch(err) {
      res.status(500).json({message: "internal server error."});
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Weighing.destroy({ where: { id: id } });
      return res.json({ message: `Weighing delete sucess.` });
    } catch (err) {
      return res.json(500).json({ message: 'Internal server error.' });
    }
  }
}

export default new WeighingController();