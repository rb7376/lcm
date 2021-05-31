const pool = require("../../db");

exports.userRoutes = (app) => {
  //create a user
  app.post("/users", async (req, res) => {
    try {
      const { username,emailaddress,Phone,password } = req.body;

      await pool.query(
        "INSERT INTO users (username,emailaddress,Phone,password) VALUES ($1, $2, $3, $4) RETURNING user_id",
        [username,emailaddress,Phone,password],
        (err, results) => {
            console.log('insertedid',results);
          if (err) {
            res.json({
              status: false,
              error: err.message,
            });
          }
        const id=results.rows[0]['user_id'];
          pool.query("SELECT * FROM users where user_id=$1",[id], (err, results) => {
            if (err) {
              res.json({
                status: false,
                error: err.message,
              });
            }
            res.json({
              status: true,
              data: results.rows,
            });
          });
        }
      );
    } catch (err) {
      res.json({
        status: false,
        error: err.message,
      });
    }
  });
  //get a user
  app.get("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id],
        (err, results) => {
          if (err) {
            res.json({
              status: false,
              error: err.message,
            });
          }
          res.json({
            status: true,
            data: results.rows,
          });
        }
      );
    } catch (err) {
      res.json({
        status: false,
        error: err.message,
      });
    }
  });
  //get all users
  app.get("/users", async (req, res) => {
    try {
      pool.query("SELECT * FROM users", (err, results) => {
        if (err) {
          res.json({
            status: false,
            error: err.message,
          });
        }
        res.json({
          status: true,
          data: results.rows,
        }); 
      });
    } catch (err) {
      res.json({
        status: false,
        error: err.message,
      });
    }
  });
};
