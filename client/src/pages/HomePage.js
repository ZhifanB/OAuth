import React from 'react';

import MenuBar from '../components/MenuBar';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import '../style/HomePage.css';
// import BannerImage from '../assets/HomePage1.jpeg';
// import BannerImage from '../assets/HomePage2.jpeg';
// import BannerImage from '../assets/HomePage3.jpg';
// import BannerImage from '../assets/HomePage4.jpg';
// import BannerImage from '../assets/HomePage5.jpg';
import BannerImage from '../assets/HomePage6.jpg';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


// import BannerImage from '../assets/HomePage2.jpeg';
// import Navbar from '../components/Navbar'

const clientId = "941781346977-7i7et4bcbg6c5ug6mfjc7rdi0vhlmeia.apps.googleusercontent.com";


class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      pagination: null,
      googleLogInInfo: []
    }
  }

  componentDidMount() {
  }

  onSuccess = (response) => {
     console.log(response);
     this.setState({googleLogInInfo : response});
  }

  // onSuccess = ({ access_token: token }) => setAccessToken(token);

  onFailure = (response) =>{
    console.log(response);
  } 

  logout = () => {
    console.log('logout');
  }

  render() {
    return (
    
      <div className='homePage' style={{backgroundImage: `url(${BannerImage})`}}>
        <div className='Navbar'>
        <MenuBar />
        </div>
        <div className='content'></div>

        <div className='footer'>
          <div className='copyright'><p>&copy; A Team Has No Name: Zhifan Bian, Li He, Yiting Guevara, Tao Li</p>
            </div>
          <div className='socialMedia'>
            <FacebookIcon onClick={event =>  window.location.href='https://www.facebook.com/nba/'}/> <TwitterIcon onClick={event =>  window.location.href='https://twitter.com/nba'}/>
            </div>
            
      </div>
      </div>
    )
  }
}

export default HomePage