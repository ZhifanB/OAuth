import React from 'react';
// import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import PlayersPage from './pages/Players';
import TeamsPage from './pages/TeamsPage';
import TeamPage from './pages/TeamPage';
import MatchesPage from './pages/MatchesPage';
import MenuBar from './components/MenuBar'
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import generatePicker from 'antd/lib/date-picker/generatePicker';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/players" component={PlayersPage} />
          <Route exact path="/teams" component={TeamsPage} />
          <Route exact path="/team-page" component={TeamPage} />
          <Route exact path="/matches" component={MatchesPage} />
        </Switch>
      </Router>
  );
}

export default App;
