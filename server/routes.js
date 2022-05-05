const config = require("./config.json");
const mysql = require("mysql");
const e = require("express");

// Connect information
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});

connection.connect();

// PLAYER SECTION
// Player Basic Information
async function getAllPlayers(req, res) {
  var myquery = `
        SELECT * 
        FROM player `;

  connection.query(myquery, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else if (results) {
      res.json({ results: results });
    }
  });
}

// my second query

async function player_info(req, res) {
  var playerName = req.query.name ? req.query.name : "";

  if (playerName) {
    var myquery = `
        SELECT * 
        FROM player 
        WHERE NAME = "${playerName}"`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

async function player_stats(req, res) {
  var name = req.query.name ? req.query.name : "";

  if (name) {
    var myquery = `
    SELECT player, AVG(PTS) as Points, AVG(AST) as Assist,  AVG(REB) as Rebounds,  AVG(STL) as Steals, AVG(TOV) as Turnovers
    FROM player_data
    WHERE Player like '%${name}%'
    GROUP BY Player`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

// Player Cost Performance Analysis
async function player_cost_performance(req, res) {
  var id = req.query.id ? req.query.id : "";

  if (id) {
    var myquery = `
        WITH Performance AS (
        SELECT player AS PLAYER_NAME, PL.PLAYER_ID AS ID, (PTS + REB + AST + STL + BLK - FGA + FG - FTA + FT - TOV) AS PERFORMANCE
        FROM player_data PD JOIN player PL ON PD.Player = PL.NAME
        ),  avg_salary AS (
        SELECT namePlayer AS NAME, AVG(value) AS VALUE
        FROM player_salary
        WHERE slugSeason = '2020-21'
        GROUP BY namePlayer
        )
        SELECT PF.ID, PF.PLAYER_NAME AS NAME, (PF.performance / ASA.VALUE ) AS EFFICIENCY
        FROM Performance PF JOIN avg_salary ASA ON PF.PLAYER_NAME = ASA.name
        WHERE PF.ID = ${id}`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

//This query is for player page. It compare two chosen players by efficiency score using PER in season2 data. The result will be used in a line chart

async function compare_players(req, res) {
  var player1 = req.query.player1 ? req.query.player1 : "LeBron James";
  var player2 = req.query.player2 ? req.query.player2 : "Kevin Durant";

  var myquery = `SELECT NAME, AGE, PER
        FROM season2
        WHERE NAME = ${player1} OR NAME = ${player2}`;
  connection.query(myquery, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else if (results) {
      res.json({ results: results });
    }
  });
}

//This query is for player page. It shows the frequencies by season for events "Jump shot", "3FT Jump Shot" and "Running Jump Shot" by a chosen player. This will be used for plotting a line chart

async function player_event_by_season(req, res) {
  var name = req.query.name ? req.query.name : "";
  if (name) {
    var myquery = `
    WITH PLAYER_EVENTS_SEASON AS (
      SELECT *
      FROM event
      WHERE EVENT_PLAYER = '${name}'
      ),
      tmp1 AS (
      SELECT SEASON, COUNT(*) AS jump_shot_count
      FROM PLAYER_EVENTS_SEASON
      GROUP BY EVENT_NAME, SEASON
      HAVING EVENT_NAME = "Jump Shot"),
      tmp2 AS (
      SELECT SEASON, COUNT(*) AS 3pt_jump_shot_count
      FROM PLAYER_EVENTS_SEASON
      GROUP BY EVENT_NAME, SEASON
      HAVING EVENT_NAME = "3PT Jump Shot"),
      tmp3 AS (
      SELECT SEASON, COUNT(*) AS running_jump_shot_count
      FROM PLAYER_EVENTS_SEASON
      GROUP BY EVENT_NAME, SEASON
      HAVING EVENT_NAME = "Running Jump Shot")
      SELECT t1.SEASON AS SEASON, t1.season, t1.jump_shot_count as jump_shot, t2.3pt_jump_shot_count AS 3pt_jump_shot, t3.season, running_jump_shot_count AS running_jump_shot
      FROM tmp1 t1 CROSS JOIN tmp2 t2 on t1.SEASON = t2.SEASON CROSS JOIN tmp3 t3 on t2.SEASON = t3.SEASON`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

//This query is for player page. It returns top 10 players for a chosen event

async function top_event_players(req, res) {
  var name = req.query.name ? req.query.name : "";
  if (name) {
    var myquery = `
        SELECT EVENT_PLAYER, COUNT(*) AS FREQ_BY_PLAYER
        FROM event
        WHERE EVENT_NAME = '${name}'
        GROUP BY EVENT_PLAYER
        ORDER BY FREQ_BY_PLAYER DESC
        LIMIT 10`;
    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

// This query is for player page. It shows the top 10 events of a chosen player

async function player_top_events(req, res) {
  var name = req.query.name ? req.query.name : "";
  if (name) {
    var myquery = `
        WITH PLAYER_EVENTS AS (
        SELECT *
        FROM event
        WHERE EVENT_PLAYER = '${name}'
        )
        SELECT EVENT_NAME, COUNT(*) AS FREQ_BY_EVENT
        FROM PLAYER_EVENTS
        GROUP BY EVENT_NAME
        ORDER BY FREQ_BY_EVENT DESC
        LIMIT 10`;
    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

//This query is for player page. It calculates count, mean, standard deviation, lower 95% confidence intervals and upper confidence interval limits
//for the records from multiple years by players for performance factor such as PTS or AST
async function player_performance_stat(req, res) {
  var name = req.query.name ? req.query.name : "";
  if (name) {
    var myquery = `
        SELECT NAME, COUNT(*) AS N, ROUND(AVG(PTS),1) AS AVG_PTS, ROUND(AVG(PTS)-1.96*STDDEV_SAMP(PTS), 1) AS PTS_LOWER, ROUND(AVG(PTS)+1.96*STDDEV_SAMP(PTS), 1) AS PTS_UPPER,
        ROUND(AVG(AST),1) AS AVG_AST, ROUND(AVG(AST)-1.96*STDDEV_SAMP(AST), 1) AS AST_LOWER, ROUND(AVG(AST)+1.96*STDDEV_SAMP(AST), 1) AS AST_UPPER,
        ROUND(AVG(FGA),1) AS AVG_FGA, ROUND(AVG(FGA)-1.96*STDDEV_SAMP(FGA), 1) AS FGA_LOWER, ROUND(AVG(FGA)+1.96*STDDEV_SAMP(FGA), 1) AS FGA_UPPER,
        ROUND(AVG(FTA),1) AS AVG_FTA, ROUND(AVG(FTA)-1.96*STDDEV_SAMP(FTA), 1) AS FTA_LOWER, ROUND(AVG(FTA)+1.96*STDDEV_SAMP(FTA), 1) AS FTA_UPPER,
        ROUND(AVG(STL),1) AS AVG_STL, ROUND(AVG(STL)-1.96*STDDEV_SAMP(STL), 1) AS STL_LOWER, ROUND(AVG(STL)+1.96*STDDEV_SAMP(STL), 1) AS STL_UPPER,
        ROUND(AVG(TOV),1) AS AVG_TOV, ROUND(AVG(TOV)-1.96*STDDEV_SAMP(TOV), 1) AS STL_LOWER, ROUND(AVG(TOV)+1.96*STDDEV_SAMP(TOV), 1) AS TOV_UPPER
        FROM season2
        GROUP BY '${name}'`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

//This query is for player page. It extracts REB, AST, PTS, STL, TOV from season2 data for a chosen player which then will be used to plot a line chart

async function player_performance_lineChart(req, res) {
  var name = req.query.name ? req.query.name : "";
  if (name) {
    var myquery = `
    SELECT NAME, YEAR, PTS, AST, TRB,  STL, TOV,FGA, FTA
        FROM season2
        WHERE NAME = '${name}'`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

// TEAM SECTION

async function search_team(req, res) {
  var name = req.query.name ? req.query.name : "";

  if (name) {
    var myquery = `SELECT ID FROM team WHERE FULL_NAME Like '%${name}%'`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

async function team_info(req, res) {
  var id = req.query.id ? req.query.id : "";

  if (id) {
    var myquery = `SELECT FULL_NAME, ABBREVIATION, CITY, STATE, YEAR_FOUNDED, ARENA, HEADCOACH AS COACH, OWNER, GENERALMANAGER, LOGO FROM team WHERE ID=${id}`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

async function team_stats(req, res) {
  var id = req.query.id ? req.query.id : "";
  var season = req.query.Season ? req.query.Season : "22020";

  if (id) {
    var myquery = `WITH HOME_Game AS (
            SELECT (FGM_HOME/FGA_HOME)*100 AS FG_PC_HOME, (FTM_HOME/FTA_HOME)*100 AS FT_PC_HOME, REB_HOME, AST_HOME, STL_HOME, BLK_HOME, TOV_HOME
            FROM game
            WHERE TEAM_ID_HOME=${id} AND SEASON_ID=${season}
        ),
        AWAY_Game AS (
            SELECT (FGM_AWAY/FGA_AWAY)*100 AS FG_PC_AWAY, (FTM_AWAY/FTA_AWAY)*100 AS FT_PC_AWAY, REB_AWAY, AST_AWAY, STL_AWAY, BLK_AWAY, TOV_AWAY
            FROM game
            WHERE TEAM_ID_AWAY=${id} AND SEASON_ID=${season}
        )
        SELECT ROUND(AVG(FG_PC_HOME), 2)as FG_PC_HOME, ROUND(AVG(FT_PC_HOME), 2) as FT_PC_HOME, ROUND(AVG(REB_HOME), 2) as REB_HOME, ROUND(AVG(AST_HOME), 2) as AST_HOME,
               ROUND(AVG(STL_HOME), 2) as STL_HOME, ROUND(AVG(BLK_HOME), 2) as BLK_HOME, ROUND(AVG(TOV_HOME), 2) as TOV_HOME,
               ROUND(AVG(FG_PC_AWAY), 2) as FG_PC_AWAY, ROUND(AVG(FT_PC_AWAY), 2) as FT_PC_AWAY, ROUND(AVG(REB_AWAY), 2) as REB_AWAY, ROUND(AVG(AST_AWAY), 2) as AST_AWAY,
               ROUND(AVG(STL_AWAY), 2) as STL_AWAY, ROUND(AVG(BLK_AWAY), 2) as BLK_AWAY, ROUND(AVG(TOV_AWAY), 2) as TOV_AWAY
        FROM HOME_Game, AWAY_Game;`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

async function team_performance(req, res) {
  var id = req.query.id ? req.query.id : "";
  var season = req.query.Season ? req.query.Season : "22020";

  if (id) {
    var myquery = `WITH FGHomePer AS (
            SELECT TEAM_ID_HOME AS TEAM_ID, TEAM_AB_HOME AS TEAM_AB, TEAM_HOME AS TEAM, AVG(FGM_HOME/FGA_HOME) as FGHome, AVG(FTM_HOME/game.FTA_HOME) as FTHome, AVG(REB_HOME) as REB_Home,
                   AVG(AST_HOME) as AST_Home, AVG(STL_HOME) as STL_Home, AVG(BLK_HOME) as BLK_Home, AVG(TOV_HOME) as TOV_Home
            FROM game
            WHERE SEASON_ID = ${season}
            GROUP BY TEAM_AB
         ),
         FGAwayPer AS (
             SELECT TEAM_AB_AWAY AS TEAM_AB, TEAM_AWAY AS TEAM, AVG(FGM_AWAY/FGA_AWAY) as FGAway, AVG(FTM_AWAY/game.FTA_AWAY) as FTAway, AVG(REB_AWAY) as REB_Away, AVG(AST_AWAY) as AST_Away,
                   AVG(STL_AWAY) as STL_Away, AVG(BLK_AWAY) as BLK_Away, AVG(TOV_AWAY) as TOV_Away
            FROM game
            WHERE SEASON_ID = ${season}
            GROUP BY TEAM_AB
         ),
         FGHomePerformance AS (
            SELECT TEAM_ID, TEAM_AB, TEAM, RANK() over (ORDER BY FGHome DESC) FGHomeRank, RANK() over (ORDER BY FTHome DESC) FTHomeRank, RANK() over (ORDER BY REB_Home DESC) REBHomeRank,
                   RANK() over (ORDER BY AST_Home DESC) ASTHomeRank, RANK() over (ORDER BY STL_Home DESC) STLHomeRank, RANK() over (ORDER BY BLK_Home DESC) BLKHomeRank, RANK() over (ORDER BY TOV_Home DESC) TOVHomeRank
            FROM FGHomePer
         ),
         FGAwayPerformance AS (
             SELECT TEAM_AB, TEAM, RANK() over (ORDER BY FGAway DESC) FGAwayRank, RANK() over (ORDER BY FTAway DESC) FTAwayRank, RANK() over (ORDER BY REB_Away DESC) REBAwayRank,
                    RANK() over (ORDER BY AST_Away DESC) ASTAwayRank, RANK() over (ORDER BY STL_Away DESC) STLAwayRank, RANK() over (ORDER BY BLK_Away DESC) BLKAwayRank, RANK() over (ORDER BY TOV_Away DESC) TOVAwayRank
             FROM FGAwayPer
         )
         SELECT H.TEAM_AB, H.TEAM, FGHomeRank, FTHomeRank, REBHomeRank, ASTHomeRank, STLHomeRank, BLKHomeRank, TOVHomeRank, FGAwayRank, FTAwayRank, REBAwayRank, ASTAwayRank, STLAwayRank, BLKAwayRank, TOVAwayRank
         FROM FGHomePerformance H JOIN FGAwayPerformance A ON H.TEAM_AB=A.TEAM_AB
         WHERE TEAM_ID=${id};`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

async function team_rank(req, res) {
  var id = req.query.id ? req.query.id : "";
  var season = req.query.Season ? req.query.Season : "22020";

  if (id) {
    var myquery = `WITH FGHomePer AS (
            SELECT TEAM_ID_HOME AS TEAM_ID, TEAM_AB_HOME AS TEAM_AB, TEAM_HOME AS TEAM, AVG(FGM_HOME/FGA_HOME) as FGHome, AVG(FTM_HOME/game.FTA_HOME) as FTHome, AVG(REB_HOME) as REB_Home,
                    AVG(AST_HOME) as AST_Home, AVG(STL_HOME) as STL_Home, AVG(BLK_HOME) as BLK_Home, AVG(TOV_HOME) as TOV_Home
            FROM game
            WHERE SEASON_ID = ${season}
            GROUP BY TEAM_AB
            ),
            FGAwayPer AS (
                SELECT TEAM_AB_AWAY AS TEAM_AB, TEAM_AWAY AS TEAM, AVG(FGM_AWAY/FGA_AWAY) as FGAway, AVG(FTM_AWAY/game.FTA_AWAY) as FTAway, AVG(REB_AWAY) as REB_Away, AVG(AST_AWAY) as AST_Away,
                    AVG(STL_AWAY) as STL_Away, AVG(BLK_AWAY) as BLK_Away, AVG(TOV_AWAY) as TOV_Away
            FROM game
            WHERE SEASON_ID = ${season}
            GROUP BY TEAM_AB
            ),
            FGHomePerformance AS (
            SELECT TEAM_ID, TEAM_AB, TEAM, RANK() over (ORDER BY FGHome) FGHomeRank, RANK() over (ORDER BY FTHome) FTHomeRank, RANK() over (ORDER BY REB_Home) REBHomeRank,
                    RANK() over (ORDER BY AST_Home) ASTHomeRank, RANK() over (ORDER BY STL_Home) STLHomeRank, RANK() over (ORDER BY BLK_Home) BLKHomeRank, RANK() over (ORDER BY TOV_Home DESC) TOVHomeRank
            FROM FGHomePer
            ),
            FGAwayPerformance AS (
                SELECT TEAM_AB, TEAM, RANK() over (ORDER BY FGAway) FGAwayRank, RANK() over (ORDER BY FTAway) FTAwayRank, RANK() over (ORDER BY REB_Away) REBAwayRank,
                    RANK() over (ORDER BY AST_Away) ASTAwayRank, RANK() over (ORDER BY STL_Away) STLAwayRank, RANK() over (ORDER BY BLK_Away) BLKAwayRank, RANK() over (ORDER BY TOV_Away DESC) TOVAwayRank
                FROM FGAwayPer
            ),
            TeamCount AS (
                SELECT COUNT(DISTINCT TEAM_AB_HOME) AS Count
                FROM game
                WHERE SEASON_ID = ${season}
            )
            SELECT ROUND((FGHomeRank/Count+FGAwayRank/Count)/2*100, 0) as FG, ROUND((FTHomeRank/Count+FTAwayRank/Count)/2*100, 0) as FT,
                ROUND((REBHomeRank/Count+REBAwayRank/Count)/2*100, 0) as REB,  ROUND((ASTHomeRank/Count+ASTAwayRank/Count)/2*100, 0) as AST,
                ROUND((STLHomeRank/Count+STLAwayRank/Count)/2*100, 0) as STL, ROUND((BLKHomeRank/Count+BLKAwayRank/Count)/2*100, 0) as BLK,
                ROUND((TOVHomeRank/Count+TOVAwayRank/Count)/2*100, 0) as TOV
            FROM FGHomePerformance H JOIN FGAwayPerformance A ON H.TEAM_AB=A.TEAM_AB, TeamCount
            WHERE TEAM_ID=${id};`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

//This query is for team page. It finds total number of wins and loses for a chosen team. The result will be used to plot a line chart by season

async function team_wl_status(req, res) {
  var id = req.query.id ? req.query.id : "";

  if (id) {
    var myquery = `
      WITH HOMEWIN AS (
      SELECT SEASON_ID, TEAM_ID_HOME AS TEAM, COUNT(*) AS HOME_WIN
      FROM game
      WHERE WL_HOME = 'W'
      GROUP BY SEASON_ID, TEAM_ID_HOME
      ),
      AWAYWIN AS (
      SELECT SEASON_ID, TEAM_ID_AWAY AS TEAM, COUNT(*) AS AWAY_WIN
      FROM game
      WHERE WL_AWAY = 'W'
      GROUP BY SEASON_ID, TEAM_ID_AWAY
      ),
      HOMELOSE AS (
      SELECT SEASON_ID, TEAM_ID_HOME AS TEAM, COUNT(*) AS HOME_LOSE
      FROM game
      WHERE WL_HOME = 'L'
      GROUP BY SEASON_ID, TEAM_ID_HOME
      ),
      AWAYLOSE AS (
      SELECT SEASON_ID, TEAM_ID_AWAY AS TEAM, COUNT(*) AS AWAY_LOSE
      FROM game
      WHERE WL_AWAY = 'L'
      GROUP BY SEASON_ID, TEAM_ID_AWAY
      )
      SELECT SEASON_ID, HOME_WIN, AWAY_WIN, HOME_LOSE, AWAY_LOSE
      FROM HOMEWIN NATURAL JOIN AWAYWIN NATURAL JOIN HOMELOSE NATURAL JOIN AWAYLOSE
      WHERE TEAM = ${id}`;

    connection.query(myquery, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    });
  }
}

// Match Section
async function match_player(req, res) {
  var field = req.query.field ? req.query.field : "FG";
  var rank = req.query.rank ? req.query.rank : "50";
  var team = req.query.team ? req.query.team : "LAL";
  var season = req.query.season ? req.query.season : "22020";

  var myquery = `WITH Players AS (
        SELECT DISTINCT Player, RANK() over (ORDER BY ${field}) fieldRank
        FROM player_data
        WHERE Season=${season} AND Team_AB<>'${team}'
    ),
    Count AS (
        SELECT COUNT(Player) AS count
        FROM player_data
        WHERE Season=${season} AND Team_AB<>'${team}'
    ),
    PlayersRank AS (
        SELECT Player, (fieldRank/count)*100 as PlayerPer
        FROM Players P, Count C
    )
    SELECT Player, PlayerPer
    FROM PlayersRank
    WHERE PlayerPer > (${rank}+40)
    LIMIT 3;`;

  connection.query(myquery, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else if (results) {
      res.json({ results: results });
    }
  });
}

//This query is for game page. The query lists information and scores for a chosen period of a chosen event

async function period_events(req, res) {
  var id = req.query.id ? req.query.id : "21100851";
  var period = req.query.period ? req.query.period : "1";
  var myquery = `
    SELECT GAME_PERIOD, PCTIMESTRING, EVENT_NAME, EVENT_TEAM_NICKNAME, SCORE, SCORE_MARGIN
    FROM event
    WHERE GAME_ID = ${id} AND GAME_PERIOD = ${period}
    ORDER BY GAME_PERIOD, PCTIMESTRING`;

  connection.query(myquery, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else if (results) {
      res.json({ results: results });
    }
  });
}

async function get_potential_matches(req, res) {
  var teamHome = req.query.teamHome ? req.query.teamHome : "";
  var teamAway = req.query.teamAway ? req.query.teamAway : "";
  var year = req.query.year ? req.query.year : "2021";
  var myquery = `
    SELECT TEAM_HOME, TEAM_AWAY, GAME_DATE, GAME_ID 
    FROM game
    WHERE TEAM_HOME LIKE '%${teamHome}%' AND TEAM_AWAY LIKE '%${teamAway}%' AND GAME_DATE LIKE '${year}%'`;

  connection.query(myquery, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else if (results) {
      res.json({ results: results });
    }
  });
}

async function get_match(req, res) {
  var matchId = req.query.id ? req.query.id : "";
  var myquery = `
    SELECT GAME_DATE, TEAM_HOME, TEAM_AB_HOME, WL_HOME, FGM_HOME, FGA_HOME, FTM_HOME, FTA_HOME, REB_HOME, AST_HOME, 
    STL_HOME, BLK_HOME, TOV_HOME, PTS_HOME, TEAM_AWAY, TEAM_AB_AWAY, WL_AWAY, FGM_AWAY, FGA_AWAY, FTM_AWAY, FTA_AWAY, 
    REB_AWAY, AST_AWAY, STL_AWAY, BLK_AWAY, TOV_AWAY, PTS_AWAY
    FROM game
    WHERE GAME_ID = ${matchId}`;

  connection.query(myquery, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else if (results) {
      res.json({ results: results });
    }
  });
}

module.exports = {
  getAllPlayers,
  player_info,
  player_stats,
  player_info,
  player_cost_performance,
  compare_players,
  player_event_by_season,
  top_event_players,
  player_top_events,
  player_performance_stat,
  player_performance_lineChart,
  search_team,
  team_info,
  team_stats,
  team_performance,
  team_rank,
  match_player,
  team_wl_status,
  period_events,
  get_potential_matches,
  get_match,
};
