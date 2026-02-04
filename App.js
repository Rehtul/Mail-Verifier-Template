// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showadditionalpart, setShowAdditionalPart] = useState(false);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [disableMailInput, setDisableMailInput] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className='mainview'>
      <div className='maincontainer'>
        <div className='iconcontainer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M15.418 5.643a1.25 1.25 0 0 0-1.34-.555l-1.798.413a1.25 1.25 0 0 1-.56 0l-1.798-.413a1.25 1.25 0 0 0-1.34.555l-.98 1.564c-.1.16-.235.295-.395.396l-1.564.98a1.25 1.25 0 0 0-.555 1.338l.413 1.8a1.25 1.25 0 0 1 0 .559l-.413 1.799a1.25 1.25 0 0 0 .555 1.339l1.564.98c.16.1.295.235.396.395l.98 1.564c.282.451.82.674 1.339.555l1.798-.413a1.25 1.25 0 0 1 .56 0l1.799.413a1.25 1.25 0 0 0 1.339-.555l.98-1.564c.1-.16.235-.295.395-.395l1.565-.98a1.25 1.25 0 0 0 .554-1.34L18.5 12.28a1.25 1.25 0 0 1 0-.56l.413-1.799a1.25 1.25 0 0 0-.554-1.339l-1.565-.98a1.25 1.25 0 0 1-.395-.395zm-.503 4.127a.5.5 0 0 0-.86-.509l-2.615 4.426l-1.579-1.512a.5.5 0 1 0-.691.722l2.034 1.949a.5.5 0 0 0 .776-.107z" clip-rule="evenodd" /></svg>
        </div>
        {confirmed ? 
        <div className='confirmeddisplay'>
          Code sent to Email and Verified, you can proceed.
        </div> : <div>
          <span className='introheader'>
            Enter your email to receive a verification code
          </span>
          <div>
            <input
              type="email"
              name="email"
              id="emailaddress"
              placeholder="Email"
              className="forminputelement"
              disabled={disableMailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {showadditionalpart ?
            <div>
              <div>
                <input
                  type="text"
                  name="verificationcode"
                  id="verificationcode"
                  placeholder='Code'
                  className='forminputelement'
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
              <div>
                <button
                  className='formbutton'
                  disabled={verificationCode.length === 0}
                  onClick={async () => {
                    // setShowAdditionalPart('true');
                    try {
                      const response = await axios.post('http://localhost:3001/request-code', { email, verificationCode });
                      if (response.status == 200) {
                        console.log('Code verified');
                        setConfirmed(true);
                      }
                    }
                    catch (error) {
                      console.log(error);
                    }
                  }}>Verify</button>
              </div>
            </div>
            :
            <div>
              <div>
                <button
                  className='formbutton'
                  disabled={!isValidEmail}
                  onClick={async () => {
                    try {
                      const response = await axios.post('http://localhost:3001/request-code', { email });
                      console.log(response.data);
                      if (response.status == 200) {
                        setShowAdditionalPart(true);
                        setDisableMailInput(true);
                      }
                      else {
                        console.log('Check response status code: ' + response.status);
                      }
                    }
                    catch (error) {
                      console.log(error);
                    }
                  }}>Send Code</button>
              </div>
            </div>}
        </div>
        }
      </div>
    </div >
  );
}

export default App;
