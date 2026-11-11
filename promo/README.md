# Promo video

`sam-mackinley-promo.mp4`: a 15-second vertical promo for socials (1080×1920, 30 fps, H.264 + AAC, made 11 Nov 2026). It runs through the problems, meet Sam, eight client sites, the four promises, the pick-and-mix services and the Partner plan, then ends on "Got an idea? Tell me. I'll build it." and sammackinley.com.

The soundtrack is synthesised from scratch (`source/beat.py`), so there's no music licence to worry about.

This folder is left out of the website deploy by `.vercelignore`.

## Rebuilding it

Everything in `source/` is the recipe. The page pulls the site screenshots, the walker sprite sheet and the Satoshi font from elsewhere in this repo, so edits to those flow into a re-render.

- `promo.html`: the animation (GSAP timeline at 128 BPM; one beat = 0.46875 s). `render(t)` draws the frame at time `t`.
- `frames.js`: films it with headless Chrome via Playwright and pipes the frames to ffmpeg.
- `beat.py`: writes `beat.wav` (needs numpy + scipy).

From the repo root:

```sh
python3 -m http.server 4174 &                    # serve the repo
cd promo/source
python3 beat.py                                  # -> beat.wav
for i in 0 1 2 3 4 5 6 7; do                     # one file per 4-beat bar
  node frames.js scene $(python3 -c "print($i*1.875)") $(python3 -c "print(($i+1)*1.875)") bar$i.mp4
done
for i in 0 1 2 3 4 5 6 7; do echo "file bar$i.mp4"; done > list.txt
ffmpeg -f concat -i list.txt -c copy video.mp4
ffmpeg -i video.mp4 -i beat.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -movflags +faststart -shortest ../sam-mackinley-promo.mp4
```

`frames.js` expects Chrome at `/usr/bin/google-chrome`; change `executablePath` if yours is elsewhere. To check single frames before a full render: `node frames.js still 2.9 9.1 14.6` writes `still-<t>.jpg`.
