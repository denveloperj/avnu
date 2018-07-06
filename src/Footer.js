import React, { Component, createElement } from 'react';
import Helmet from 'react-helmet';

class Footer extends Component {
  
  render() {
    return (
    	<footer>
    		<div className="grey">
				<div className="content-container">
					<p>We have the time to help, lets chat.</p>
					<a href="#" className="with-arrow open-contact">Call to action</a>
				</div>
			</div>
			<div className="dark-grey">
				<div className="content-container"> 
					<img src="https://images.ctfassets.net/dkcrc82u6zt9/5dmP7ER9zO8wMUs4UkYYwg/e28d44c0ef1cbeed182835a56362719a/avnu-logo.png" />
					<div className="address">
						<img src="https://images.ctfassets.net/dkcrc82u6zt9/5wKVppaX9moO0CyAwMSSKK/4a0547ab6c987cc7d881d967a8f054bf/location.png" />
						<p>175 Sailors Bay Road
							Northbridge Rd 175
							Sydney, Australia</p>
						<a href="#enquiry">Get in touch</a>
					</div>
				</div>
			</div>
			<div className="bottom-dark-grey">
				<div className="content-container"> 
					<a href="">Copyright</a>
					<a href="">Disclaimer</a>
					<a href="">Privacy Policy</a>
					<a href="">Terms of Use</a>
				</div>
			</div>
    	</footer>
    );
  }
}

export default Footer;