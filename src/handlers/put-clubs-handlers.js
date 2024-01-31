const updateClubHandler = async (req, res) => {

    try {

        res.render('edit-club', { });

    } catch (error) {

        console.log(error);

    }

}

module.exports = {
    updateClubHandler
};