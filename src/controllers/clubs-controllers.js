import sequelize from "../models/db.js";
import ClubsModel from "../models/Clubs.js";

const Clubs = ClubsModel(sequelize);

const crudClubs = async (req, res) => {
  try {
    const clubs = await Clubs.findAll();
    const action = req.query.action;
    const { id_UUID } = req.params;

    if (!clubs || clubs.length === 0) {
      return res.status(404).json({ error: "No clubs were found in the database" });
    }

    const formatted_clubs = clubs.map((club) => {

      const formatted_clubs_name = club.club_name.toLowerCase().replace(/ /g, "");
      const imagePath = `/images/crests/${formatted_clubs_name}.png`;
      
      return {
        ...club.toJSON(), 
        imagePath
      };
    });

    switch (action) {
      case "view-all-clubs":

        return res.render("all-clubs", { clubs: formatted_clubs });

      case "view-club":

        const club_detail = await Clubs.findByPk(id_UUID);

        if (!club_detail) {
          return res.status(404).json({ error: "The club was not found" });
        }
        
        const formattedDetailClubName = club_detail.club_name.toLowerCase().replace(/ /g, "");
        const imagePathDetail = `/images/crests/${formattedDetailClubName}.png`;
        

        return res.render("detail-club", {
          club_detail,
          imagePathDetail,
        });

        case "update-club":

        // return res.render("update-club", { club_detail });
  
        case "delete-club":
  
          const deleted_club_count = await Clubs.destroy({
            where: {
              id: id_UUID
            },
          });
  
          if (deleted_club_count > 0) {
            // El club se eliminó correctamente
  
            return res.render("delete-club", {});
  
          } else {
            // No se encontró el club para eliminar
            return res.status(404).json({ error: "Club not found or could not be deleted" });
          }
  
  
        default:
  
          const random_clubs = clubs.sort(() => 0.5 - Math.random()).slice(0, 3);
  
          return res.render("home", {
            clubs: random_clubs,
            deleteClubPartial: "delete-club"
          });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "An error has occurred" });
    }
  };
  
  export { crudClubs };