const express = require('express');
const pool = require('./db');

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Server is running...');
});


////  Martyr Routes  ////

// CREATE a martyr
router.post('/martyrs', async (req, res)=>{
    try {
        const {martyr_name, martyr_place, martyr_date} = req.body;

        const newMartyr = await pool.query(
            'INSERT INTO martyrs (martyr_name, martyr_place, martyr_date) VALUES ($1, $2, $3) RETURNING *;',
            [martyr_name, martyr_place, martyr_date]
        );

        res.json(newMartyr.rows[0]);    
    } catch (error) {
        console.log('Error martyr post ', error.message);
        res.status(500).json({error : error.message});
    }
});

// READ all martyrs
router.get('/martyrs', async (req, res)=>{
    try {
        const martyrs = await pool.query(
            'SELECT * FROM martyrs;'
        );

        res.json(martyrs.rows);
    } catch (error) {
        console.log('Error martyr get all ', error.message);
        res.status(500).json({error : error.message});
    }
});

// UPDATE a martyr
router.put('/martyrs/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const { martyr_name, martyr_place, martyr_date } = req.body;

        const updatedMartyr = await pool.query(
            "UPDATE martyrs SET martyr_name = $1, martyr_place = $2, martyr_date = $3 WHERE id = $4 RETURNING *;",
            [martyr_name, martyr_place, martyr_date, id]
        );

        if (updatedMartyr.rows.length === 0) {
            return res.status(404).json({ error: 'Martyr not found' });
        }

        res.json(updatedMartyr.rows[0]);
    } catch (error) {
        console.log('Error martyr put ', error.message);
        res.status(500).json({error : error.message});
    }
});

// DELETE a martyr
router.delete('/martyrs/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const deletedMartyr = await pool.query("DELETE FROM martyrs WHERE id = $1 RETURNING *;", [id]);

        if (deletedMartyr.rows.length === 0) {
            return res.status(404).json({ error: 'Martyr not found' });
        }

        res.json(deletedMartyr.rows[0]);
    } catch (error) {
        console.log('Error martyr delete ', error.message);
        res.status(500).json({error : error.message});
    }
});


////  Donor Routes  ////



////  Student Routes  ////



////  Scholarship Routes  ////



////  Disbursement Routes  ////


module.exports = router;