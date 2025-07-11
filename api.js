
import fs from 'fs';
export default function handler(req, res) {
  const data = JSON.parse(fs.readFileSync('./verified.json', 'utf-8'));
  res.status(200).json(data);
}
