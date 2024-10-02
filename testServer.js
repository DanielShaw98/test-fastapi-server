const axios = require('axios');
require('dotenv').config();  // Make sure to install dotenv

// Retrieve the token from environment variables
const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN;

const requestBody = {
  messages: [
    { role: "system",
      content: `You are Legal AI. Your job is to help lawyers by identifying specific clauses in merger and acquisition contracts.
      Please identify the desired clauses and also provide an explanation for this choice based on the prompt.
      If the requested clause cannot be found, please respond with 'nothing found.'
      Otherwise please provide a response in the following JSON format:
      {
        \"entries\": [
          {
            \"page\": <page_number>,
            \"line_start\": <clause_start_line_within_chunk>,
            \"line_end\": <clause_end_line_within_chunk>,
            \"clause\": <clause_text>,
            \"explanation\": <explanation_text>
          }
        ]
      }`
  },
    { role: "user",
      content: `Prompt: Review the provided text and identify all clauses related to termination rights and conditions.
      Return the exact start and end line numbers of the relevant clause within the chunk. If you cannot find anything relevant, please respond with 'nothing found.'
      Please provide details in the following JSON format:
      {  \"relevant_chunks_found\": <number>,  \"entries\": [    {      \"page\": <page_number>,      \"line_start\": <clause_start_line_within_chunk>,      \"line_end\": <clause_end_line_within_chunk>,      \"clause\": <clause_text>,      \"explanation\": <explanation_text>    }  ]}\n\n
      Chunk: Transaction but all the conditions therein have been satisfied or complied with, \nor confirmed no such clearance is required in accordance with the applicable \ncompetition legislation, or has not objected to the Transaction within the time \nperiod prescribed by law.
      \n227876-4-1460-v9.0 \n- 30 - \n70-40688062 \n \nFor the purposes of clauses 4.1.10 to 4.1.12 (inclusive) only, \"Transaction\" shall \nbe limited to the part or parts of the Transaction required to be notified to the \nCommission, COFECE or the competent competition authority of Vietnam (as \nappropriate).
      \nNo material breach \n4.1.13 no Purchaser Covenant Breach and no Purchaser Material Breach having \noccurred; and \n4.1.14 no Chrysaor Covenant Breach and no Chrysaor Material Breach having \noccurred. \n4.2 \nAny Regulatory Condition or Antitrust Condition may be waived at any time on or \nbefore 17.00 on the Longstop Date by written agreement of the Company and the \nPurchaser.
      Any Chrysaor Material Breach may be waived at any time on or before \n17.00 on the Longstop Date by the Purchaser by notice in writing to the Company.  Any \nPurchaser Material Breach may be waived at any time on or before 17.00 on the \nLongstop Date by the Company by notice in writing to the Purchaser.
      \n4.3 \nIf, at any time, any party becomes aware of a fact, matter or circumstance that could \nreasonably be expected to prevent or delay the satisfaction of a Condition, it shall \ninform the others of the fact, matter or circumstance as soon as reasonably practicable.
      \n4.4 \nIf a Condition has not been satisfied or (if capable of waiver) waived by 17.00 on the \nLongstop Date or becomes impossible to satisfy before that time, either the \nHarbour/Chrysaor Parties or the Purchaser may terminate this Agreement by notice in \nwriting to that effect to the other, save that the Harbour/Chrysaor Parties may only \nterminate this Agreement: (i) on the basis of the Whitewash Condition not having been \nsatisfied by 17.00 on the Longstop Date or having become impossible to satisfy before
      \nthat time; and (ii) on the basis of the Circular Condition and/or the FCA Admission \nCondition not having been satisfied by 17.00 on the Longstop Date or having become \nimpossible to satisfy before that time, in each case, only if the Harbour/Chrysaor Parties \nhave complied with the relevant provisions of clause 5 and/or the Purchaser has not \ncomplied with the relevant provisions of clause 5. \n4.5\n\n Chunk Meta-Data:\nPage Start: 30\n Page End: 31\nLine Start: 1405\n Line End: 1445` }
],
  max_new_tokens: 256
};

axios.post('http://localhost:8000/generate', requestBody, {
  headers: {
    'Authorization': `Bearer ${HUGGINGFACE_TOKEN}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('Response:', response.data);
})
.catch(error => {
  console.error('Error:', error.response ? error.response.data : error.message);
});
