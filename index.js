
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();
const mysql=require('mysql2');
const port = 8086;
const session = require('express-session');
var cron = require('node-cron');

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));







// let data = []; 


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.userid = req.session.userid; 
    } else {
        res.locals.userid = null;
    }
    next();
});




   


app.post('/profile', (req, res) => {
    let data = [];
    data.push(req.body);
    console.log(data);

    let profile = [data[0].name, data[0].email];
    console.log(profile);

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'apmosys',
        database: 'CV_maker',
        password: 'Welcome@2024'
    });

    connection.connect(err => {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return res.status(500).send('Error connecting to the database');
        }
        console.log('Connected as id ' + connection.threadId);
    });

    let insertProfileQuery = "INSERT INTO profile (name, email) VALUES (?, ?)";
    connection.query(insertProfileQuery, profile, (err, result) => {
        if (err) {
            console.error('Error in first query: ', err);
            connection.end();
            return res.status(500).send('Error in first query');
        }

        let userid = result.insertId;
        console.log('Inserted profile with ID: ', userid);
        req.session.userid=userid;
        req.session.save(err => { 
            if (err) {
                console.error('Session save error:', err);

            }

        });

        let skills = data[0].skills;
        let insertSkillsQuery = "INSERT INTO skills (userid, skill) VALUES ?";
        let skillsData = skills.map(skill => [userid, skill]);

        connection.query(insertSkillsQuery, [skillsData], (err, result) => {
            if (err) {
                console.error('Error in second query: ', err);
                connection.end();
                return res.status(500).send('Error in second query');
            }

            console.log('Inserted skills for profile ID: ', userid);



            let eduData = [];
            for (let i = 0; i < data[0].colleges.length; i++) {
                eduData.push([userid, data[0].colleges[i], data[0].degrees[i], data[0].cgpas[i], data[0].passoutYears[i]]);
            }
            console.log(eduData);
        
            let eduq = "INSERT INTO education (userid, college_name, dgree_name, cgpas, passout_year) VALUES ?";
            connection.query(eduq, [eduData], (err, result) => {
                if (err) {
                    console.error('Error in education query: ', err);
                    connection.end();
                    return res.status(500).send('Error in education query');
                }
                console.log('Inserted education details for profile ID: ', userid);
              
                 let exp_data = [];
                  for (let i = 0; i < data[0].companyNames.length; i++) {
                 exp_data.push([userid, data[0].companyNames[i], data[0].positions[i], data[0].projectDescriptions[i], data[0].startDates[i], data[0].endDates[i]]);
                                  }
                     console.log(exp_data);
                let exp_query = "INSERT INTO experience (userid, company_name, position, projectdescription, startDate, endDate) VALUES ?";
                   connection.query(exp_query, [exp_data], (err, result) => {
                         if(err){
                       console.log('error in experience query', err);
                           connection.end();
                        return res.status(500).send('Error in experience query');
                        }
                      console.log('Inserted experience details for profile ID: ', userid);
                       
                         
                         let pro_data=[];
                    for (let i = 0; i < data[0].projectNames.length; i++) {
                    pro_data.push([userid, data[0].projectNames[i], data[0].technologyUseds[i], data[0].Descriptions[i]]);
                                             }
                     console.log(pro_data);  
                let pro_query="INSERT INTO project (userid,project_name,technology_used,Description) VALUES ?";     
                connection.query(pro_query,[pro_data], (err, result) => {
                    if(err){
                  console.log('error in project section query', err);
                      connection.end();
                   return res.status(500).send('Error in project query');
                   }
                 console.log('Inserted project details for profile ID: ', userid);
                 
                 
                 


                 let achive_data=[];

        for (let i = 0; i < data[0].achievements.length; i++) {
         achive_data.push([userid, data[0].achievements[i],data[0].honors[i]]);
                                             }
                 console.log(achive_data);   
                 
            let achive_query="INSERT INTO achievement_honour(userid,achievement,honour)  VALUES ?";
            connection.query(achive_query,[achive_data], (err, result) => {
                if(err){
              console.log('error in achievement_honour section query', err);
                  
               return res.status(500).send('Error in achievement_honour query');
               }
             console.log('Inserted achievement_honour details for profile ID: ', userid);
             connection.end();
             res.redirect('/someRoute');

             console.log(userid);

             });








              
                });                






                              });

            });
        
           
            



        
        });
    });
});
   





