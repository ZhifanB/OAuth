import React, { useState } from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";
import {

    Row,
    Col,
    Divider
} from 'antd'
import { getTeam } from '../fetcher'
import MenuBar from '../components/MenuBar';
import '../style/TeamsPageStyle.css';



const TeamsPageRender = () => {
    const [nameQuery, setNameQuery] = useState("");

    let handleNameQueryChange = (event) => {
        setNameQuery(event.target.value);
    }

    let updateSearchResults =()=> {
        getTeam(nameQuery).then(res => {
            let url = "/team-page?id=" + res.results[0].ID;
            window.location.replace(url);
        });
    }

    return (
    <div className="teamsPage">
        <MenuBar />
        <div className="row" style={{ display: 'flex' }}>
        
            <div className="column" >
                <Form className='left-form' >
                <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                        <label>Team</label>
                        <FormInput placeholder="Enter Team Name" value={nameQuery} onChange={handleNameQueryChange} />
                    </FormGroup></Col>
                    <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                        <Button style={{ marginTop: '4vh' }} onClick={updateSearchResults}>Search</Button>
                    </FormGroup></Col>
                </Row>
                </Form>
                <Divider />
                <div className="us-map" role="img" style={{ marginLeft: '25vh' }}> 
                    <img alt="" data-file-height="478" data-file-width="664" decoding="async" height="396" src="https://upload.wikimedia.org/wikipedia/commons/8/89/NBA_locations_map.png" srcset="https://upload.wikimedia.org/wikipedia/commons/8/89/NBA_locations_map.png 1.5x" width="550"/>
                    <div style={{ position:'absolute', fontSize:'75%', left:'417px', top:'120px' }}><a href="/team-page?id=1610612761" title="Toronto Raptors">Raptors</a></div>
                    <div style={{ position:'absolute', fontSize:'75%', left:'502px', top:'126px' }}><a href="/team-page?id=1610612738" title="Boston Celtics">Celtics</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'473px', top:'150px' }}><a href="/team-page?id=1610612752" title="New York Knicks">Knicks</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'502px', top:'163px' }}><a href="/team-page?id=1610612751" title="Brooklyn Nets">Nets</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'474px', top:'185px' }}><a href="/team-page?id=1610612755" title="Philadelphia 76ers">76ers</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'336px', top:'168px' }}><a href="/team-page?id=1610612741" title="Chicago Bulls">Bulls</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'394px', top:'171px' }}><a href="/team-page?id=1610612739" title="Cleveland Cavaliers">Cavaliers</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'377px', top:'145px' }}><a href="/team-page?id=1610612765" title="Detroit Pistons">Pistons</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'358px', top:'193px' }}><a href="/team-page?id=1610612754" title="Indiana Pacers">Pacers</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'326px', top:'136px' }}><a href="/team-page?id=1610612749" title="Milwaukee Bucks">Bucks</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'393px', top:'276px' }}><a href="/team-page?id=1610612737" title="Atlanta Hawks">Hawks</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'423px', top:'238px' }}><a href="/team-page?id=1610612766" title="Charlotte Hornets">Hornets</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'437px', top:'362px' }}><a href="/team-page?id=1610612748" title="Miami Heat">Heat</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'426px', top:'323px' }}><a href="/team-page?id=1610612753" title="Orlando Magic">Magic</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'447px', top:'198px' }}><a href="/team-page?id=1610612764" title="Washington Wizards">Wizards</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'240px', top:'274px' }}><a href="/team-page?id=1610612742" title="Dallas Mavericks">Mavericks</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'257px', top:'313px' }}><a href="/team-page?id=1610612745" title="Houston Rockets">Rockets</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'323px', top:'242px' }}><a href="/team-page?id=1610612763" title="Memphis Grizzlies">Grizzlies</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'310px', top:'330px' }}><a href="/team-page?id=1610612740" title="New Orleans Pelicans">Pelicans</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'226px', top:'333px' }}><a href="/team-page?id=1610612759" title="San Antonio Spurs">Spurs</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'175px', top:'185px' }}><a href="/team-page?id=1610612743" title="Denver Nuggets">Nuggets</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'271px', top:'111px' }}><a href="/team-page?id=1610612750" title="Minnesota Timberwolves">Timberwolves</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'33px', top:'71px' }}><a href="/team-page?id=1610612757" title="Portland Trail Blazers">Trail Blazers</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'243px', top:'231px' }}><a href="/team-page?id=1610612760" title="Oklahoma City Thunder">Thunder</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'117px', top:'157px' }}><a href="/team-page?id=1610612762" title="Utah Jazz">Jazz</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'0px', top:'164px' }}><a href="/team-page?id=1610612744" title="Golden State Warriors">Warriors</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'21px', top:'140px' }}><a href="/team-page?id=1610612758" title="Sacramento Kings">Kings</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'100px', top:'233px' }}><a href="/team-page?id=1610612756" title="Phoenix Suns">Suns</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'-6px', top:'216px' }}><a href="/team-page?id=1610612746" title="Los Angeles Clippers">Clippers</a></div>
                    <div style={{ position: 'absolute', fontSize:'75%', left:'45.5px', top:'206.5px' }}><a href="/team-page?id=1610612747" title="Los Angeles Lakers">Lakers</a></div>

                </div>
            </div>

            <div className="column" >
                <div className="team-list">
                    <div className="eastern">
                        <div className="scope">
                            <span class="scope-title">EASTERN CONFERENCE</span>
                        </div>
                        <div className="row">
                            <div className="left-column">
                                <div className="division-label">
                                    <span className="location" style={{ lineHeight: '30px', fontWeight: '900', fontSize: '.85em', paddingLeft: '15px' }}>Southeast</span>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/ATL_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612737">
                                            <span class="team-name">ATLANTA HAWKS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/CHA_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612766">
                                            <span class="team-name">CHARLOTTE HORNETS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/MIA_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612748">
                                            <span class="team-name">MIAMI HEAT</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/ORL_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612753">
                                            <span class="team-name">ORLANDO MAGIC</span>
                                        </a>
                                    </div>
                                </div>  
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/WAS_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612764">
                                            <span class="team-name">WASHINGTON WIZARDS</span>
                                        </a>
                                    </div>
                                </div>                               
                            </div>
                            <div class="center-column">
                                <div class="division-label">
                                    <span className="location" style={{ lineHeight: '30px', fontWeight: '900', fontSize: '.85em', paddingLeft: '15px' }}>Atlantic</span>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/BOS_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612738">
                                            <span class="team-name">BOSTON CELTICS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/BKN_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612751">
                                            <span class="team-name">BROOKLYN NETS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/NYK_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612752">
                                            <span class="team-name">NEW YORK KNICKS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/PHI_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612755">
                                            <span class="team-name">PHILADELPHIA 76ERS</span>
                                        </a>
                                    </div>
                                </div>  
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/TOR_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612761">
                                            <span class="team-name">TORONTO RAPTORS</span>
                                        </a>
                                    </div>
                                </div>                               
                            </div>
                            <div class="right-column">
                                <div class="division-label">
                                    <span className="location" style={{ lineHeight: '30px', fontWeight: '900', fontSize: '.85em', paddingLeft: '15px' }}>Central</span>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/CHI_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612741">
                                            <span class="team-name">CHICAGO BULLS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/CLE_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612739">
                                            <span class="team-name">CLEVELAND CAVALIERS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/DET_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612765">
                                            <span class="team-name">DETROIT PISTONS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/IND_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612754">
                                            <span class="team-name">INDIANA PACERS</span>
                                        </a>
                                    </div>
                                </div>  
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/MIL_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612749">
                                            <span class="team-name">MILWAUKEE BUCKS</span>
                                        </a>
                                    </div>
                                </div>                               
                            </div>
                        </div>
                    </div>
                    <div className="western">
                        <div className="scope">
                            <span class="scope-title">WESTERN CONFERENCE</span>
                        </div>
                        <div class="row">
                            <div class="left-column">
                                <div class="division-label">
                                    <span className="location" style={{ lineHeight: '30px', fontWeight: '900', fontSize: '.85em', paddingLeft: '15px' }}>Southwest</span>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/DAL_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612742">
                                            <span class="team-name">DALLAS MAVERICKS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/HOU_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612745">
                                            <span class="team-name">HOUSTON ROCKETS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/MEM_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612763">
                                            <span class="team-name">MEMPHIS GRIZZLIES</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/NOP_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612740">
                                            <span class="team-name">NEW ORLEANS PELICANS</span>
                                        </a>
                                    </div>
                                </div>  
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/SAS_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612759">
                                            <span class="team-name">SAN ANTONIO SPURS</span>
                                        </a>
                                    </div>
                                </div>                               
                            </div>
                            <div class="center-column">
                                <div class="division-label">
                                    <span className="location" style={{ lineHeight: '30px', fontWeight: '900', fontSize: '.85em', paddingLeft: '15px' }}>Northwest</span>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/DEN_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612743">
                                            <span class="team-name">DENVER NUGGETS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/MIN_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612750">
                                            <span class="team-name">MINNESOTA TIMBERWOLVES</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/OKC_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612760">
                                            <span class="team-name">OKLAHOMA CITY THUNDER</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/POR_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612757">
                                            <span class="team-name">PORTLAND TRAIL BLAZERS</span>
                                        </a>
                                    </div>
                                </div>  
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/UTA_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612762">
                                            <span class="team-name">UTAH JAZZ</span>
                                        </a>
                                    </div>
                                </div>                               
                            </div>
                            <div class="right-column">
                                <div class="division-label">
                                    <span className="location" style={{ lineHeight: '30px', fontWeight: '900', fontSize: '.85em', paddingLeft: '15px' }}>Pacific</span>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/GSW_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612744">
                                            <span class="team-name">GOLDEN STATE WARRIORS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/LAC_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612746">
                                            <span class="team-name">LOS ANGELES CLIPPERS</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/LAL_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612747">
                                            <span class="team-name">LOS ANGELES LAKERS</span>
                                        </a> 
                                        
                                    </div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/PHX_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612756">
                                            <span class="team-name">PHOENIX SUNS</span>
                                        </a>
                                    </div>
                                </div>  
                                <div className="team">
                                    <div className="team-logo">
                                        <img className="logo" src="https://ca.global.nba.com/media/img/teams/00/logos/SAC_logo.svg" type="image/svg+xml" />
                                    </div>
                                    <div className="team-info">
                                        <a className="team-name-link" href="/team-page?id=1610612758">
                                            <span class="team-name">SACRAMENTO KINGS</span>
                                        </a>
                                    </div>
                                </div>                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)};


export default TeamsPageRender

