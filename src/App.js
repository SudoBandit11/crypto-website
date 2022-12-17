import React from 'react';
import axios from 'axios';

class CryptoPrices extends React.Component {
  // store the prices of cryptocurrencies fetched from an API and the search query.
  state = {
    prices: [],
    darkMode: false, // flag to store the current mode of the website (dark or light)
    search: '', // store the search query
  }

  componentDidMount() {
    this.getCryptoPrices();
    setInterval(this.getCryptoPrices, 60000); // fetch the prices every 60 seconds
  }

  getCryptoPrices = (search) => {
    // modify the API request to include the search query as a query parameter
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&order=market_cap_desc&search=${search}`)
      .then((response) => {
        // add a new property to each prices object to store the full name of the currency
        const prices = response.data.map(prices => ({
          ...prices,
          name: prices.name + ' (' + prices.symbol + ')',
        }));
        this.setState({ prices });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  // function to toggle the dark mode of the website
  toggleDarkMode = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode,
    }));
  }

  // event handler function to update the search query in the state
  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  }

  // event handler function to call the getCryptoPrices function with the search query
  handleSearch = (event) => {
    event.preventDefault();
    this.getCryptoPrices(this.state.search);
  }

  render() {
    const { prices, darkMode, search } = this.state;
  
    // define the styles for the website depending on the dark mode flag
    const styles = {
      container: {
        backgroundColor: darkMode ? '#222' : '#FFF',
        color: darkMode ? '#FFF' : '#222',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width:'100%',
        padding: '4em'
      },
      darkModeToggle: {
        position: 'absolute',
        right: '0.5em',
        top: '1em',
        width: '2em',
        height: '2em',
        borderRadius: '50%',
        backgroundColor: '#333',
        color: '#FFF',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer'
      },
      searchForm: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        margin: '1em',
        padding: '0.5em',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0 0 5px #CCC',
      },
      searchInput: {
        flex: '1 1 auto',
        margin: '0 1em',
        padding: '0.5em',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1em',
        color: darkMode ? '#FFF' : '#222',
        backgroundColor: darkMode ? '#333' : '#FFF',
      },
      searchButton: {
        flex: 'none',
        margin: '0 1em',
        padding: '0.5em',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1em',
        color: darkMode ? '#FFF' : '#222',
        backgroundColor: darkMode ? '#333' : '#FFF',
        cursor: 'pointer',
      },
    listItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0.5em',
      padding: '0.5em',
      borderRadius: '5px',
      backgroundColor: darkMode ? '#333' : '#FFF',
      color: darkMode ? '#FFF' : '#222',
      },
    coinName: {
      flex: '1 1 auto',
      fontSize: '.9em',
      fontWeight: 'bold',
      padding: '0 7em', // add padding to the left and right sides of each cell
      textAlign: 'left',
      width:'20%',
      borderTop: '.3px solid #CCC'
      },
    coinPrice: {
      flex: 'none',
      fontSize: '.9em',
      margin: '0 0.5em',
      padding: '0 7em', // add padding to the left and right sides of each cell
      textAlign: 'right',
      width:'10%',
      borderTop: '.3px solid #CCC'
    },
    
    coinChange: {
      flex: 'none',
      fontSize: '.9em',
      margin: '0 0.5em',
      padding: '0 5em',
      color: prices.price_change_percentage_24h > 0 ? '#0F0' : '#F00',
      width:'10%',
      borderTop: '.3px solid #CCC'
    },
    pricesTable: {
      width: '60%',
      borderTop: '.3px solid #CCC',
      
    }
  }

    return (
      <div style={styles.container}>
      <h2 style={{padding:'3em'}}>We are adding more features to the website... stay tuned.😀</h2>
      {/* Toggle Button for Dark Mode */}
      <button style={styles.darkModeToggle} onClick={this.toggleDarkMode}>
      {darkMode ? '☀️' : '🌙'}
      </button>
          {/* Search Form */}
         {/* <form style={styles.searchForm} onSubmit={this.handleSearch}>
              <input
              style={styles.searchInput}
              type="text"
              placeholder="Search for a cryptocurrency"
              value={search}
              onChange={this.handleSearchChange}
            />
            <button style={styles.searchButton}>Search</button>
         </form>  */}
      {/* List of Cryptocurrency Prices */}
      <table style={styles.pricesTable}>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>%Change 24h</th>
          </tr>
        </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr key={index}>
                <td style={styles.coinName}>{price.name}</td>
                <td style={styles.coinPrice}>${price.current_price.toFixed(2)}</td>
                <td style={styles.coinChange}>
                  {price.price_change_percentage_24h < 0 ? '' : ''}
                  {price.price_change_percentage_24h > 0 ? '+' : ''}
                  {price.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
);
}
}

export default CryptoPrices;
