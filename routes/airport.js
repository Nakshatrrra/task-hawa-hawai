const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/:iata_code', async (req, res) => {
    const iata_code = req.params.iata_code;

    try {
        const [airportResult] = await db.execute(`
            SELECT * FROM airport WHERE iata_code = ?
        `, [iata_code]);

        if (airportResult.length === 0) {
            return res.status(404).json({ error: 'Airport not found' });
        }

        const airport = airportResult[0];

        const [cityResult] = await db.execute(`
            SELECT * FROM city WHERE id = ?
        `, [airport.city_id]);

        const city = cityResult[0];

        const [countryResult] = await db.execute(`
            SELECT * FROM country WHERE id = ?
        `, [city.country_id]);

        const country = countryResult[0];

        const response = {
            airport: {
                id: airport.id,
                icao_code: airport.icao_code,
                iata_code: airport.iata_code,
                name: airport.name,
                type: airport.type,
                latitude_deg: airport.latitude_deg,
                longitude_deg: airport.longitude_deg,
                address: {
                    city: {
                        id: city.id,
                        name: city.name,
                        country_id: city.country_id,
                        is_active: city.is_active,
                        lat: city.lat,
                        longitude: city.longitude
                    },
                    country: {
                        id: country.id,
                        name: country.name,
                        country_code_two: country.country_code_two,
                        country_code_three: country.country_code_three,
                        mobile_code: country.mobile_code,
                        continent_id: country.continent_id
                    }
                }
            }
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
