import axios from 'axios'
import React from 'react'

export default async function GetRandom() {
    const getMostPopular = async () => {
        const options = {
            method: 'GET',
            url: 'https://online-movie-database.p.rapidapi.com/title/get-most-popular-movies',
            params: { currentCountry: 'US', purchaseCountry: 'US', homeCountry: 'US' },
            headers: {
                'X-RapidAPI-Key': '7fbab8e071mshfca073c1cbc94cep138cebjsnfd820d28c285',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
        };
        let mostPopular = []
        await axios.request(options).then(function (response) {
            const data = response.data.map(element => element.slice(7, -1))
            console.log(data)
            mostPopular = data
        }).catch(function (error) {
            console.error(error);
        });
        const i = Math.floor(Math.random() * 100)
        return mostPopular[i]
    }
    console.log('clicked')
    const random = await getMostPopular()
    console.log(random);
    const options = {
        method: 'GET',
        url: 'https://online-movie-database.p.rapidapi.com/title/get-plots',
        params: { tconst: random },
        headers: {
            'X-RapidAPI-Key': '7fbab8e071mshfca073c1cbc94cep138cebjsnfd820d28c285',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    let randomMovie = undefined
    await axios.request(options).then(function (response) {
        console.log(response.data);
        randomMovie = {title: response.data.base.title, synopses: response.data.plots[1]?.text, image: response.data.base.image.url}
    }).catch(function (error) {
        console.error(error);
    });

    return randomMovie
}
