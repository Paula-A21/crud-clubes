const deleteClubHandler = async (req, res) => {

    try {
        res.render('delete-club', { });
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    deleteClubHandler
};