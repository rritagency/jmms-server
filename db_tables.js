const { query } = require('./db');

async function createMartyrsTable() {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS martyrs (
                id SERIAL PRIMARY KEY,
                martyr_name VARCHAR(255),
                martyr_place VARCHAR(255),
                martyr_date VARCHAR(20)
            );
        `);
        console.log('Martyrs table created successfully!');
    } catch (err) {
        console.error('Error creating martyrs table', err);
    }
}

async function createStudentsTable() {
    try {
        await query(
            `CREATE TABLE IF NOT EXISTS students (
                id SERIAL PRIMARY KEY,
                student_name VARCHAR(100),
                student_school VARCHAR(255),
                student_class VARCHAR(50),
                student_district VARCHAR(100),
                student_phone VARCHAR(20)
            );`
        );
        console.log('students table created successfullly');
    } catch (error) {
        console.error('Error creating students table ', error);
    }
}

async function createDonorsTable() {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS donors (
                id SERIAL PRIMARY KEY,
                donor_name VARCHAR(100),
                donor_email VARCHAR(50),
                donor_phone VARCHAR(20)
            );
        `);
        console.log('Donors table created successfully!');
    } catch (err) {
        console.error('Error creating donors table', err);
    }
}

async function createScholarshipsTable() {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS scholarships (
                id SERIAL PRIMARY KEY,
                martyr_id INT REFERENCES martyrs(id) ON DELETE CASCADE,
                donor_id INT REFERENCES donors(id) ON DELETE CASCADE,
                student_id INT REFERENCES students(id) ON DELETE CASCADE,
                status VARCHAR(50),
                monthly_amount NUMERIC(10, 2)
            );
        `);
        console.log('Scholarships table created successfully!');
    } catch (err) {
        console.error('Error creating scholarships table', err);
    }
}

async function createDisbursementsTable(){
    try {
        await query(
            `CREATE TABLE IF NOT EXISTS disbursements (
                id SERIAL PRIMARY KEY,
                scholarship_id INT REFERENCES scholarships(id) ON DELETE CASCADE,
                date VARCHAR(20),
                remark VARCHAR(255)
            );`
        );
        console.log('disbursements table created successfully');
    } catch (error) {
        console.error('Error creating disbursements table ', error);
    }
}

async function miscFunction() {
    try {
        await query(
            'ALTER TABLE donors ALTER COLUMN donor_email DROP NOT NULL;'
        );
        console.log('Misc query executed successfully');
    } catch (error) {
        console.log('Error in misc query ', error);
    }
}

// Call the function you want to execute by uncommenting it

// createMartyrsTable();
// createStudentsTable();
// createDonorsTable();
// createScholarshipsTable();
// createDisbursementsTable();
// miscFunction();
