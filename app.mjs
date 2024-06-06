import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

  
const app = express();  
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);  
app.use(express.static(path.join(__dirname, 'public')));  
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));  
  

app.get('/', (req, res) => {  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  
});  

app.get('/diag', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'diag', 'diagnosis.html'));
});

app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'demo', 'demo.html'));
});
  
const router = express.Router();  

app.use('/api', router);  
  

router.post('/generate-text', async (req, res) => {  
  const prompt = req.body.prompt;  
  const maxTokens = req.body.maxTokens;  
  try {  
    const gptResponse = await axios.post(`${process.env.END_POINT}`, {
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': `${process.env.AZURE_API_KEY}` 
            }
        }); 
    res.json(gptResponse.data);
  } catch (err) {  
    // res.json({ message: err.message });  
    console.log(err);
  }  
});  

  

  
app.listen(3000, () => {  
  console.log('Server is running on http://localhost:3000');  
});  
