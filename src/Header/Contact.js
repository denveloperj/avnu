import React, { Component } from 'react';
import OverlayForm from 'react-overlay-menu';
import { createClient } from 'contentful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-select/dist/react-select.css';
import Recaptcha from 'react-recaptcha';
import axios from 'axios';
 
class ContactArea extends Component {
  constructor(props) {
    super(props);
    this.state = { 
	    isOpen: false, 
	    subMenuOpen: null,
	    agents: null,
	    name: '',
		contact: '',
		address: '',
	    type: '', 
	    timeRequested: '', 
	    preferredAgent: '', 
	    recaptcha: '', 
	};
    this.toggleForm = this.toggleForm.bind(this);
    
    this.verifyCallback = this.verifyCallback.bind(this);
  }
 
  toggleForm() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  
  handleChange = (type) => {
    this.setState({ type });
  }
  
  handleTimeChange = (timeRequested) => {
    this.setState({ timeRequested });
  }
  
  handleAgentChange = (preferredAgent) => {
    this.setState({ preferredAgent });
  }
  
  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    this.setState({ [e.target.name]: e.target.value });
  }
  
    verifyCallback(response) {
	  console.log(response);
	};
  
  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { name, contact, address, type, timeRequested, preferredAgent } = this.state;

    axios({
	    method: 'POST',
	    url: 'https://api.ljx.cloud/enquiry',
	    data: { "name" : name, "g-recaptcha-response": 'ssss' },
	    mode: 'no-cors',
		headers: {
			Accept: 'application/x-www-form-urlencoded',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	}).then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
  }
  
  componentWillMount() {
		const client = createClient({
			space: process.env.REACT_APP_SPACE_ID,
			accessToken: process.env.REACT_APP_ACCESS_TOKEN
		});
	  
	  
	   // Agents
	  client
      // use getEntries because it does link resolution
      .getEntries({
	    content_type: 'agent'
      })
      .then(response => {
        // extract the data from the response array
        return response.items;
      })
      .then(fields => {
        this.setState({
          agents: fields
        });
        
      })
      .catch(console.error);
      
  }
  
  componentDidMount() {
	  const script = document.createElement("script");

		script.src = "https://www.google.com/recaptcha/api.js";
		script.async = true;
		
		document.body.appendChild(script);
  }
  
  
  
  render() {
	  
	const { type } = this.state;
	const { timeRequested } = this.state;
	const { preferredAgent } = this.state;
	  
	let agentDropdown = [];
	 
	if(this.state.agents) {
	    this.state.agents.map((agent, i) => { 
	        agentDropdown.push({"value": agent.fields.slug, "label": agent.fields.firstName + " " + agent.fields.lastName});
		});
	}
	  
    return (
      <div className={'contactForm ' + (this.state.isOpen ? 'is-active' : '')}>
        <button type="button" className={(this.state.isOpen ? 'is-active' : 'hidden') + ' hamburger--collapse hamburger'} onClick={this.toggleForm}>
        	<img src="/images/contact-message.svg" />
        	<span className="hamburger-box">
		    	<span className="hamburger-inner"></span>
		    </span>
        </button>
        <OverlayForm 
          open={this.state.isOpen} 
          onClose={this.toggleForm}
          id="contactMenu"
        >
          <div className="blurb">
          	<h3>How can we help?</h3>
          	<p>Fill in the form below and we will get in touch.</p>
          </div>
          
          <form onSubmit={this.onSubmit}>
          	<div className="field">
          		<label>Enquiry Type</label>
          		<Select
			        name="type"
			        value={type}
			        onChange={this.handleChange}
			        options={[
			          { value: 'sale', label: 'Sale' },
			          { value: 'rent', label: 'Rent' },
			          { value: 'purchase', label: 'Purchase' }
			        ]}
			      />
          	</div>
          	<div className="field">
          		<label>Name</label>
          		<input type="text" name="name" placeholder="Please enter your name" />
          	</div>
          	<div className="field">
          		<label>Contact</label>
          		<input type="text" name="contact" placeholder="Enter an email or Phone no." />
          	</div>
          	<div className="field">
          		<label>Address</label>
          		<input type="text" name="address" placeholder="Please enter your address" />
          	</div>
          	<div className="field">
          		<label>Best time to talk</label>
          		<Select
			        name="timeRequested"
			        value={timeRequested}
			        onChange={this.handleTimeChange}
			        options={[
			          { value: 'morning', label: 'Morning' },
			          { value: 'afternoon', label: 'Afternoon' },
			          { value: 'evening', label: 'Evening' },
			        ]}
			      />
          	</div>
          	<div className="field">
          		<label>Preferred agent</label>
          		<Select
			        name="preferredAgent"
			        value={preferredAgent}
			        onChange={this.handleAgentChange}
			        options={agentDropdown}
			      />
          	</div>
          	
          	<Recaptcha 
          		sitekey="6LfEXGIUAAAAAPIvXJBqlEj8_KiKkA33BCkIsIuz"
          		verifyCallback={this.verifyCallback}
          	/>
          	
          	<div className="enter">
          		<button>Send enquiry</button>
          	</div>
          </form>
        </OverlayForm>
       
      </div>
    );
  }
}
 
export default ContactArea;