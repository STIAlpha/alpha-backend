// officerController.js
const Officer = require('./officer');

class OfficerController {
  async getOfficerById(req, res) {
    const id = req.params.id;
    const officer = await Officer.findById(id);
    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    return res.json(officer);
  }

  async updateOfficer(req, res) {
    const id = req.params.id;
    const {
      name,
      position,
      department,
      section,
      image,
      bio,
      githubLink,
      fbLink,
      email,
    } = req.body;
    const officer = await Officer.findByIdAndUpdate(id, {
      name,
      position,
      department,
      section,
      image,
      bio,
      githubLink,
      fbLink,
      email,
    });
    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    return res.json({ message: 'Officer updated successfully' });
  }

  async getOfficers(req, res) {
    const officers = await Officer.find();
    return res.json(officers);
  }

  async createOfficer(req, res) {
    const {
      name,
      position,
      department,
      section,
      image,
      bio,
      githubLink,
      fbLink,
      email,
    } = req.body;
    const officer = await Officer.create({
      name,
      position,
      department,
      section,
      image,
      bio,
      githubLink,
      fbLink,
      email,
    });
    return res.json({ message: 'Officer created successfully' });
  }

  async deleteOfficer(req, res) {
    const id = req.query.id;
    const officer = await Officer.findByIdAndDelete(id);
    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    return res.json({ message: 'Officer deleted successfully' });
  }
}

module.exports = OfficerController;