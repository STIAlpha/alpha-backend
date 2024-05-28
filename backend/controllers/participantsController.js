// controllers/participantsController.js
const Participants = require('../models/Participants');
const Valorant = require('../models/Valorant');
const Wildrift = require('../models/Wildrift');
const Tekken = require('../models/Tekken');
const MobileLegends = require('../models/MLBB');
const Chess = require('../models/Chess');
const AppDev = require('../models/Appdev');
const BeyondTheLens = require('../models/Beyond');
const LOLPc = require('../models/LOL');
const WebDev = require('../models/webdev');
const Chibby = require('../models/Chibby');
const Codm = require('../models/codm');


class ParticipantsController {

    static getParticipantCounts = async (req, res) => {
        try {
            const valorantCount = await Valorant.countDocuments();
            const wildriftCount = await Wildrift.countDocuments();
            const tekkenCount = await Tekken.countDocuments();
            const mlbbCount = await MobileLegends.countDocuments();
            const chessCount = await Chess.countDocuments();
            const appdevCount = await AppDev.countDocuments();
            const btlCount = await BeyondTheLens.countDocuments();
            const lolCount = await LOLPc.countDocuments();
            const webdevCount = await WebDev.countDocuments();
            const chibbyCount = await Chibby.countDocuments();
            const codmCount = await Codm.countDocuments();
    
            const categorizedParticipants = {
                valorant: valorantCount,
                wildrift: wildriftCount,
                tekken: tekkenCount,
                mobileLegends: mlbbCount,
                chess: chessCount,
                appdevelopment: appdevCount,
                beyondthelens: btlCount,
                lolpc: lolCount,
                webdevelopment: webdevCount,
                charactermaking: chibbyCount,
                callofduty: codmCount
            };
    
            res.json(categorizedParticipants);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

module.exports = ParticipantsController;
