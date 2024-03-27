import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './webscraping/newsscraper.js';
import stockscraper from './webscraping/stockscraper';
import newsscraper from './webscraping/newsscraper.js';

function Window() {
  const [searched, setSearched] = useState(false);
  const [searchedItem, setSearchedItem] = useState('');
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const newStockList = [];
      // const tickerList = ['AMZN', 'AAPL', 'XOM', 'GE', 'MSFT', 'BP', 'PG', 'WMT', 
      //   'PFE', 'HBC', 'TM', 'JNJ', 'BAC', 'AIG', 'CVX', 'AMGN', 'GOOG', 'QCOM', 'AZN', 
      //   'TEF', 'DELL', 'ABT', 'AXP', 'EBAY', 'ERICY', 'HMC', 'NSANY', 'YHOO', 'AET'];
      const tickerList = ['SEC', 'SEC', , 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC'
      , 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC',
      , 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC', 'SEC'];
    
      for (let i = 0; i < tickerList.length; i++) {
        const tickerSymbol = tickerList[i];
        try {
          const { name, price, percent} = await stockscraper(tickerSymbol);
          const { headlines, urls } = await newsscraper(tickerSymbol);
          newStockList.push({
            name: name,
            price: price,
            percent: percent,
            headlines: headlines,
            urls: urls
          });
        } catch (error) {
          console.error('Error fetching stock data for', tickerSymbol, ':', error);
        }
      }
      setStockList(newStockList);
    };
  
    fetchStockData();
  }, []);


  function Header() {
    return (
      <div className="header">
        {Logo()}
        {Home()}
      </div>
    );
  }

  function Home() {
    const homeClicked = (event) => {
      event.preventDefault();
      setSearched(false);
    }

    return (
      <div className="home" onClick={homeClicked}>
        Home
      </div>
    );
  }

  function Logo() {
    return (
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    );
  }


  function SearchBar() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const searchText = event.target.text.value;
      setSearched(true);
      setSearchedItem(searchText);
    }

    return (
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <div className="label">
            <label className="label-text">Enter Stock Ticker Symbol</label>
          </div>
          <input type="text" className="textInput" name="text" placeholder="Type stock..." />
          <button className="button" type="submit">Submit</button>
        </form>
      </div>
    );
  }

  function Stock(title, price, percent) {
    const stockClicked = () =>  {
      setSearched(true);
      setSearchedItem(title);
    }

    return (
      <div className="outer" onClick={stockClicked}>
        <div className="stock">
          <h1 className="stockName">{title}</h1>
          <p className="stockPrice">Current Price: ${price}</p>
          <p className="stockPercent">Percent Increase: {percent}%</p>
        </div>
      </div>
    );
  }

  function StockPage() {
    console.log(searched);
    if (searched) {
      return (
        <div>
          {StockDetails()}
        </div>
      );
    } else {
      return (
        <div>
          {StockList()}
        </div>
      );
    }
  }

  function StockList() {
    const numberOfRows = Math.ceil(stockList.length / 4);
    const rows = [];

    for (let i = 0; i < numberOfRows; i++) {
      const cells = [];

      for (let j = 0; j < 4; j++) {
        const index = i * 4 + j;
        if (index < stockList.length) {
          const stock = stockList[index];
          cells.push(
            <td key={index}>
              {Stock(stock.name, stock.price, stock.percent)}
            </td>
          );
        } else {
          cells.push(<td key={j}></td>);
        }
      }

      rows.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

  function StockDetails() {
    const stock = stockList.find(stock => stock.name === searchedItem);
    if(stock)
    {
      return (
        <div>
          <h1 className="detailName">{stock.name}</h1>
          <h2 className="detailPrice">{stock.price}    {stock.percent}</h2>
          {stock.headlines.map((headline, index) => (
            <div key={index} className="headline">
              <a href={stock.urls[index]} target="_blank" rel="noopener noreferrer">{headline}</a>
            </div>
          ))}
        </div>
      );
    }
    else
    {
      return (
        <div>
          No Stock Found
        </div>
      );
    }
    
  }

  return (
    <div>
      {Header()}
      {SearchBar()}
      {StockPage()}
    </div>
  );
}

export default Window;
