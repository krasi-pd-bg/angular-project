import Wine from "../models/Wine.js";

const wineService = {
    create(wineData, userId) {
        // Wine model
        return Wine.create({ ...wineData, owner: userId });
    },
    getAll(filter = {}) {
        const query = Wine.find().lean();
        if (filter.name) {
            query.find({ name: { $regex:filter.name, $options: 'i'}})
        }
        if (filter.type) {
            query.find({type: { $regex:filter.type, $options: 'i'}});  
        }
        return query;
    },
    getOne(wineId) {
        return Wine.findById(wineId);
    },
    vote(wineId, userId) {
        return Wine.findByIdAndUpdate(wineId, { $push: { likedList: userId } });
    },
    remove(wineId) {
        return Wine.findByIdAndDelete(wineId);
    },
    edit(wineId, wineData) {
        return Wine.findByIdAndUpdate(wineId, wineData, {runValidators: true});
    },
};

export default wineService;