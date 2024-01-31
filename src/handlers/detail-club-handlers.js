const detailClubHandler = async (req, res) => {

    try {
        res.render('detail-club', { });
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    detailClubHandler
};