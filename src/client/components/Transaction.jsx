import './Transaction.css';
import React, { useContext , useEffect } from "react";
import DataContext from "../data/DataContext";


// pass-in props expenseData
function Transaction({ expenseData }) {
  // provider from 
  const { lent, borrowed, setLent, setBorrowed } = useContext(DataContext);

  // use new Date()toString 
  // set to 12 hrs
  // 
    const today = new Date().toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      // total report
      useEffect(() => {
        // lent set to 0
        let totalLent = 0;
        // borrow set to 0
        let totalBorrowed = 0;
    
        // expenseData from useState
        // use forEach on every expense 
        expenseData.forEach((expense) => {
          // check if the expense
            // i paid for us // we split in half // I lent in half
            // i pay for you // you pay back in full amouny // I lent in full amout
            // you paid for us // we split in half // I borrowed you in half
            // you paid for me in full // i have to pay back in full amont // I borrowed you in full amount
           
            // no more options for now // more manually share

          if (expense.option === 'iPaidSplit' || expense.option === 'youPayMe') {
            totalLent += expense.option === 'iPaidSplit' ? expense.amount / 2 : expense.amount;
          } else if (expense.option === 'youPaidSplit' || expense.option === 'iPayBack') {
            totalBorrowed += expense.option === 'youPaidSplit' ? expense.amount / 2 : expense.amount;
          }
        });
        // pass into useState of setLent
        setLent(totalLent);
        // pass into useState of setBorrow
        setBorrowed(totalBorrowed);
        // [] ???? 
      }, [expenseData, setLent, setBorrowed]);
    
      // in case of no transaction 
      // if no data pass in or array length is 0 
    if (!expenseData || expenseData.length === 0) {
      // render.. no transactions available
        return <p style={{
            backgroundColor: "white",
            padding: '20px',
            borderRadius: '20px',
            boxShadow: '3px 3px 3px 3px rgba(105, 100, 100, 0.784)',
            marginBottom:'50px'
          }}>
            No transactions available
          </p>;    
    }

    // make a table of transaction report
    // column // date time description amount edit/delete settle options

// value={amount}
/*
<option value="">Click to see options</option>
            <option value="iPaidSplit">Paid by you, split equally</option>
            <option value="youPayMe">You are owed the full amount</option>
            <option value="youPaidSplit">
              Your partner paid, split equally
            </option>
            <option value="iPayBack">
              Your partner is owed the full amount
            </option>
            <option value="moreOptions">More options</option>
*/

// report on lent / borrow / or even
  // check if the amount you lent greater than borrow // green color // render you lent! // ถ้าให้ยืม มากกว่า ยืม
  // else // ถ้ายืม มากกว่า ให้ยืม // render you borrow // red 
  // if = 0 // even
    return (
        <div className='container'>
          <h2 id="head-tran">Transactions</h2>     
            <div id="show-report" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                {lent > borrowed ? (
                  <p className="lent-report">You lent ${Math.abs(lent - borrowed).toFixed(2)}</p>
                ) : borrowed > lent ? (
                  <p className="borrow-report">You borrowed ${Math.abs(lent - borrowed).toFixed(2)}</p>
                ) : (
                  <p className="even-report">You are even</p>
                )}
            </div> 

            <div id="year" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <h2 style={{ marginRight: '10px', marginBottom: '0' }}>Year:</h2>
              <p style={{ margin: '0' }}>{today.split(',')[2]}</p>
            </div> 

            <table className='trans-table'>
              <thead>
                <tr className='tr'>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Settle</th>
                  </tr>
              </thead>
              <tbody>
                {expenseData.map((expense) => (
                  <tr key={expense.id}>
                    <td id="td-date">{today.split(',')[1]}</td>
                    <td id="td-time">{today.split(',')[3]}</td>
                    <td id="td-title">
                      {expense.description}
                      {expense.option === 'iPaidSplit' && 
                        <>
                          <p>You Paid ${expense.amount}</p> 
                        </>
                      }

                      {expense.option === 'youPayMe' &&   
                      <>
                          <p>You Paid ${expense.amount}</p> 
                        </>
                      }
                      {expense.option === 'youPaidSplit' &&   
                      <>
                          <p>Your partner paid ${expense.amount}</p> 
                        </>
                      }
                      {expense.option === 'iPayBack' &&   
                      <>
                          <p>Your partner paid ${expense.amount}</p> 
                        </>
                      }
                      {expense.option === 'moreOptions' && ' (custom)'}
                    </td>
                    <td>
                      <span id="lent">
                      {expense.option === 'iPaidSplit' && (
                        <>
                          You lent ${expense.amount / 2}
                        </>
                      )}
                      {expense.option === 'youPayMe' && (
                        <>
                          You lent ${expense.amount}
                        </>
                      )}
                      </span>
                      <span id="borrow">
                      {expense.option === 'youPaidSplit' && (
                        <>
                          You borrowed ${expense.amount / 2}
                        </>
                      )}
                      {expense.option === 'iPayBack' && (
                        <>
                          You borrowed ${expense.amount}
                        </>
                      )}
                      </span>
                      {expense.option === 'moreOptions' && ''}
                    </td>
                    <td><button id='money'>💸</button></td>

                  </tr>
                ))}
              </tbody>
          </table>

        </div>
      );
}

export default Transaction;