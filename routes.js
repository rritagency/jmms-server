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

// CREATE donor
router.post('/donors', async (req, res)=>{
    try {
        const {donor_name, donor_email, donor_phone} = req.body;

        const newDonor = await pool.query(
            'INSERT INTO donors (donor_name, donor_email, donor_phone) VALUES ($1, $2, $3) RETURNING *;',
            [donor_name, donor_email, donor_phone]
        );

        res.json(newDonor.rows[0]);
    } catch (error) {
        console.log('Error creating donor ', error)
        res.status(500).json({error : error.message});
    }
});

// READ ALL donor
router.get('/donors', async (req, res)=>{
    try {
        const donors = await pool.query(
            'SELECT * FROM donors;'
        );

        res.json(donors.rows);
    } catch (error) {
        console.log('Error reading all donor ', error)
        res.status(500).json({error : error.message});
    }
});

// UPDATE donor
router.put('/donors/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const {donor_name, donor_email, donor_phone} = req.body;

        const updatedDonor = await pool.query(
            'UPDATE donors SET donor_name = $1, donor_email = $2, donor_phone = $3 WHERE id = $4 RETURNING *;',
            [donor_name, donor_email, donor_phone, id]
        );

        if(updatedDonor.rows.length === 0){
            return res.status(404).json({error : 'Donor not found'});
        }

        res.json(updatedDonor.rows[0]);
    } catch (error) {
        console.log('Error updating donor ', error)
        res.status(500).json({error : error.message});
    }
});

// DELETE donor
router.delete('/donors/:id', async (req, res)=>{
    try {
        const {id} = req.params;

        const deletedDonor = await pool.query(
            'DELETE FROM donors WHERE id = $1 RETURNING *;',
            [id]
        );

        if(deletedDonor.rows.length === 0){
            return res.status(404).json({error : 'Donor not found'});
        }

        res.json(deletedDonor.rows[0]);
    } catch (error) {
        console.log('Error deleting donor ', error)
        res.status(500).json({error : error.message});
    }
});


////  Student Routes  ////

// CREATE student
router.post('/students', async (req, res)=>{
    try {
        const {student_name, student_school, student_class, student_district, student_phone} = req.body;

        const newStudent = await pool.query(
            'INSERT INTO students (student_name, student_school, student_class, student_district, student_phone) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
            [student_name, student_school, student_class, student_district, student_phone]
        );

        res.json(newStudent.rows[0]);
    } catch (error) {
        console.log('Error creating student ', error)
        res.status(500).json({error : error.message});
    }
});

// READ ALL student
router.get('/students', async (req, res)=>{
    try {
        const students = await pool.query(
            'SELECT * FROM students;'
        );

        res.json(students.rows);
    } catch (error) {
        console.log('Error reading all students ', error)
        res.status(500).json({error : error.message});
    }
});

// UPDATE donor
router.put('/students/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const {student_name, student_school, student_class, student_district, student_phone} = req.body;

        const updatedStudent = await pool.query(
            'UPDATE students SET student_name = $1, student_school = $2, student_class = $3, student_district = $4, student_phone = $5 WHERE id = $6 RETURNING *;',
            [student_name, student_school, student_class, student_district, student_phone, id]
        );

        if(updatedStudent.rows.length === 0){
            return res.status(404).json({error : 'Student not found'});
        }

        res.json(updatedStudent.rows[0]);
    } catch (error) {
        console.log('Error updating student ', error)
        res.status(500).json({error : error.message});
    }
});

// DELETE student
router.delete('/students/:id', async (req, res)=>{
    try {
        const {id} = req.params;

        const deletedStudent = await pool.query(
            'DELETE FROM students WHERE id = $1 RETURNING *;',
            [id]
        );

        if(deletedStudent.rows.length === 0){
            return res.status(404).json({error : 'Student not found'});
        }

        res.json(deletedStudent.rows[0]);
    } catch (error) {
        console.log('Error deleting student ', error)
        res.status(500).json({error : error.message});
    }
});


////  Scholarship Routes  ////