app.get('/someRoute', async (req, res) => {
    if (res.locals.userid) {
        console.log('User ID:', res.locals.userid);
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'apmosys',
            database: 'CV_maker',
            password: 'Welcome@2024'
        });

        let userid = res.locals.userid;
        
        try {
            await connection.connect();

            let profile_data = "SELECT * FROM profile WHERE userid= ?";
            let [pro_arr] = await connection.promise().query(profile_data, userid);

            let skill_data = "SELECT * FROM skills WHERE userid= ?";
            let [skill_arr] = await connection.promise().query(skill_data, userid);

            let edu_data="SELECT * FROM education WHERE userid= ?";
            let[edu_arr]= await connection.promise().query(edu_data, userid);


            let exp_data="SELECT * FROM experience WHERE userid= ?";
            let[exp_arr]= await connection.promise().query(exp_data, userid);

            let proj_data="SELECT * FROM project WHERE userid= ?";
            let[proj_arr]= await connection.promise().query(proj_data, userid);

            let achive_honour_data="SELECT * FROM achievement_honour WHERE userid= ?";
            let [achive_honour_arr]=await connection.promise().query(achive_honour_data, userid);



            connection.end();

            req.session.userData = {
                pro_arr: pro_arr[0],
                skill_arr: skill_arr,
                edu_arr: edu_arr,
                exp_arr: exp_arr,
                proj_arr: proj_arr,
                achive_honour_arr: achive_honour_arr
            };

            
            res.render('resume.ejs', { pro_arr: pro_arr[0], skill_arr: skill_arr,edu_arr:edu_arr,exp_arr:exp_arr,proj_arr:proj_arr,achive_honour_arr:achive_honour_arr, isPrinting: false });
        } catch (err) {
            console.error('Error during database query', err);
            connection.end();
            res.status(500).send('Error during database query');
        }
    } else {
        console.log('User ID is undefined');
        res.render('error.ejs');
    }
});


app.get('/download-cv', async (req, res) => {
    if (req.session.userData) {
        const  obj={ pro_arr, skill_arr, edu_arr, exp_arr, proj_arr, achive_honour_arr } = req.session.userData;
        console.log(obj);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const content = await ejs.renderFile(path.join(__dirname, 'views', 'resume.ejs'), { obj,  isPrinting: true });
    await page.setContent(content);
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();
    res.contentType('application/pdf');
    res.send(pdf);
    }
    
    
    
});


cron.schedule('*/20 * * * *', () => {
    console.log('Job started');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'apmosys',
        database: 'CV_maker',
        password: 'Welcome@2024'
    });

    connection.connect(err => {
        if (err) {
            console.error('Error connecting for cleanup: ' + err.stack);
            return;
        }
        console.log('Connected for cleanup as id ' + connection.threadId);

        // Delete all data from the specified tables
        const cleanupQueries = [
            'SET FOREIGN_KEY_CHECKS=0',
            'DELETE FROM profile;',
            'DELETE FROM skills;',
            'DELETE FROM education;',
            'DELETE FROM experience;',
            'DELETE FROM project;',
            'DELETE FROM achievement_honour;'
        ];

        // Execute each query sequentially
        cleanupQueries.forEach(query => {
            connection.query(query, (err, result) => {
                if (err) {
                    console.error('Error during cleanup: ', err);
                } else {
                    console.log('Cleanup successful for one table');
                }
            });
        });

        connection.end();
    });
    console.log('Job ended');
});