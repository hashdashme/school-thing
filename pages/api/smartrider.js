import { data } from 'cheerio/lib/api/attributes';
import { execOnce } from 'next/dist/shared/lib/utils';

const cheerio = require('cheerio');
// This will get details for specific card

export default async function handler(req, res) {
  const smartrider_id = req.query.id || undefined;

  //  This is the response body...
  let output = {
    success: false,
    data: null
  }
  let output_data = {
    balance: null,
    type: null,
    expire: null,
    autoload: null
  }

  

  if (req.method === 'GET' && smartrider_id !== undefined) {

    //  Check that smartrider number is valid
    if (smartrider_id.length !== 9) {
      output.error = 'Not a valid SmartRider Number.';
      return res.status(500).json(output)
    }

    // Get data from transperth .mobi website
    let response;
    let response_string;
    let $;
    try {
      response = await fetch(`http://136213.mobi/SmartRider/SmartRiderResult.aspx?SRN=${smartrider_id}`)
      response_string = await response.text()
      $ = cheerio.load(response_string)
    }
    catch (e) {
      output.error = 'Something went wrong.';
      return res.status(500).json(output)
    }

    // Parse transperth .mobi website for results.
    output_data.balance = parseFloat($(`#lblCurrentBalance`).text().replace('$', '')).toFixed(2)
    output_data.type = $('#lblType').text()
    output_data.expire = $('#lblExpires').text()
    output_data.autoload = $('#lblAutoload').text() === 'True'

    if (!isNaN(output_data.balance)) {
      output.success = true
      output.data = output_data
      return res.json(output);
    }
    else{
      output.error = 'This card does not exist.'
      return res.status(404).json(output)
    }
    // res.end(`http://136213.mobi/SmartRider/SmartRiderResult.aspx?SRN=${smartrider_id}`)
    // res.raw(await response.text())
  }
  
  //  Handle problems
  else if (isNaN(smartrider_id)) {
    output.error = 'This method is not allowed.'
    return res.status(405).json(output)
  }
  else {
    output.error = 'Missing `id` param.'
    return res.status(400).json(output)
  }
}
