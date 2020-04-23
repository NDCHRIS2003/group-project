//Project: "Travel Experts" - group website
//Filename:index.js (MAIN APP)
//Target Dir: ./
//Authors: Wayne Frisch, Keith Wang, Chris Okpala
//Date: 2020-03-19
//Run Commandline: "node index.js"
//Run Commandline: [Development(Nodemon)] "npm run TravelExperts"
//Support: wfrisch@yahoo.com

const express = require(`express`);
var bodyParser = require(`body-parser`);
var moment = require('moment');
const mysql = require(`mysql`);
const path = require(`path`);
const querystring = require('querystring');
const app = express();

//set a static route to Travel Experts html,css,js,images folder
app.use(express.static("./public"));

//future use for booking
var timeday = moment.utc().format("YYYY-MM-DD HH:mm:ss")

//bodyParser module settings
app.use(bodyParser.urlencoded({extended: false}))

//Set viewpath and pug engine
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `pug`);

var connection = mysql.createConnection({

//DB connection properties for Travel Experts MySQL connection
host: `localhost`,
user: `root`,
password:``,
database: `travelexperts`,
//debug:`false`, //used for development
multipleStatements: `true`
});

connection.connect(function(error) {
    if(!!error){
        console.log(`Error`);     
    } else {
		console.log(`Connected to PORT 5000`);
		console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }
});

app.post(`/submit`, function (req, res) {
    console.log(req.body);

//sql statement to add customer to Travel Experts db

   var sql = "insert into customers values(null, '" + req.body.CustFirstName +"', '" + req.body.CustLastName +"','" + req.body.CustAddress +"', '" + req.body.CustCity +"', '" + req.body.CustProv +"', '" + req.body.CustPostal +"','" + req.body.CustCountry +"', '" + req.body.CustHomePhone +"','" + req.body.CustBusPhone +"', '" + req.body.CustEmail +"', null)";

    connection.query(sql, function (err){
        if (err)throw err
        res.render('index.pug', { title: `Data Saved`,
        message: `Data Saved Successfully`})
    })
//connection.end();
})

//Contact Agency/Agent sql code
app.get('/contact_agents', function(req, res) {

var sqlagents = "SELECT * FROM agents";                                          // render multiple queries
var sqlagencies = "SELECT * FROM agencies";
var queries = [sqlagents, sqlagencies];
connection.query(queries.join(';'), (error, results, fields) => {
		if (error) throw error;
	console.log(results[0]);
	console.log(results[1]);
	res.render('contact_agents_good.pug', {agentsRow: results[0], agenciesRow: results[1], layout: false});                 // render without layout    
});
});
 
//DISPLAY travel packages
app.get('/index_packages', function(req, res) {
	var packagesList = [];

//SQL query to * data from packages.
	connection.query('SELECT * FROM packages', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

// Create an object to save current row's data
		  		var package = {
		  			'package_name':rows[i].PkgName,
		  			'package_description':rows[i].PkgDesc,
		  			'package_price':rows[i].PkgBasePrice,
					'package_id':rows[i].PackageId,
					'package_image':rows[i].PkgImage,
					'package_enddate':rows[i].PkgEndDate
					
				}
// Add object into array
				  packagesList.push(package);
				  console.log(package);
	  		}

// Render index_packages.pug page using array 
			  res.render('index_packages.pug', {"packagesList": packagesList});
			  console.log(package);
	  	}
	});
	//connection.end();	
});

//index_packages.pug passes data to bookingpage.pug using querystring.parse()
	app.get('/bookingpage', function(req, res) {
	console.log('You are about to book'+req.query);

// Render bookingpage.pug page using querystring 
	res.render('bookingpage.pug', {
		packageId: req.param("PkgId"),
		packageName: req.param("PkgName"),
		packagePrice: req.param("PkgPrice"),
		packageImage: req.param("PkgImage")
	});

	});

//ADD BOOKING to booking table
// 'L' stands for leisure in the triptypes table (linked dependancy)
// '104'customer number hardcoded until we have login functionality (sessions)
// '1' is number of travellers since it is VR travel only it is one person	
	app.get(`/book_package`, function (req, res) {
		console.log('You have booked'+req.query);
		var sqlbook = "insert into bookings values(null,null, 114,1,104,'L',"+req.param("PkgId")+")";
	res.render('book_package.pug', {
		packageId: req.param("PkgId"),
		packageName: req.param("PkgName"),
		packagePrice: req.param("PkgPrice"),
		packageImage: req.param("PkgImage")
		
	})
		
	connection.query(sqlbook, function(error){
			if(error) {
	console.log(`Error in the booking`);
	} else {
	console.log(`Successful  Booking`);
	}
	
})
})

app.listen(5000);