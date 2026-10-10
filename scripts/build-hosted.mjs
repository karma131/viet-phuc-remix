import {readFile,writeFile,mkdir,readdir,copyFile} from 'node:fs/promises';
import {join,extname} from 'node:path';
import {build} from 'esbuild';
const root=process.cwd(),dist=join(root,'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'};
const assets={};
async function walk(dir,relative=''){for(const item of await readdir(dir,{withFileTypes:true})){if(item.name==='.openai'||item.name==='server')continue;const rel=relative+'/'+item.name;const path=join(dir,item.name);if(item.isDirectory())await walk(path,rel);else assets[rel]={type:types[extname(item.name)]||'application/octet-stream',data:(await readFile(path)).toString('base64')};}}
await walk(dist);await mkdir(join(root,'worker'),{recursive:true});
await writeFile(join(root,'worker','assets.generated.js'),`export default ${JSON.stringify(assets)};`);
await mkdir(join(dist,'server'),{recursive:true});
await build({entryPoints:[join(root,'worker','index.js')],bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true,outfile:join(dist,'server','index.js')});
await mkdir(join(dist,'.openai'),{recursive:true});await copyFile(join(root,'.openai','hosting.json'),join(dist,'.openai','hosting.json'));
console.log(`Hosted Worker built with ${Object.keys(assets).length} embedded assets.`);
