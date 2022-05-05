import config from "./config.json";

// Player Page API calls

//Writing getAllPlayers and get player to test
const getAllPlayers = async () => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/players`
  );

  return res.json();
};

const getPlayer = async (name) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/player?name=${name}`
  );
  return res.json();
};

const getPlayerStats = async (name) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/player/stat?name=${name}`
  );
  return res.json();
};

const getPlayerInfo = async (name) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/player/info?id=${name}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getPlayerCostPerformance = async (id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/player/performance?id=${id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getPlayerCompare = async (player1, player2) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/player/compare?player1=${player1}&player2=${player2}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getPlayerEventBySeason = async (name) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/player/eventBySeason?name=${name}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getTopEventPlayers = async (name) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/player/topPlayers?name=${name}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getPlayerTopEvents = async (name) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/player/topEvents?name=${name}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getPlayerPerformanceStats = async (name) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/player/performanceStats?name=${name}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getPlayerPerformanceLineChart = async (name) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/player/performanceLineChart?name=${name}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

// Team Page API calls
const getTeam = async (name) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/team?name=${name}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getTeamInfo = async (id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/team/info?id=${id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getTeamStats = async (id, season) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/team/stats?id=${id}&Season=${season}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getTeamPerformance = async (id, season) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/team/performance?id=${id}&Season=${season}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getTeamRank = async (id, season) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/team/rank?id=${id}&Season=${season}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getMatchPlayer = async (field, rank, team, season) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/team/player?field=${field}&rank=${rank}&team=${team}&season=${season}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getTeamWLStatus = async (id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/team/status?id=${id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getPeriodEvent = async (id, period) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/match/periodEvents?id=${id}&period=${period}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getPotentialMatch = async (teamHome, teamAway, year) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/match?teamHome=${teamHome}&teamAway=${teamAway}&year=${year}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getMatch = async (id) => {
    var res = await fetch(
        `http://${config.server_host}:${config.server_port}/match/game?id=${id}`,
        {
          method: "GET",
        }
    );
    return res.json();
}

export {
  getPlayerInfo, // API
  getPlayerCostPerformance, // API
  getPlayerCompare, //API
  getPlayerEventBySeason, // API
  getTopEventPlayers, // API
  getPlayerTopEvents, // API
  getPlayerPerformanceStats, // API
  getPlayerPerformanceLineChart, // API
  getAllPlayers,
  getPlayer,
  getPlayerStats,
  getTeam, // API
  getTeamInfo, // API
  getTeamStats, // API
  getTeamPerformance, // API
  getTeamRank, // API
  getMatchPlayer, // API
  getTeamWLStatus, // API
  getPeriodEvent, // API
  getPotentialMatch,
  getMatch
};
