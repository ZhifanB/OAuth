import React, { useState, useEffect } from "react";
import styles from "../style/Players.module.css";

import { Table, Pagination, Divider, Row, Col, Input, Button } from "antd";

import MenuBar from "../components/MenuBar";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import legend from "../carousel-photos/legend.jpg";
import kobe from "../carousel-photos/kobee.png";
import legend2 from "../carousel-photos/legend2.jpeg";
import lakers from "../carousel-photos/lakers.png";
import michael from "../carousel-photos/michael.jpeg";
import jabar from "../carousel-photos/nba_jabbarhooks.jpeg";

import {
  getAllPlayers,
  getPlayer,
  getPlayerStats,
  getPlayerPerformanceLineChart,
  getPlayerTopEvents,
  getPlayerEventBySeason,
} from "../fetcher";
import { SearchOutlined } from "@ant-design/icons";

import PlayerCard from "../components/PlayerCard";

import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";

//the dataIndex in this column has to match player's property name.

const Players = () => {
  const playerColumns = [
    {
      title: "Name",
      dataIndex: "NAME",
      key: "name",

      sorter: (a, b) => a.NAME.localeCompare(b.NAME),
      // render: (text, row) => <a href={`/players?name=${row.NAME}`}>{text}</a>,
      // not sure if I should set the page to rerender if for clicking a player.
      render: (name) => (
        <a
          href
          onClick={() => {
            setSelectedPlayerName(name);
          }}
        >
          {name}
        </a>
      ),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <div style={{ display: "flex" }}>
              <Input
                autoFocus
                placeholder="Search Player"
                value={selectedKeys[0]}
                onChange={(event) => {
                  setSelectedKeys(
                    event.target.value ? [event.target.value] : []
                  );
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}
              ></Input>
              <Button
                onClick={() => {
                  clearFilters({ confirm: true });
                }}
                type="primary"
              >
                Reset
              </Button>
            </div>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },

      onFilter: (value, record) => {
        return record["NAME"]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Position",
      dataIndex: "POSITION",
      key: "position",
      sorter: (a, b) => a.POSITION.localeCompare(b.POSITION),
    },
    {
      title: "Height",
      dataIndex: "HEIGHT",
      key: "height",
      sorter: (a, b) => a.HEIGHT - b.HEIGHT,
    },
    {
      title: "Weight",
      dataIndex: "WEIGHT",
      key: "Weight",
      sorter: (a, b) => a.WEIGHT - b.WEIGHT,
    },
    {
      title: "Birth",
      dataIndex: "BIRTH_DATE",
      key: "BornYear",
      sorter: (a, b) => a.BIRTH_DATE.localeCompare(b.BIRTH_DATE),
    },
    {
      title: "College",
      dataIndex: "COLLEGE",
      key: "College",
      sorter: (a, b) => a.COLLEGE.localeCompare(b.COLLEGE),
    },
  ];

  const [players, setPlayers] = useState();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState("DeMar DeRozan");

  const [infoForPlayerChart, setSelectedPlayerChart] = useState([]);
  const [playerTopEventInfo, setPlayerPieChart] = useState([]);
  const [playerLineEvents, setPlayerLineChart] = useState(false);
  const [selectedPlayerStats, setSelectedPlayerStats] = useState({
    player: "DeMar DeRozan",
    Points: 21.22727,
    Assist: 4.14545,
    Rebounds: 4.47273,
    Steals: 1.01818,
    Turnovers: 2.01,
  });
  const [playerHasStat, setPlayerHasStat] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);

  const [comparePlayerList, setComparePlayerList] = useState([]);

  // const selectedPlayerName = window.location.search
  //   ? window.location.search.substring(1).split("=")[1]
  //   : "DeMar DeRozan";

  //why does getAllPlayers() doesn't have infinite loop which getPlayer does ? getAllPlayers does have infinite loop as well
  //I will check the difference between rerender and infinite loop
  useEffect(() => {
    getAllPlayers().then((res) => setPlayers(res.results));
  }, []);

  // useEffect to replace componentDidMount to handle side effects like sending HTTP request
  //why wouldn't it work if I put two separate useEffect for getPlayer and getPlayerStats
  useEffect(() => {
    getPlayer(selectedPlayerName).then((res) => {
      setSelectedPlayer(res.results[0]);
      // console.log(res.results[0]);
    });
    getPlayerStats(selectedPlayerName).then((res) => {
      if (res.results[0]) {
        setPlayerHasStat(true);
        setSelectedPlayerStats(res.results[0]);
      } else {
        setPlayerHasStat(false);
        setSelectedPlayerStats({
          player: "",
          Points: "N/A",
          Assist: "N/A",
          Rebounds: "N/A",
          Steals: "N/A",
          Turnovers: "N/A",
        });
      }
      // console.log(res.results[0]);
    });
    getPlayerPerformanceLineChart(selectedPlayerName).then((res) => {
      if (res.results && res.results.length > 0) {
        setSelectedPlayerChart(res.results);
      }
      // console.log(res.results);
    });
    getPlayerTopEvents(selectedPlayerName).then((res) => {
      if (res.results && res.results.length > 0) {
        setPlayerPieChart(res.results);
      } else {
        setShowPieChart(false);
      }
    });

    getPlayerEventBySeason(selectedPlayerName).then((res) => {
      if (res.results && res.results.length > 0) {
        setPlayerLineChart(res.results);
        console.log(res.results);
      } else {
        setShowLineChart(false);
      }
    });
  }, [selectedPlayerName]);

  const handleAddComparePlayers = () => {
    setComparePlayerList((prevArray) => [
      ...prevArray,
      {
        playerBasicInfo: selectedPlayer,
        playerBasicStats: selectedPlayerStats,
      },
    ]);
  };

  // const handleClickBarChart = () => {
  //   setShowBarChart((preState) => !preState);
  // };

  const handleClickBarChart = () => {
    if (showBarChart) {
      setShowBarChart(false);
    } else {
      setShowPieChart(false);
      setShowLineChart(false);
      setShowBarChart(true);
    }
  };

  const handleClickPieChart = () => {
    if (showPieChart) {
      setShowPieChart(false);
    } else {
      setShowBarChart(false);
      setShowLineChart(false);
      setShowPieChart(true);
    }
  };

  const handleClickLineChart = () => {
    if (showLineChart) {
      setShowLineChart(false);
    } else {
      setShowBarChart(false);
      setShowPieChart(false);
      setShowLineChart(true);
    }
  };

  const handleCardDelete = (indexToDelete) => {
    console.log(indexToDelete);
    console.log(comparePlayerList);

    setComparePlayerList(
      comparePlayerList.filter((element, index) => index !== indexToDelete)
    );

    //why doesn't this work ???
    // setComparePlayerList((preArray) => {
    //   preArray.filter((element, index) => index !== indexToDelete);
    // });

    // setComparePlayerList((preArray) => {
    //   preArray.splice(indexToDelete, 1);
    // });
  };

  return (
    <div className={styles.playersPage}>
      <MenuBar />

      {/* <div style={{ width: "70vw", margin: "0 auto", marginTop: "2vh" }}> */}
      <div>
        <div style={{ width: "70vw", margin: "0 auto", marginTop: "2vh" }}>
          {/* don't forget autoPlay */}
          <Carousel infiniteLoop autoPlay>
            <div className={styles.image}>
              <img src={legend} alt="legend0" />
            </div>
            <div className={styles.image}>
              <img src={kobe} alt="legend1" />
            </div>
            <div className={styles.image}>
              <img src={legend2} alt="legend2" />
            </div>
            <div className={styles.image}>
              <img src={michael} alt="legend3" />
            </div>
            <div className={styles.image}>
              <img src={jabar} alt="legend4" />
            </div>
            <div className={styles.image}>
              <img src={lakers} alt="legend5" />
            </div>
            <div className={styles.image}>
              <iframe
                width="530"
                height="600"
                src="https://www.youtube.com/embed/rBW1uZnZhbo"
                title="YouTube video player"
                // frameBorder="0"
                allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                // allowFullScreen
              ></iframe>
            </div>
          </Carousel>

          <Table
            dataSource={players}
            columns={playerColumns}
            pagination={{
              pageSizeOptions: [10],
              defaultPageSize: 10,
              showQuickJumper: true,
            }}
          />
        </div>
        <Divider />
        <div className={styles.section}>
          <div>
            {selectedPlayer && (
              <section className={styles.section}>
                <article>
                  <img
                    className={styles.img}
                    // src={process.env.PUBLIC_URL + "/photos/action_photos/201942.png"}
                    src={
                      process.env.PUBLIC_URL +
                      `/photos/action_photos/${selectedPlayer.PLAYER_ID}.png`
                    }
                    alt="pc"
                  />
                </article>
                <article>
                  <div>
                    <Row>
                      <Col span={8}>
                        <h2>{selectedPlayer.NAME}</h2>
                      </Col>
                      <Col span={8}>
                        {/* <Button type="primary">Favourite</Button> */}
                        <Button
                          className={styles.button}
                          type="primary"
                          onClick={handleAddComparePlayers}
                        >
                          Compare Players
                        </Button>
                        <Button
                          className={styles.button}
                          type="primary"
                          onClick={handleClickBarChart}
                        >
                          Player Chart By year
                        </Button>
                        <Button
                          className={styles.button}
                          type="primary"
                          onClick={handleClickPieChart}
                        >
                          Player Pie Chart
                        </Button>
                        <Button
                          className={styles.button}
                          type="primary"
                          onClick={handleClickLineChart}
                        >
                          Player Line Chart
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.div}>
                    <Row gutter={[8, 8]}>
                      <Col span={6}> Points</Col>
                      <Col span={6}> Rebound</Col>
                      <Col span={6}> Assist</Col>
                      <Col span={6}> Steal</Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={6}>
                        {playerHasStat
                          ? Number(selectedPlayerStats.Points).toFixed(2)
                          : selectedPlayerStats.Points}
                      </Col>
                      <Col span={6}>
                        {playerHasStat
                          ? Number(selectedPlayerStats.Rebounds).toFixed(2)
                          : selectedPlayerStats.Rebounds}
                      </Col>
                      <Col span={6}>
                        {playerHasStat
                          ? Number(selectedPlayerStats.Assist).toFixed(2)
                          : selectedPlayerStats.Assist}
                      </Col>
                      <Col span={6}>
                        {playerHasStat
                          ? Number(selectedPlayerStats.Steals).toFixed(2)
                          : selectedPlayerStats.Steals}
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.div}>
                    <Row>
                      <Col span={6}> Turnovers</Col>
                      <Col span={6}> Born Date</Col>
                      <Col span={6}> Born City</Col>
                      <Col span={6}> Born Country</Col>
                    </Row>
                    <Row>
                      <Col span={6}>
                        {playerHasStat
                          ? Number(selectedPlayerStats.Turnovers).toFixed(2)
                          : selectedPlayerStats.Turnovers}
                      </Col>
                      <Col span={6}> {selectedPlayer.BIRTH_DATE}</Col>
                      <Col span={6}> {selectedPlayer.BIRTH_STATE}</Col>
                      <Col span={6}> {selectedPlayer.BIRTH_COUNTRY}</Col>
                    </Row>
                  </div>
                </article>
              </section>
            )}
          </div>
          <div>
            {showBarChart && infoForPlayerChart.length > 0 && (
              <BarChart data={infoForPlayerChart} />
            )}
          </div>
          <div>
            {showPieChart && playerTopEventInfo.length > 0 && (
              <PieChart data={playerTopEventInfo} />
            )}
          </div>
          <div>
            {showLineChart && playerLineEvents.length > 0 && (
              <LineChart data={playerLineEvents} />
            )}
          </div>
        </div>

        <Divider />

        {comparePlayerList?.length > 0 && (
          <div className={styles.section}>
            {comparePlayerList.map((player, index) => {
              return (
                <PlayerCard
                  ind={index}
                  playerInfo={player.playerBasicInfo}
                  playerStat={player.playerBasicStats}
                  deleteCard={handleCardDelete}
                ></PlayerCard>
              );
            })}
          </div>
        )}

        <Divider />
      </div>
    </div>
  );
};

export default Players;
