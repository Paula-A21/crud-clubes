const createClubHandler = async (req, res) => {
    try {

        res.render('create-club', {});

    } catch (error) {

        console.log(error);

    }

}

module.exports = {
    createClubHandler
};