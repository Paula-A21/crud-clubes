import sequelize from "../models/db.js";
import ClubsModel from "../models/Clubs.js";

class ClubController {
  constructor() {
    this.Clubs = ClubsModel(sequelize);
  }

  async getClubsHome(req, res) {
    try {
      const clubs = await this.Clubs.findAll();
      const action = req.query.action;

      if (!clubs || clubs.length === 0) {
        return res
          .status(404)
          .json({ error: "No clubs were found in the database" });
      }

      if (action) {
        const clubsDto = clubs.map((club) => {
          const club_name = club.club_name.toLowerCase().replace(/ /g, "");
          const imagePath = `/images/crests/${club_name}.png`;

          return {
            ...club.toJSON(),
            imagePath
          };
        });

        return res.render("all-clubs", { clubs: clubsDto });
      }

      const random_clubs = clubs.sort(() => 0.5 - Math.random()).slice(0, 3);

      return res.render("home", { random_clubs });

    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "An error has occurred" });
    }
  }

  async getClubDetail(req, res) {
    try {
      const { id } = req.params;

      const club = await this.Clubs.findOne({
        where: {
          id
        },
      });

      if (!club) {
        return res.status(404).json({ error: "The club was not found" });
      }

      const clubNameDto = club.club_name.toLowerCase().replace(/ /g, "");
      const image_path = `/images/crests/${clubNameDto}.png`;

      return res.render("detail-club", {
        club,
        image_path
      });

    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "An error has occurred" });
    }
  }

  async updateClub(req, res) {
    try {

      const { id } = req.params;
      const { club_name, club_adress, club_foundation_year } = req.body;
      if (!club_name && !club_adress && !club_foundation_year) return res.status(400).json({ error: 'Missing club data' });

      
      const update_club = {};

      if (club_name) {
        update_club.club_name = club_name;
      }
      if (club_adress) {
        update_club.club_adress = club_adress;
      }
      if (club_foundation_year) {
        update_club.club_foundation_year = club_foundation_year;
      }

      const [updatedClub] = await this.Clubs.update(update_club, {
        where: { id }
      });


      if (!updatedClub) return res.status(404).json({ error: 'Club not found' });

      const clubNameDto = club_name.toLowerCase().replace(/ /g, "");
      const imagePathDetail = `/images/crests/${clubNameDto}.png`;

      const club = await this.Clubs.findOne({
        where: {id}
      })

      return res.render("detail-club", {
        club,
        imagePathDetail
      });

    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "An error has occurred" });
    }
  }

  async deleteClub(req, res) {
    try {

      const { id } = req.params;

      const deletedClubCount = await this.Clubs.destroy({
        where: {
          id: id
        },
      });

      if (deletedClubCount > 0) {
        // Si deletedClubCount se guarda cuantos campos se eliminaron 
        return res.render("delete-club");
      } else {
        // No se encontró el club para eliminar
        return res
          .status(404)
          .json({ error: "Club not found or could not be deleted" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "An error has occurred" });
    }
  }

  async createClub(req, res) {
    try {
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "An error has occurred" });
    }
  }
}

export default ClubController;
