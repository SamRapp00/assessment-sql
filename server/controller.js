require('dotenv').config();

const { CONNECTION_STRING } = process.env;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING);

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF EXISTS cities;
            DROP TABLE IF EXISTS countries;

            CREATE TABLE countries (
                country_id SERIAL PRIMARY KEY, 
                name VARCHAR
            );

            CREATE TABLE cities (
                city_id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                rating INTEGER,
                country_id INTEGER REFERENCES countries(country_id)
            );

            INSERT INTO countries (name)
            VALUES ('Afghanistan'),
                ('Albania'),
                ('Algeria'),
                ('Andorra'),
                ('Angola'),
                ('Antigua and Barbuda'),
                ('Argentina'),
                ('Armenia'),
                ('Australia'),
                ('Austria'),
                ('Azerbaijan'),
                ('Bahamas'),
                ('Bahrain'),
                ('Bangladesh'),
                ('Barbados'),
                ('Belarus'),
                ('Belgium'),
                ('Belize'),
                ('Benin'),
                ('Bhutan'),
                ('Bolivia'),
                ('Bosnia and Herzegovina'),
                ('Botswana'),
                ('Brazil'),
                ('Brunei'),
                ('Bulgaria'),
                ('Burkina Faso'),
                ('Burundi'),
                ('Côte d''Ivoire'),
                ('Cabo Verde'),
                ('Cambodia'),
                ('Cameroon'),
                ('Canada'),
                ('Central African Republic'),
                ('Chad'),
                ('Chile'),
                ('China'),
                ('Colombia'),
                ('Comoros'),
                ('Congo'),
                ('Costa Rica'),
                ('Croatia'),
                ('Cuba'),
                ('Cyprus'),
                ('Czech Republic'),
                ('Democratic Republic of the Congo'),
                ('Denmark'),
                ('Djibouti'),
                ('Dominica'),
                ('Dominican Republic'),
                ('Ecuador'),
                ('Egypt'),
                ('El Salvador'),
                ('Equatorial Guinea'),
                ('Eritrea'),
                ('Estonia'),
                ('Eswatini'),
                ('Ethiopia'),
                ('Fiji'),
                ('Finland'),
                ('France'),
                ('Gabon'),
                ('Gambia'),
                ('Georgia'),
                ('Germany'),
                ('Ghana'),
                ('Greece'),
                ('Grenada'),
                ('Guatemala'),
                ('Guinea'),
                ('Guinea-Bissau'),
                ('Guyana'),
                ('Haiti'),
                ('Holy See'),
                ('Honduras'),
                ('Hungary'),
                ('Iceland'),
                ('India'),
                ('Indonesia'),
                ('Iran'),
                ('Iraq'),
                ('Ireland'),
                ('Israel'),
                ('Italy'),
                ('Jamaica'),
                ('Japan'),
                ('Jordan'),
                ('Kazakhstan'),
                ('Kenya'),
                ('Kiribati'),
                ('Kuwait'),
                ('Kyrgyzstan'),
                ('Laos'),
                ('Latvia'),
                ('Lebanon'),
                ('Lesotho'),
                ('Liberia'),
                ('Libya'),
                ('Liechtenstein'),
                ('Lithuania'),
                ('Luxembourg'),
                ('Madagascar'),
                ('Malawi'),
                ('Malaysia'),
                ('Maldives'),
                ('Mali'),
                ('Malta'),
                ('Marshall Islands'),
                ('Mauritania'),
                ('Mauritius'),
                ('Mexico'),
                ('Micronesia'),
                ('Moldova'),
                ('Monaco'),
                ('Mongolia'),
                ('Montenegro'),
                ('Morocco'),
                ('Mozambique'),
                ('Myanmar'),
                ('Namibia'),
                ('Nauru'),
                ('Nepal'),
                ('Netherlands'),
                ('New Zealand'),
                ('Nicaragua'),
                ('Niger'),
                ('Nigeria'),
                ('North Korea'),
                ('North Macedonia'),
                ('Norway'),
                ('Oman'),
                ('Pakistan'),
                ('Palau'),
                ('Palestine State'),
                ('Panama'),
                ('Papua New Guinea'),
                ('Paraguay'),
                ('Peru'),
                ('Philippines'),
                ('Poland'),
                ('Portugal'),
                ('Qatar'),
                ('Romania'),
                ('Russia'),
                ('Rwanda'),
                ('Saint Kitts and Nevis'),
                ('Saint Lucia'),
                ('Saint Vincent and the Grenadines'),
                ('Samoa'),
                ('San Marino'),
                ('Sao Tome and Principe'),
                ('Saudi Arabia'),
                ('Senegal'),
                ('Serbia'),
                ('Seychelles'),
                ('Sierra Leone'),
                ('Singapore'),
                ('Slovakia'),
                ('Slovenia'),
                ('Solomon Islands'),
                ('Somalia'),
                ('South Africa'),
                ('South Korea'),
                ('South Sudan'),
                ('Spain'),
                ('Sri Lanka'),
                ('Sudan'),
                ('Suriname'),
                ('Sweden'),
                ('Switzerland'),
                ('Syria'),
                ('Tajikistan'),
                ('Tanzania'),
                ('Thailand'),
                ('Timor-Leste'),
                ('Togo'),
                ('Tonga'),
                ('Trinidad and Tobago'),
                ('Tunisia'),
                ('Turkey'),
                ('Turkmenistan'),
                ('Tuvalu'),
                ('Uganda'),
                ('Ukraine'),
                ('United Arab Emirates'),
                ('United Kingdom'),
                ('United States of America'),
                ('Uruguay'),
                ('Uzbekistan'),
                ('Vanuatu'),
                ('Venezuela'),
                ('Vietnam'),
                ('Yemen'),
                ('Zambia'),
                ('Zimbabwe');

            INSERT INTO cities (name, rating, country_id)
            VALUES ('City1', 5, 1),
                ('City2', 4, 2),
                ('City3', 3, 3);
        `)
            .then(() => {
                console.log('DB seeded!');
                res.sendStatus(200);
            })
            .catch(err => {
                console.log('error seeding DB', err);
                res.sendStatus(500);
            });
    },

    getCountries: (req, res) => {
        sequelize.query(`SELECT * FROM countries;`)
            .then(dbRes => {
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.error('Error getting countries:', err);
                res.status(500).send('Error getting countries from the database');
            });
    },

    createCity: (req, res) => {
        const { name, rating, countryId } = req.body;

        sequelize.query(`
            INSERT INTO cities (name, rating, country_id)
            VALUES ('${name}', ${rating}, ${countryId});
        `)
            .then(dbRes => {
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.error('Error creating city:', err);
                res.status(500).send('Internal Server Error');
            });
    },

    getCities: (req, res) => {
        sequelize.query(`
            SELECT 
                cities.city_id, 
                cities.name AS city, 
                cities.rating, 
                countries.country_id, 
                countries.name AS country 
            FROM 
                cities 
            JOIN 
                countries 
            ON 
                cities.country_id = countries.country_id
            ORDER BY 
                cities.rating DESC;
        `)
            .then(dbRes => {
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.error('Error getting cities:', err);
                res.status(500).send('Error getting cities from the database');
            });
    },

    deleteCity: (req, res) => {
        const { id } = req.params;

        sequelize.query(`
            DELETE FROM cities 
            WHERE city_id = ${id};
        `)
            .then(dbRes => {
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.error('Error deleting city:', err);
                res.status(500).send('Error deleting city from the database');
            });
    }
};