// CREATE a scholarship
router.post('/scholarships', async (req, res) => {
    try {
        const { martyr_id, donor_id, student_id, status, monthly_amount } = req.body;

        const newScholarship = await pool.query(
            'INSERT INTO scholarships (martyr_id, donor_id, student_id, status, monthly_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
            [martyr_id, donor_id, student_id, status, monthly_amount]
        );

        res.json(newScholarship.rows[0]);
    } catch (error) {
        console.error('Error creating scholarship', error.message);
        res.status(500).json({ error: error.message });
    }
});

// READ all scholarships
router.get('/scholarships', async (req, res) => {
    try {
        const scholarships = await pool.query('SELECT * FROM scholarships ORDER BY id ASC;');
        res.json(scholarships.rows);
    } catch (error) {
        console.error('Error reading all scholarships', error.message);
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a scholarship
router.put('/scholarships/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { martyr_id, donor_id, student_id, status, monthly_amount } = req.body;

        const updatedScholarship = await pool.query(
            'UPDATE scholarships SET martyr_id = $1, donor_id = $2, student_id = $3, status = $4, monthly_amount = $5 WHERE id = $6 RETURNING *;',
            [martyr_id, donor_id, student_id, status, monthly_amount, id]
        );

        if (updatedScholarship.rows.length === 0) {
            return res.status(404).json({ error: 'Scholarship not found' });
        }

        res.json(updatedScholarship.rows[0]);
    } catch (error) {
        console.error('Error updating scholarship', error.message);
        res.status(500).json({ error: error.message });
    }
});

// DELETE a scholarship
router.delete('/scholarships/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedScholarship = await pool.query(
            'DELETE FROM scholarships WHERE id = $1 RETURNING *;',
            [id]
        );

        if (deletedScholarship.rows.length === 0) {
            return res.status(404).json({ error: 'Scholarship not found' });
        }

        res.json(deletedScholarship.rows[0]);
    } catch (error) {
        console.error('Error deleting scholarship', error.message);
        res.status(500).json({ error: error.message });
    }
});



////  Disbursement Routes  ////

// CREATE a disbursement
router.post('/disbursements', async (req, res) => {
    try {
        const { scholarship_id, date, remark } = req.body;

        const newDisbursement = await pool.query(
            'INSERT INTO disbursements (scholarship_id, date, remark) VALUES ($1, $2, $3) RETURNING *;',
            [scholarship_id, date, remark]
        );

        res.json(newDisbursement.rows[0]);
    } catch (error) {
        console.log('Error creating disbursement ', error.message);
        res.status(500).json({ error: error.message });
    }
});

// READ ALL disbursements
router.get('/disbursements', async (req, res) => {
    try {
        const disbursements = await pool.query('SELECT * FROM disbursements;');

        res.json(disbursements.rows);
    } catch (error) {
        console.log('Error reading all disbursements ', error.message);
        res.status(500).json({ error: error.message });
    }
});

// READ a single disbursement by ID
router.get('/disbursements/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const disbursement = await pool.query(
            'SELECT * FROM disbursements WHERE id = $1;',
            [id]
        );

        if (disbursement.rows.length === 0) {
            return res.status(404).json({ error: 'Disbursement not found' });
        }

        res.json(disbursement.rows[0]);
    } catch (error) {
        console.log('Error reading disbursement ', error.message);
        res.status(500).json({ error: error.message });
    }
});

// UPDATE a disbursement
router.put('/disbursements/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { scholarship_id, date, remark } = req.body;

        const updatedDisbursement = await pool.query(
            'UPDATE disbursements SET scholarship_id = $1, date = $2, remark = $3 WHERE id = $4 RETURNING *;',
            [scholarship_id, date, remark, id]
        );

        if (updatedDisbursement.rows.length === 0) {
            return res.status(404).json({ error: 'Disbursement not found' });
        }

        res.json(updatedDisbursement.rows[0]);
    } catch (error) {
        console.log('Error updating disbursement ', error.message);
        res.status(500).json({ error: error.message });
    }
});

// DELETE a disbursement
router.delete('/disbursements/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDisbursement = await pool.query(
            'DELETE FROM disbursements WHERE id = $1 RETURNING *;',
            [id]
        );

        if (deletedDisbursement.rows.length === 0) {
            return res.status(404).json({ error: 'Disbursement not found' });
        }

        res.json(deletedDisbursement.rows[0]);
    } catch (error) {
        console.log('Error deleting disbursement ', error.message);
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
