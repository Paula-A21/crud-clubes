import sequelize from "../models/db.js";
import ClubsModel from "../models/Clubs.js";

const Clubs = ClubsModel(sequelize);

const clubsController = async (req, res) => {
  try {
    const clubs = await Clubs.findAll();
    const action = req.query.action;
    const { id_UUID } = req.params;

    if (!clubs || clubs.length === 0) {
      return res.status(404).json({ error: "No clubs were found in the database" });
    }

    const formattedClubs = clubs.map((club) => {
      const formattedClubName = club.club_name.toLowerCase().replace(/ /g, "_");
      const imagePath = `/images/crests/${formattedClubName}.png`;
      return {
        ...club.toJSON(), 
        imagePath
      };
    });

    switch (action) {
      case "view-all-clubs":
        return res.render("all-clubs", { clubs: formattedClubs });

      case "view-club":
        const club_detail = await Clubs.findByPk(id_UUID);
        if (!club_detail) {
          return res.status(404).json({ error: "The club was not found" });
        }

        const formattedDetailClubName = club_detail.club_name.toLowerCase().replace(/ /g, "_");
        const imagePathDetail = `/images/crests/${formattedDetailClubName}.png`;

        return res.render("detail-club", {
          club_detail,
          imagePathDetail,
        });

      case "update-club":

      // return res.render("update-club", { club_detail });

      case "delete-club":
        await Clubs.destroy({
          where: {
            id: id_UUID,
          },
        });
        return res.redirect("/clubs");

      default:
        const randomClubs = clubs.sort(() => 0.5 - Math.random()).slice(0, 3);
        return res.render("home", {
          clubs: randomClubs,
          deleteClubPartial: "delete-club",
        });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "An error has occurred" });
  }
};

export { clubsController };
