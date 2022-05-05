const express = require("express");
const mysql = require("mysql");
var cors = require("cors");

const routes = require("./routes");
const config = require("./config.json");

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

// player page api links
app.get("/players", routes.getAllPlayers);
app.get("/player", routes.player_info);
app.get("/player/stat", routes.player_stats);

app.get("/player/info", routes.player_info);
app.get("/player/performance", routes.player_cost_performance);
app.get("/player/compare", routes.compare_players);
app.get("/player/eventBySeason", routes.player_event_by_season);
app.get("/player/topPlayers", routes.top_event_players);
app.get("/player/topEvents", routes.player_top_events);
app.get("/player/performanceStats", routes.player_performance_stat);
app.get("/player/performanceLineChart", routes.player_performance_lineChart);

// team page api links
app.get("/team", routes.search_team);
app.get("/team/info", routes.team_info);
app.get("/team/stats", routes.team_stats);
app.get("/team/performance", routes.team_performance);
app.get("/team/rank", routes.team_rank);
app.get("/team/player", routes.match_player);
app.get("/team/status", routes.team_wl_status);

// match page api links
app.get("/match/periodEvents", routes.period_events);
app.get("/match", routes.get_potential_matches);
app.get("/match/game", routes.get_match);

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
