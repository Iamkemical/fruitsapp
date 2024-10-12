require('dotenv').config({path: `${process.cwd()}/.env`});
const express = require('express');

const app = express();

const { Sequelize, QueryTypes } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config');
const sequelize = new Sequelize(config[env]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
      status: 'Success',
      message: `FruitsApi ${process.env.NODE_ENV} environment`,
      data: null
  });
});


app.get('/api/fruit/getfruits', async (req, res) => {
    const { name, color, season, createdAt} = req.query;
    
    let baseQuery = 'SELECT color, name, price, season, "createdAt" FROM public.fruits WHERE "createdAt" IS NOT null';
    if(name) {
        baseQuery += ' AND name =$name';
    }
    if(color) {
        baseQuery += ' AND color =$color';
    }
    if(season) {
        baseQuery += ' AND season =$season';
    }
    const [result, metadata] = await sequelize.query(baseQuery, {
    bind: {
        name: name,
        color: color,
        season: season
    }
    });
    
    return res.status(200).json(
        {
            status: 'Success',
            message: 'Fruits fetched successfully',
            data: result
        }
    )
});

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
    console.log('Server up and running on port', PORT);
});