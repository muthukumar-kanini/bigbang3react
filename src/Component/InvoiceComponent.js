import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
// import './invoice.css'

const InvoiceComponent = () => {

    const invoiceBoxStyle = {
        maxWidth: '800px',
        margin: 'auto',
        padding: '30px',
        border: '1px solid #eee',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
        fontSize: '16px',
        lineHeight: '24px',
        fontFamily: "'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif",
        color: '#555',
    };

    const tableStyle = {
        width: '100%',
        lineHeight: 'inherit',
        textAlign: 'left',
    };

    const tdStyle = {
        padding: '5px',
        verticalAlign: 'top',
    };

    const tdAlignRightStyle = {
        ...tdStyle,
        textAlign: 'left',
    };

    const trTopTdStyle = {
        ...tdStyle,
        paddingBottom: '20px',
    };

    const trTopTitleStyle = {
        fontSize: '45px',
        lineHeight: '45px',
        color: '#333',
    };

    const trInformationTdStyle = {
        ...tdStyle,
        paddingBottom: '40px',
    };

    const trHeadingStyle = {
        background: '#eee',
        borderBottom: '1px solid #ddd',
        fontWeight: 'bold',
    };

    const trDetailsTdStyle = {
        ...tdStyle,
        paddingBottom: '20px',
    };

    const trItemStyle = {
        borderBottom: '1px solid #eee',
    };

    const trItemLastStyle = {
        ...trItemStyle,
        borderBottom: 'none',
    };

    const trTotalTdStyle = {
        borderTop: '2px solid #eee',
        fontWeight: 'bold',
    };

    const [bookingDetails, setBookingDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookingDetails = async () => {
          try {
            const bidFromLocalStorage = localStorage.getItem('BID');
            if (!bidFromLocalStorage) {
              console.error('No booking found');
              return;
            }
      
            const response = await axios.get(`https://localhost:7234/api/Bookings/${bidFromLocalStorage}`);
            setBookingDetails(response.data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error:', error);
          }
        };
      
        fetchBookingDetails();
      }, []);
      

    useEffect(() => {
        if (!isLoading) {
            console.log('Booking Details:', bookingDetails);
        }
    }, [bookingDetails, isLoading]);

    if (isLoading) {
        return <div>Loading...</div>; 
    }


    return (
        <div style={invoiceBoxStyle} className="invoice-box">
            <table style={tableStyle} cellPadding="0" cellSpacing="0">
                <tr className="top">
                    <td colSpan="2">
                        <table style={tableStyle}>
                            <tr>
                                <td style={trTopTitleStyle} className="title">
                                    <img
                                        src="data:image/png;base64,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"
                                        alt="Company Logo"
                                    />
                                </td>

                                <td style={trTopTdStyle}>
                                    Invoice No: {bookingDetails.booking_Id}<br />
                                    Created:{bookingDetails.booking_Date} <br />

                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr className="information">
                    <td colSpan="2">
                        <table style={tableStyle}>
                            <tr>
                                <td style={trInformationTdStyle}>
                                    Package Id   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {bookingDetails.tourPackage?.tourPackage_Id}<br />
                                    Location     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   {bookingDetails.tourPackage?.tourPackage_Location} <br />
                                    Package Name  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bookingDetails.tourPackage.tourPackage_Name} <br />
                                    Price Per Day   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bookingDetails.tourPackage.tourPackage_PricePerDay} <br />
                                </td>

                                <td style={trInformationTdStyle}>
                                    {bookingDetails.traveler?.traveller_Username}<br />
                                    {bookingDetails.traveler?.traveller_Email}<br />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>





                <tr style={trHeadingStyle} className="heading">
                    <td>Package</td>

                    <td>Price</td>
                </tr>

                <tr style={trItemStyle} className="item">
                    <td style={tdStyle}>Package Name </td>

                    <td style={tdAlignRightStyle}>                  <td style={tdAlignRightStyle}>{bookingDetails.tourPackage.tourPackage_Name} </td>
                    </td>
                </tr>

                <tr style={trItemStyle} className="item">
                    <td style={trItemLastStyle}>Package Location </td>

                    <td style={tdAlignRightStyle}>{bookingDetails.tourPackage.tourPackage_Location} </td>
                </tr>

                <tr style={trItemLastStyle} className="item last">
                    <td style={tdStyle}>Package Price</td>

                    <td style={tdAlignRightStyle}>{bookingDetails.tourPackage.tourPackage_PricePerDay}</td>
                </tr>

                <tr style={trTotalTdStyle} className="total">
                    <td></td>

                    <td>Total:{bookingDetails.booking_TotalAmount}</td>
                </tr>
            </table>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={() => window.print()} style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Save
                </button>
            </div>
        </div>
    );
};
export default InvoiceComponent;