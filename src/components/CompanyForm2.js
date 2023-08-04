import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../companyform2.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios

const CompanyForm = () => {
    const [formData, setFormData] = useState({
        companyType: '',
        registrationYear: '',
        registrationProof: null,
        panNumber: '',
        cinNumber: '',
        otherNumber: '',
    });

    const navigate = useNavigate();

    const navigatepreviouspage = () => {
        // 👇️ navigate to /
        navigate('/companyform');
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // Handle file inputs (for PDF upload)
        if (type === 'file') {
            const file = e.target.files[0];
            setFormData((prevData) => ({
                ...prevData,
                [name]: file,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., send data to a server or perform other actions.
        console.log('Form data:', formData);

        const formDataToSend = new FormData();
        formDataToSend.append('companyType', formData.companyType);
        formDataToSend.append('registrationYear', formData.registrationYear);
        formDataToSend.append('registrationProof', formData.registrationProof);
        formDataToSend.append('panNumber', formData.panNumber);
        formDataToSend.append('cinNumber', formData.cinNumber);
        formDataToSend.append('otherNumber', formData.otherNumber);

        // Make the API call using Axios
        axios.post('YOUR_API_ENDPOINT_URL', formDataToSend)
            .then((response) => {
                // Handle success response here if needed
                console.log('API response:', response.data);
            })
            .catch((error) => {
                // Handle error response here if needed
                console.error('API error:', error);
            });
    };

    return (
        <form className='form2' style={{ color: 'black', backgroundColor: 'white' }}>
            <center><h1 style={{ margin: 10, padding: 5 }}>Company Form 2</h1></center>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ margin: 10 }}>
                    <label style={{ color: '#0f3c69', marginInline: '1rem' }}>Company Type:</label>
                    <input type="text" name="companyType" value={formData.companyType} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />
                </div>
                <div style={{ margin: 10 }}>
                    <label style={{ color: '#0f3c69', marginInline: '1rem' }}>Company Registration Year:</label>
                    <input type="number" name="registrationYear" value={formData.registrationYear} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />
                </div >
            </div>


            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ margin: 10 }}>
                    <label style={{ color: '#0f3c69', marginInline: '1rem', marginInlineEnd: '1.7rem' }}>PAN Number:</label>
                    <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />
                </div>
                <div style={{ margin: 10 }}>
                    <label style={{ color: '#0f3c69', marginInline: '1rem', marginInlineEnd: '2rem' }}>Company Other Number:</label>
                    <input type="text" name="otherNumber" value={formData.otherNumber} onChange={handleChange} style={{ backgroundColor: '#eee' }} />
                </div>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ margin: 10 }}>
                    <label style={{ color: '#0f3c69', marginInline: '1rem', marginInlineEnd: '1.92rem' }}>CIN Number:</label>
                    <input type="text" name="cinNumber" value={formData.cinNumber} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />
                </div>
            </div>

            <div style={{ margin: 10 }}>
                <label style={{ color: '#0f3c69', marginInline: '1rem', marginInlineEnd: '1rem' }}>Company Registration Proof (PDF):</label>
                <input type="file" name="registrationProof" onChange={handleChange} accept=".pdf" required style={{ backgroundColor: '#eee' }} />
            </div>
            <center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ padding: 20, marginInlineStart: '16em' }}>
                        <button type="submit" onClick={navigatepreviouspage} className='savebtn' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 20, marginInline: 5 }} >Previous Page</button>
                    </div>
                    <div style={{ padding: 20 }}>
                        <button type="submit" className='savebtn' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 20, marginInline: 5 }} >Save & Next</button>
                    </div>
                </div>
            </center>
        </form>
    );
};

export default CompanyForm;
