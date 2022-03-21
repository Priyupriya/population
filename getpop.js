const axios = require('axios');
const cheerio = require('cheerio');
//const page_url= 'https://www.borzamalta.com.mt/Handlers/NewsAnnounArtHandler.aspx?page=0&type=3&_=1597686123161'; 
const page_url= 'https://www.worldometers.info/world-population/us-population/'; 
async function getUSstates () {
    const { data } =  await axios.get(page_url);
    const $ = cheerio.load(data);
    const table = $('h2:contains("Population of the United States (2020 and historical)")').parent(); 
    const population = [];
    table.find('tbody tr').each((i, element) => {
        const $rows = $(element);
        const year ={};
        const labels = [
            'Year', 
            'population', 
            'Yearly_%_change', 
            'Yearly_change', 
            'Migrants_(nets)',
            'Median_Age', 
            'Fertility_rate', 
            'Density', 
            'Urban_Pop_percent', 
            'Urban_POP',
            'Country"s_Shares',
            'World_Pop', 
            'U.S_global_rank',
        ];
        let offset = 0;
        $rows.find('td').each((j, col) => {
            const $col = $(col);
            let value = $col.text().trim();
            const numValue = Number(value.replace(/,/g, ""));
            if (!isNaN(numValue)){
                value = numValue;
            }
            if(i===1 && $col.attr('colspan')===2){
                offset = 1;
                const label = labels[j];
                year[label] = value; 
            }else
            {
                const label = labels[j + offset ];
                year[label] = value; 
            }
            const label = labels[j + offset ];
            year[label] = value; 
        }); 
      //  console.log(year);
        population.push(year);
    });
    return population;
}
module.exports = getUSstates;