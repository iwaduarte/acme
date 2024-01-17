const SearchHistory = (sequelize, DataTypes) => {
  return sequelize.define("SearchHistory", {
    searchTerm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });
};

export default SearchHistory;
