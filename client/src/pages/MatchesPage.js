import React, { useState, useEffect } from "react";
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import {
    Select,
    Table,
    Row,
    Col,
    Divider,
    Switch,

} from 'antd'

import { getMatch, getPotentialMatch, getPeriodEvent } from '../fetcher'
import MenuBar from '../components/MenuBar';
import '../style/MatchesStyle.css';

const { Option } = Select;

const MatchesPage = () => {
    const potentialMatch = [
        {
            title: "Date",
            dataIndex: "GAME_DATE",
            key: "date",
            sort: (a, b) => a.date.localeCompare(b.date)
        },
        {
            title: "Home Team",
            dataIndex: "TEAM_HOME",
            key: "teamHome"
        },
        {
            title: "Away Team",
            dataIndex: "TEAM_AWAY",
            key: "teamAway"
        }
        // {
        //     title: "id",
        //     dataIndex: "GAME_ID",
        //     key: "id"
        // }
    ]
    const quaterHeader = [
        {
            title: "PCTimeString",
            dataIndex: "PCTIMESTRING",
            key: "PCTIMESTRING"
        },
        {
            title: "Event", 
            dataIndex: "EVENT_NAME",
            key: "EVENT_NAME"
        },
        {
            title: "Player",
            dataIndex:  "EVENT_TEAM_NICKNAME",
            key: "EVENT_TEAM_NICKNAME"
        },
        {
            title: "Score", 
            dataIndex: "SCORE",
            key: "SCORE"
        },
        {
            title: "Score Margin",
            dataIndex: "SCORE_MARGIN",
            key: "SCORE_MARGIN"
        }
    ]

    const [homeQuery, setTeamHome] = useState();
    const [awayQuery, setTeamAway] = useState();
    const [year, setYear] = useState();
    const [potentialMatches, setPotentialMatch] = useState();
    const [gameResult, setGameResult] = useState(null);
    const [gameId, setGameId] = useState();
    const [quaterOneResult, setQuaterOneResult] = useState(null);
    const [quaterTwoResult, setQuaterTwoResult] = useState(null);
    const [quaterThreeResult, setQuaterThreeResult] = useState(null);
    const [quaterFourResult, setQuaterFourResult] = useState(null);
;
    let changeTeamHome = (event) => {
        setTeamHome(event.target.value);
    }

    let changeTeamAway = (event) => {
        setTeamAway(event.target.value);
    }

    let changeYear = (event) => {
        setYear(event.target.value);
    }

    const updateSearchResults = () => {
        getPotentialMatch(homeQuery, awayQuery, year).then(
            (res) => {
                setPotentialMatch(res.results);
            }
        )
    }

    const goToMatch = (matchId) => {
        setGameId(matchId);
        getMatch(matchId).then(
            (res) => {
                setGameResult(res.results[0]);
            }
        )
        getPeriodEvent(matchId, "1").then(
            (res) => {
                setQuaterOneResult(res.results);
            }
        )
        getPeriodEvent(matchId, "2").then(
            (res) => {
                setQuaterTwoResult(res.results);
            }
        )
        getPeriodEvent(matchId, "3").then(
            (res) => {
                setQuaterThreeResult(res.results);
            }
        )
        getPeriodEvent(matchId, "4").then(
            (res) => {
                setQuaterFourResult(res.results);
            }
        )
    }

    const goToQuaters = (quater) => {
        switch (quater) {
            case "1": 
                getPeriodEvent(gameId,  "1").then(
                    (res) => {
                        setQuaterOneResult(res.results);
                        setQuaterTwoResult(null);
                        setQuaterThreeResult(null);
                        setQuaterFourResult(null);
                    }  
                )
                break;
            case "2":
                getPeriodEvent(gameId, "2").then(
                    (res) => {
                        setQuaterOneResult(null);
                        setQuaterTwoResult(res.results);
                        setQuaterThreeResult(null);
                        setQuaterFourResult(null);
                    }
                )
                break;
            case "3":
                getPeriodEvent(gameId, "3").then(
                    (res) => {
                        setQuaterOneResult(null);
                        setQuaterTwoResult(null);
                        setQuaterThreeResult(res.results);
                        setQuaterFourResult(null);
                    }
                )
                break;
            case "4":
                getPeriodEvent(gameId, "4").then(
                    (res) => {
                        setQuaterOneResult(null);
                        setQuaterTwoResult(null);
                        setQuaterThreeResult(null);
                        setQuaterFourResult(res.results);
                    }
                )
                break;
            default:
                getPeriodEvent(gameId, "1").then(
                    (res) => {
                        setQuaterOneResult(res.results);
                    }
                )
                getPeriodEvent(gameId, "2").then(
                    (res) => {
                        setQuaterTwoResult(res.results);
                    }
                )
                getPeriodEvent(gameId, "3").then(
                    (res) => {
                        setQuaterThreeResult(res.results);
                    }
                )
                getPeriodEvent(gameId, "4").then(
                    (res) => {
                        setQuaterFourResult(res.results);
                    }
                )
                break;
        } 
    }

    return (
    <div className="matchesPage">
        <MenuBar />
        <div className="row" style={{ marginLeft:'50px', marginRight: '50px' }}>
        
            <div className="column">
                <Form className="left-column-match" >
                    <Row>
                        <Col flex={1}>
                            <FormGroup style={{ width: '12vw' }}>
                                <label>Home Team</label>
                                <FormInput placeholder="Team Name" value={homeQuery} onChange={changeTeamHome} />
                            </FormGroup>
                        </Col>
                        <Col flex={1}>
                            <FormGroup style={{ width: '12vw' }}>
                                <label>Away Team</label>
                                <FormInput placeholder="Team Name" value={awayQuery} onChange={changeTeamAway} />
                            </FormGroup>
                        </Col>
                        <Col flex={1}>
                            <FormGroup style={{ width: '10vw' }}>
                                <label>Year</label>
                                <FormInput placeholder="Year" value={year} onChange={changeYear} />
                            </FormGroup>
                        </Col>
                        <Col flex={1}>
                            <FormGroup style={{ width: '6vw' }}>
                                <Button style={{ marginTop: '3.2vh' }} onClick={updateSearchResults}>Search</Button>
                            </FormGroup>
                        </Col>

                    </Row>
                </Form>
                <Divider />
                {potentialMatches ? 
                <Table className=""
                    style={{ width: '45vw', margin: '0 auto', marginTop: '2vh' }}
                    onRow={(record, rowIndex) => {
                        return {
                        onClick: event => {goToMatch(record.GAME_ID)}
                        };
                    }}
                    dataSource={potentialMatches}
                    columns={potentialMatch}
                    pagination={{
                    pageSizeOptions: [10],
                    defaultPageSize: 10,
                    showQuickJumper: true,
                    }}
                /> : null}
                <Divider />
                {gameResult ? 
                <div style={{ width: '45vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <CardTitle>{gameResult.TEAM_HOME}</CardTitle>
                                </Col>
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    {gameResult.WL_HOME} - {gameResult.WL_AWAY}
                                </Col>
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <CardTitle>{gameResult.TEAM_AWAY}</CardTitle>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h3>{gameResult.PTS_HOME}</h3>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Points
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h3>{gameResult.PTS_AWAY}</h3>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                <Progress value={gameResult.FGM_HOME * 100 / gameResult.FGA_HOME}>{gameResult.FGM_HOME} / {gameResult.FGA_HOME}</Progress>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Field Goals Accuracy
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <Progress value={gameResult.FGM_AWAY * 100/ gameResult.FGA_AWAY}>{gameResult.FGM_AWAY} / {gameResult.FGA_AWAY}</Progress>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                <Progress value={gameResult.FTM_HOME * 100 / gameResult.FTA_HOME}>{gameResult.FTM_HOME} / {gameResult.FTA_HOME}</Progress>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Free Throws Accuracy
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <Progress value={gameResult.FTM_AWAY * 100/ gameResult.FTA_AWAY}>{gameResult.FTM_AWAY} / {gameResult.FTA_AWAY}</Progress>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{gameResult.REB_HOME}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Rebounds
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{gameResult.REB_AWAY}</h5>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{gameResult.AST_HOME}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Assist
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{gameResult.AST_AWAY}</h5>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{gameResult.STL_HOME}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Steal
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{gameResult.STL_AWAY}</h5>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{gameResult.BLK_HOME}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Block
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{gameResult.BLK_AWAY}</h5>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col span={9} style={{ textAlign: 'left' }}>
                                    <h5>{gameResult.TOV_HOME}</h5>
                                </Col >
                                <Col span={6} style={{ textAlign: 'center' }}>
                                    Turnover
                                </Col >
                                <Col span={9} style={{ textAlign: 'right' }}>
                                    <h5>{gameResult.TOV_AWAY}</h5>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div> : null}
            </div>

            <div className="column">
                {gameResult ? 
                <div style={{ width: '45vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>
                        <div className="select-quater">
                                <Select defaultValue="all" style={{ width: 200 }} onChange={goToQuaters} >
                                    <Option value='all'>All Quaters</Option>
                                    <Option value='1'>First Quater</Option>
                                    <Option value='2'>Second Quater</Option>
                                    <Option value='3'>Third Quater</Option>
                                    <Option value='4'>Forth Quater</Option>
                                </Select> 
                        </div>
                        {quaterOneResult ? <Table 
                            style={{ width: '45vw', margin: '0 auto', marginTop: '2vh' }}
                            dataSource={quaterOneResult}
                            columns={quaterHeader}
                            pagination={false}
                        /> : null}
                        {quaterTwoResult ? <Table 
                            style={{ width: '45vw', margin: '0 auto', marginTop: '2vh' }}
                            dataSource={quaterTwoResult}
                            columns={quaterHeader}
                            pagination={false}
                        /> : null}
                        {quaterThreeResult ? <Table 
                            style={{ width: '45vw', margin: '0 auto', marginTop: '2vh' }}
                            dataSource={quaterThreeResult}
                            columns={quaterHeader}
                            pagination={false}
                        /> : null}
                        {quaterFourResult ? <Table 
                            style={{ width: '45vw', margin: '0 auto', marginTop: '2vh' }}
                            dataSource={quaterFourResult}
                            columns={quaterHeader}
                            pagination={false}
                        /> : null}
                        </CardBody>
                    </Card>
                </div> : null}
            </div>
        </div>
    </div>
)};

export default MatchesPage;