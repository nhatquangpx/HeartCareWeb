const BenhNhanService = require('../services/BenhNhanService');

let getCreateBenhNhan = async (req, res) => {
    return res.render('benhnhan/createBenhNhan');
}

let createBenhNhan = async (req, res) => {
    await BenhNhanService.createBenhNhan(req.body);
    return res.redirect('/benhnhan');
}

let getAllBenhNhan = async (req, res) => {
    let data = await BenhNhanService.getAllBenhNhan();
    return res.render('benhnhan/getBenhNhan', { data: data });
}

let getEditBenhNhan = async (req, res) => {
    let benhNhanId = req.query.id;
    if (benhNhanId) {
        let data = await BenhNhanService.getBenhNhanById(benhNhanId);
        return res.render('benhnhan/editBenhNhan', { data: data });
    } else {
        return res.send('BenhNhan not found');
    }
}

let updateBenhNhan = async (req, res) => {
    let id = req.body.id;
    if (id) {
        await BenhNhanService.updateBenhNhanById(id, req.body);
        return res.redirect('/benhnhan');
    } else {
        return res.redirect('/404');
    }
}

let deleteBenhNhan = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await BenhNhanService.deleteBenhNhanById(id);
        return res.redirect('/benhnhan');
    } else {
        return res.redirect('/404');
    }
}

module.exports = {
    getCreateBenhNhan,
    createBenhNhan,
    getAllBenhNhan,
    getEditBenhNhan,
    updateBenhNhan,
    deleteBenhNhan
}
