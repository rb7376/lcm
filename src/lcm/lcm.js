const pool = require("../../db");

exports.lcmRoutes = (app) => {
  //create a lcm
  app.post("/lcms", async (req, res) => {
    try {
      var { user_id, lcm_values } = req.body;

      const arr = lcm_values;
      var n = lcm_values.length;
      const lcm_result = LCM(arr, n);

      await pool.query(
        "INSERT INTO lcmcalc (user_id, values, result) VALUES ($1, $2, $3)",
        [user_id, lcm_values, lcm_result],
        (err, results) => {
          if (err) {
            res.json({
              status: false,
              error: err.message,
            });
          }
          res.status(200).json({
            status: true,
            data: lcm_result,
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
  //get a lcm
  app.get("/lcms/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query(
        "SELECT * FROM lcmcalc WHERE lcm_id = $1",
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
      // console.error(err.message);
      res.json({
        status: false,
        error: err.message,
      });
    }
  });
  //get all lcms
  app.get("/lcms", async (req, res) => {
    try {
      // const allTodos = await pool.query("SELECT * FROM todo");
      pool.query("SELECT * FROM lcmcalc", (err, results) => {
        if (err) {
          res.json({
            status: false,
            error: err.message,
          });
        }
        res.json({
          status: true,
          data: results.rows,
        }); // assumes 'results.rows' can be serialized to JSON
      });
      // res.json(allTodos.rows);
    } catch (err) {
      res.json({
        status: false,
        error: err.message,
      });
    }
  });
};

 LCM = (arr, n) => {
    // Find the maximum value in arr[]
    var max_num = 0;
    for (var i = 0; i < n; i++)
        if (max_num < arr[i])
            max_num = arr[i];
  
    // Initialize result
    var res = 1;
  
    // Find all factors that are present in
    // two or more array elements.
    var x = 2;  // Current factor.
    while (x <= max_num)
    {
        // To store indexes of all array
        // elements that are divisible by x.
        var indexes = [];
        for (var j = 0; j < n; j++)
            if (arr[j] % x == 0)
                indexes.push(j);
  
        // If there are 2 or more array elements
        // that are divisible by x.
        if (indexes.length >= 2)
        {
            // Reduce all array elements divisible
            // by x.
            for (var j = 0; j < indexes.length; j++)
                arr[indexes[j]] = arr[indexes[j]]/x;
  
            res = res * x;
        }
        else
            x++;
    }
  
    // Then multiply all reduced array elements
    for (var i = 0; i < n; i++)
        res = res*arr[i];
  
    return res;
  }