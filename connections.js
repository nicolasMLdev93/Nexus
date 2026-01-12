const { Sequelize } = require("sequelize");

const connection_test = async () => {
  const sequelize = new Sequelize(
    "br2afwqs9ubfq4s0uulu",
    "ujtweksqzwsgk10h",
    "K5S5DxNNlmIRdB6Lv2eV",
    {
      host: "br2afwqs9ubfq4s0uulu-mysql.services.clever-cloud.com",
      dialect: "mysql",
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connection_test();
