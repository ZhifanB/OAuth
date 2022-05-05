import React from 'react';
import { Navbar,Nav, NavItem, NavLink, Card, CardBody } from "shards-react";
import {
    Select,
    Divider,
} from 'antd';
import { getTeamInfo, getTeamStats, getTeamPerformance, getTeamRank, getMatchPlayer, getTeamWLStatus } from '../fetcher'
import '../style/TeamStyle.css';
import TeamChart from '../components/TeamChart';

const { Option } = Select;


class TeamPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            season: '',
            selectedTeamId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedTeamDetails: {FULL_NAME:'', ABBREVIATION: '', CITY: '', STATE: '', YEAR_FOUNDED: '', ARENA: '', COACH: '', OWNER: '', GENERALMANAGER: '', LOGO: ''},
            teamStats: {FG_PC_HOME:'', FT_PC_HOME: '', REB_HOME: '', AST_HOME: '', STL_HOME: '', BLK_HOME: '', TOV_HOME: '', FG_PC_AWAY: '', FT_PC_AWAY: '', 
            REB_AWAY: '', AST_AWAY: '', STL_AWAY: '', BLK_AWAY: '', TOV_AWAY: ''},
            teamPerformance: {FGHomeRank: '', FTHomeRank: '', REBHomeRank: '', ASTHomeRank: '', STLHomeRank: '', BLKHomeRank: '', TOVHomeRank: '', 
            FGAwayRank: '', FTAwayRank: '', REBAwayRank: '', ASTAwayRank: '', STLAwayRank: '', BLKAwayRank: '', TOVAwayRank: ''},
            teamRank: {FG: '', FT: '', REB: '', AST: '', STL: '', BLK: '', TOV: ''},
            weakness: {field: '', rank: 100},
            matchedPlayer: [],
            seasonList : [],
        }
    }

    options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
    };

    seasonOnChange = (season) => {
        this.setState({ season: season })
        getTeamStats(this.state.selectedTeamId, season).then(res => {
            this.setState({ teamStats: res.results[0] })
        })

        getTeamPerformance(this.state.selectedTeamId, season).then(res => {
            this.setState({ teamPerformance: res.results[0] })
        })

        getTeamRank(this.state.selectedTeamId, '22020').then(res => {
            this.setState({ teamRank: res.results[0] })
            var max = {field: '', rank: 100};
            for (const [key, value] of Object.entries(this.state.teamRank)) {
                if (value < max.rank) {
                    max.rank = value;
                    max.field = key;
                }
            }
            this.setState({ weakness : max })
            getMatchPlayer(this.state.weakness.field, this.state.weakness.rank, this.state.selectedTeamDetails.ABBREVIATION, this.state.season).then(res => {
                this.setState({ matchedPlayer: res.results })
            })
        })
    }

    componentDidMount() {
        getTeamInfo(this.state.selectedTeamId).then(res => {
            this.setState({ selectedTeamDetails: res.results[0] })
        })

        getTeamStats(this.state.selectedTeamId, '22020').then(res => {
            this.setState({ teamStats: res.results[0] })
        })

        getTeamPerformance(this.state.selectedTeamId, '22020').then(res => {
            this.setState({ teamPerformance: res.results[0] });
        })

        getTeamRank(this.state.selectedTeamId, '22020').then(res => {
            this.setState({ teamRank: res.results[0] })
            var max = {field: '', rank: 100};
            for (const [key, value] of Object.entries(this.state.teamRank)) {
                if (value < max.rank) {
                    max.rank = value;
                    max.field = key;
                }
            }
            this.setState({ weakness : max })
            getMatchPlayer(this.state.weakness.field, this.state.weakness.rank, this.state.selectedTeamDetails.ABBREVIATION, this.state.season).then(res => {
                this.setState({ matchedPlayer: res.results })
            })
        })

        getTeamWLStatus(this.state.selectedTeamId).then(res => {
            this.setState({ seasonList: res.results })
        })
    }

    render() {
        return (
            <div className="teamPage">
                {/* <MenuBar /> */}
                <div className="header"> 
                    <div className="title-row">
                        <h1 class="title">{this.state.selectedTeamDetails.FULL_NAME}</h1>
                    </div>
                    <div className="hyperlink">
                        <Navbar bg="light" expand="sm">
                            <Nav navbar>
                            <NavItem>
                                <NavLink active href="/">
                                    Home
                                </NavLink>
                                </NavItem>
                            <NavItem>
                                <NavLink active  href="/teams" >
                                    Teams
                                </NavLink>
                            </NavItem>
                            </Nav>
                        </Navbar>
                    </div>
                </div>
                
                {/* <Divider /> */}

                <div className="teampage">
                    <Card className="left-block">
                        <CardBody>
                            <table>
                                <tr className="left-top-block">
                                <th>
                                    <img className="teamlogo" src={this.state.selectedTeamDetails.LOGO} type="image/svg+xml" />
                                </th>
                                </tr>
                                <tr className="table-row">
                                    <th scope="row" className="infobox-label">Abbreviation</th>
                                    <td className="infobox-data">{this.state.selectedTeamDetails.ABBREVIATION}</td>
                                </tr> 
                                <tr className="table-row">
                                    <th scope="row" className="infobox-label">City</th>
                                    <td className="infobox-data">{this.state.selectedTeamDetails.CITY}</td>
                                </tr>
                                <tr className="table-row">
                                    <th scope="row" className="infobox-label">State</th>
                                    <td className="infobox-data">{this.state.selectedTeamDetails.STATE}</td>
                                </tr>
                                <tr className="table-row">
                                    <th scope="row" className="infobox-label">Year Found</th>
                                    <td className="infobox-data">{this.state.selectedTeamDetails.YEAR_FOUNDED}</td>
                                </tr>
                                <tr className="table-row">
                                    <th scope="row" className="infobox-label">Arena</th>
                                    <td className="infobox-data">{this.state.selectedTeamDetails.ARENA}</td>
                                </tr>
                                <tr className="table-row">
                                    <th scope="row" className="infobox-label">Coach</th>
                                    <td className="infobox-data">{this.state.selectedTeamDetails.COACH}</td>
                                </tr>
                                <tr className="table-row">
                                    <th scope="row" className="infobox-label">Owner</th>
                                    <td className="infobox-data">{this.state.selectedTeamDetails.OWNER}</td>
                                </tr>
                                <tr className="table-row">
                                    <th scope="row" className="infobox-label">General Manager</th>
                                    <td className="infobox-data">{this.state.selectedTeamDetails.GENERALMANAGER}</td>
                                </tr>
                            </table>
                        </CardBody>
                    </Card>

                    <div className="right-block">
                        <div className="statistics">
                            <h3 className="header">Statistics</h3>
                            <div className="select">
                                <Select defaultValue="22020" style={{ width: 120 }} onChange={this.seasonOnChange} >
                                    <Option value='22020'>2020-2021</Option>
                                    <Option value='22019'>2019-2020</Option>
                                    <Option value='22018'>2018-2019</Option>
                                    <Option value='22017'>2017-2018</Option>
                                    <Option value='22016'>2016-2017</Option>
                                    <Option value='22015'>2015-2016</Option>
                                    <Option value='22014'>2014-2015</Option>
                                    <Option value='22013'>2013-2014</Option>
                                    <Option value='22012'>2012-2013</Option>
                                    <Option value='22011'>2011-2012</Option>
                                    <Option value='22010'>2010-2011</Option>
                                    <Option value='22009'>2009-2010</Option>
                                    <Option value='22008'>2008-2009</Option>
                                    <Option value='22007'>2007-2008</Option>
                                    <Option value='22006'>2006-2007</Option>
                                    <Option value='22005'>2005-2006</Option>
                                    <Option value='22004'>2004-2005</Option>
                                    <Option value='22003'>2003-2004</Option>
                                    <Option value='22002'>2002-2003</Option>
                                    <Option value='22001'>2001-2002</Option>
                                    <Option value="22000">2000-2001</Option>
                                </Select> 
                            </div>
                        </div>
                        <table class="stats-table">
                            <tr className="right-row">
                                <th className="table-col"></th>
                                <th className="table-col">FG_PC</th>
                                <th className="table-col">FT_PC</th>
                                <th className="table-col">REB</th>
                                <th className="table-col">AST</th>
                                <th className="table-col">STL</th>
                                <th className="table-col">BLK</th>
                                <th className="table-col">TOV</th>
                            </tr>
                            <tr className="right-row">
                                <th className="table-col">HOME</th>
                                <tb className="table-data">{this.state.teamStats.FG_PC_HOME}</tb>
                                <tb className="table-data">{this.state.teamStats.FT_PC_HOME}</tb>
                                <tb className="table-data">{this.state.teamStats.REB_HOME}</tb>
                                <tb className="table-data">{this.state.teamStats.AST_HOME}</tb>
                                <tb className="table-data">{this.state.teamStats.STL_HOME}</tb>
                                <tb className="table-data">{this.state.teamStats.BLK_HOME}</tb>
                                <tb className="table-data">{this.state.teamStats.TOV_HOME}</tb>
                            </tr>
                            <tr className="right-row">
                                <th className="table-col">AWAY</th>
                                <tb className="table-data">{this.state.teamStats.FG_PC_AWAY}</tb>
                                <tb className="table-data">{this.state.teamStats.FT_PC_AWAY}</tb>
                                <tb className="table-data">{this.state.teamStats.REB_AWAY}</tb>
                                <tb className="table-data">{this.state.teamStats.AST_AWAY}</tb>
                                <tb className="table-data">{this.state.teamStats.STL_AWAY}</tb>
                                <tb className="table-data">{this.state.teamStats.BLK_AWAY}</tb>
                                <tb className="table-data">{this.state.teamStats.TOV_AWAY}</tb>
                            </tr>
                        </table>
                        <div class="performance">
                            <h3 className="header">Ranking in League</h3>
                        </div>
                        <table class="stats-table">
                            <tr className="right-row">
                                <th className="table-col"></th>
                                <th className="table-col">FG_PC</th>
                                <th className="table-col">FT_PC</th>
                                <th className="table-col">REB</th>
                                <th className="table-col">AST</th>
                                <th className="table-col">STL</th>
                                <th className="table-col">BLK</th>
                                <th className="table-col">TOV</th>
                            </tr>
                            <tr className="right-row">
                                <th className="table-col">HOME</th>
                                <tb className="table-data">{this.state.teamPerformance.FGHomeRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.FTHomeRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.REBHomeRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.ASTHomeRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.STLHomeRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.BLKHomeRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.TOVHomeRank}</tb>
                            </tr>
                            <tr className="right-row">
                                <th className="table-col">AWAY</th>
                                <tb className="table-data">{this.state.teamPerformance.FGAwayRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.FTAwayRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.REBAwayRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.ASTAwayRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.STLAwayRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.BLKAwayRank}</tb>
                                <tb className="table-data">{this.state.teamPerformance.TOVAwayRank}</tb>
                            </tr>
                        </table>
                        <Divider />
                        <div class="recommend-players">
                            <h3 className="header">Matched Players</h3>
                        </div>
                        <table class="stats-table">
                            <tr className="right-row">
                                <th className="table-col">1st match</th>
                                <tb className="player-match">{this.state.matchedPlayer && this.state.matchedPlayer.length > 0 ? this.state.matchedPlayer[0].Player: null}</tb>
                            </tr>
                            <tr className="right-row">
                                <th className="table-col">2nd match</th>
                                <tb className="player-match">{this.state.matchedPlayer && this.state.matchedPlayer.length > 0 ? this.state.matchedPlayer[1].Player: null}</tb>
                            </tr>
                            <tr className="right-row">
                                <th className="table-col">3rd match</th>
                                <tb className="player-match">{this.state.matchedPlayer && this.state.matchedPlayer.length > 0 ? this.state.matchedPlayer[2].Player: null}</tb>
                            </tr>
                        </table>
                        <Divider />
                        <div className="notes">
                            <p className="note">FG_PC: Field Goal Percentage &emsp; &emsp; REB: Rebounds &ensp; &ensp; STL: Steal &ensp; &ensp; TOV: Turnover</p>
                            <p className="note">FT_PC: Free Throw Percentage  &ensp; &emsp; AST: Assist &emsp; &nbsp; &emsp; &thinsp; BLK: Block</p>
                        </div>
                        <Divider />
                        <div className="chart" style={{ paddingBottom: '5vh', marginLeft: '-3vh' }}>
                            <TeamChart performance={this.state.seasonList}></TeamChart>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamPage

