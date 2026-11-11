// node frames.js still t1 t2 ...   |   node frames.js scene <from> <to> <out.mp4>
const { chromium } = require('playwright'); const { spawn } = require('child_process'); const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--force-color-profile=srgb'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('http://localhost:4174/promo/source/promo.html'); await p.evaluate(() => window.ready);
  const [mode, ...a] = process.argv.slice(2);
  if (mode === 'still') for (const t of a) { await p.evaluate(t => render(t), +t); await p.screenshot({ path: `still-${t}.jpg`, type: 'jpeg', quality: 80 }); }
  else {
    const [from, to, out] = [+a[0], +a[1], a[2]], tmp = out.replace('.mp4', '.part.mp4');
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-crf', '17', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', '30', tmp]);
    const done = new Promise(r => ff.on('close', r));
    for (let f = Math.round(from * 30); f < Math.round(to * 30); f++) {
      await p.evaluate(t => render(t), f / 30);
      const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); if (await done === 0) fs.renameSync(tmp, out); else process.exitCode = 1;
  }
  if (errs.length) console.log(errs);
  await b.close();
})();
