import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Moviecard from './Moviecard';
import './moviecard.css'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  color:"black",
  backgroundColor: alpha(theme.palette.common.white, 1),
  
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 1),
    color:"white"
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
  const [searchkey, setSearchkey] = React.useState("");
  const [data, setData] = React.useState([]);

  

  const submitHandler = async (e) => {

    const options = {
      method: 'GET',
      url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
      params: { q: `${searchkey}` },
      headers: {
        'X-RapidAPI-Key': '80470192efmsh2e6afc5b89c8a72p1ab11ejsn240bcdbaef97',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };
    if (e.key === "Enter") {

      await axios.request(options).then(function (response) {
        console.log(response.data);
        setData(response.data.d);

      }).catch(function (error) {
        console.error(error);
      });
    }

  }



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MoviZtore
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyUp={(e) => { setSearchkey(e.target.value); submitHandler(e) }}
            />
          </Search>
        </Toolbar>
      </AppBar>

      <div className={data.length?"moviecontainer":"emptycontainer"} >

        {data.map((item,index) => <Moviecard key={index} url={item.i?item.i.imageUrl:"https://www.nbu.ac.in/img/dept/anthropology/slider/slider3.jpg"} />)}
      </div>

    </Box>
  );
}
