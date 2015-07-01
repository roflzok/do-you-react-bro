'use strict';

var Header = React.createClass({

	  render: function() {
    return (

            /* EDIT HTML */
			      <header role="header">
							<div class="row between-xs">

								<div class="col-xs-12 col-sm-6">
									<div class="box">
										<h1>Site Title</h1>
									</div>
								</div>

								<div class="col-xs-12 col-sm-6">
									<div class="box">
										<nav role="navigation">
											<ul>
												<li class="active"><a href="">Nav Item</a></li>
												<li><a href="#">Nav Item</a></li>
											</ul>
										</nav>
									</div>
								</div>
							</div>
						</header>
    );
  }

});


var Footer = React.createClass({

  render: function() {
    return (

            /* EDIT HTML */
			      <footer role="footer">
						<div class="row center-xs">
							<div class="col-xs-12 col-sm-8 col-md-6">
								<div class="box wrapper-sm invert-theme">
									<p class="text-center">&copy; 2015 Company Name.</p>
								</div>
							</div>
						</div>
					</footer>
    );
  }

});



var App = React.createClass({
	render: function() {
    return (

            /* EDIT HTML */
            <div>
            	<Header />
            	<Footer />
            </div>
    );
  }
});



/** @jsx React.DOM */
React.render(
	<Header/>,
	document.getElementById('header')
);

React.render(
	<Footer/>,
	document.getElementById('footer')
);