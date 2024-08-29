import fs from 'fs';
import path from 'path';

type Params = {
  filePath: string[];
}

export async function GET(request: Request, {params: {filePath}}: {params: Params}) {

  const mergedFilePath = filePath.filter(path => path !== "..").join('/');
  const finalPath = path.join(process.cwd(), 'public', mergedFilePath)
  const file = fs.readFileSync(finalPath);
  return new Response(file, { headers: { 'content-type': 'image/png' } });
}