import Cow from '../models/Cow';
import Weighing from '../models/Weighing';
const { conn } = require('../database/index');
const { Op } = require('sequelize');

class CowController {
  async index(req, res) {
    try {
      const cows = await Cow.findAll();
      return res.json(cows);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async showMedia(req, res) {
    try {
      const { id } = req.params;
      const media = await Cow.findByPk(id, {
        include: [
          {
            model: Weighing, //including ratings array
            as: 'weighings',
            attributes: [], //but making it empty
          },
        ],
        attributes: {
          include: [ // this adds AVG attribute to others instead of rewriting
            [sequelize.fn('AVG', sequelize.col('wheighings.value')), 'avgRating'],
          ],
        },
      });
      return res.json(media);
    }catch (err) {
      return res.json(500).json(err);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const cow = await Cow.findByPk(id, {
        include: Weighing
      });
      return res.json(cow);
    } catch (err) {
      return res.json(500).json({ message: 'Internal server error.' });
    }
  }


  async create(req, res) {
    try {
      const { name, birth, gender, status } = req.body;
      const cow = await Cow.findOne({ where: { name: name } });
      if (cow) {
        return res.status(422).json({ message: 'Cow already exists!' });
      }
      const newCow = {name, birth, gender, status};
      await Cow.create(newCow);
      res.status(201).json({ message: `Cow create sucess.`, newCow });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const cow = await Cow.findByPk(id);
      const { name, birth, gender, status } = req.body;
      if(cow){
        await Cow.update(
          {name, birth, gender, status},
          {where: {id: id }},
        );
        res.status(200).json({message: "Cow sucessfully updated"});
      }
    } catch(err) {
      res.status(500).json({message: "internal server error."});
    }
  }


  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Cow.destroy({ where: { id: id } });
      return res.json({ message: `Cow delete sucess.` });
    } catch (err) {
      return res.json(500).json({ message: 'Internal server error.' });
    }
  }
}

export default new CowController();