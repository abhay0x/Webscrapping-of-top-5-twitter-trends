const express = require("express");
const app = express();
app.use(express.json());
const port = 80;
const trending = require("./Schema");
const connectDb = require("./db");

app.set('view engine','ejs')
app.set('views','./views')

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
});




const { Builder, By, until } = require('selenium-webdriver');
const { get } = require("mongoose");
async function fetchTwitterTrends() {
    let driver;
    try {
        
        driver = await new Builder().forBrowser('chrome').build();

       
        await driver.get('https://twitter.com/login');

       
        await driver.wait(until.elementLocated(By.name('text')), 10000).sendKeys("@twitter Username", '\n');
        await driver.sleep(2000); 
        await driver.wait(until.elementLocated(By.name('password')), 10000).sendKeys("@twitter password", '\n');

        
        await driver.sleep(5000);

        
        const trendElements = await driver.findElements(By.css('div[data-testid="trend"] span'));
        const trendsSet = new Set(); 

        for (let i = 0; i < trendElements.length; i++) {
            const text = await trendElements[i].getText();
           
            if (text.startsWith('#')) {
                trendsSet.add(text);
            }
          
            if (trendsSet.size === 5) break;
        }
        
       
       var trended = Array.from(trendsSet);
        
      
        console.log("Top 5 Twitter Trends:");
        trended.forEach((trend, index) => {
            console.log(`${index + 1}. ${trend}`);
        });
    
       if(trended != null){
        
        try {
            const trend1=trended[0];
            const trend2=trended[1];
            const trend3=trended[2];
            const trend4=trended[3];
            const trend5=trended[4];

            const data = await trending.create({
              trend1,
              trend2,
              trend3,
              trend4,
              trend5,
            });
            if (data) {
             
              console.log(data);
            }
          } catch (error) {
            console.log(error);
          }
       }


    } catch (error) {
        console.error("Error fetching trends:", error);
    } finally {
       
        if (driver) {
            await driver.quit();
        }
    }
}






app.get("/",async(req,res)=>{ 
  res.render("home");  
})

app.get("/home2",async(req,res)=>{
  const ipAddress = req.ip === "::1" ? "127.0.0.1" : req.ip;
  console.log("IP Address:", ipAddress);
  const posts=await trending.findOne().sort({_id:-1});
  res.render("home2",{posts:posts,ip:ipAddress});  
})

app.get("/trigger-trends", async (req, res) => {
  await fetchTwitterTrends();
  res.status(200).send("Function triggered");
})
