/** @jsx React.DOM */

'use strict';

var Header = React.createClass({

	  render: function() {
    return (
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