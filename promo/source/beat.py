"""15 s funk-house bed at 128 BPM (8 bars), synthesised from scratch so it is free to post anywhere."""
import numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile
SR = 44100; BPM = 128; B = 60 / BPM; S = B / 4          # beat, sixteenth
N = int(SR * 15.0); rng = np.random.default_rng(7)
L = np.zeros(N); R = np.zeros(N)
def put(buf, t, x, g=1.0):
    i = int(t * SR)
    if i >= N: return
    x = x[:N - i]; buf[i:i + len(x)] += x * g
def both(t, x, g=1.0, pan=0.0):
    put(L, t, x, g * (1 - max(0, pan))); put(R, t, x, g * (1 + min(0, pan)))
def env(n, a, d): t = np.arange(n) / SR; return np.minimum(1, t / a) * np.exp(-t / d)
def filt(x, kind, f, order=2): return sosfilt(butter(order, f, kind, fs=SR, output='sos'), x)

def kick():
    n = int(.32 * SR); t = np.arange(n) / SR
    f = 46 + 130 * np.exp(-t / .028); ph = 2 * np.pi * np.cumsum(f) / SR
    return (np.sin(ph) * np.exp(-t / .13) + .35 * filt(rng.standard_normal(n), 'high', 3000) * np.exp(-t / .004)) * 1.0
def clap():
    n = int(.22 * SR); x = filt(rng.standard_normal(n), 'band', [900, 3600]); t = np.arange(n) / SR
    e = sum(np.where(t >= d, np.exp(-(t - d) / .012), 0) for d in (0, .011, .023)) * .5 + np.exp(-t / .07) * .6
    return x * e
def hat(d=.03, hp=7500):
    n = int(.25 * SR); return filt(rng.standard_normal(n), 'high', hp, 4) * env(n, .001, d)
def shaker():
    n = int(.08 * SR); return filt(rng.standard_normal(n), 'band', [4500, 9000]) * env(n, .012, .02)
def note(f, dur, bright=14, dec=.09, detune=0.0, kind='saw'):
    """Additive saw/square whose upper harmonics die first — a cheap filter envelope (the 'wah')."""
    n = int(dur * SR); t = np.arange(n) / SR; x = np.zeros(n)
    for k in range(1, bright + 1):
        if kind == 'sq' and k % 2 == 0: continue
        if f * k > 9000: break
        x += np.sin(2 * np.pi * f * k * (1 + detune) * t) / k * np.exp(-t * (k - 1) / (dec * 6))
    return x
hz = lambda m: 440 * 2 ** ((m - 69) / 12)

# ---- drums ----
K, C, H, OH, SH = kick(), clap(), hat(), hat(.11, 6500), shaker()
duck = np.ones(N)                                          # sidechain pump from the kick
for bar in range(8):
    for beat in range(4):
        t = (bar * 4 + beat) * B
        if bar == 0 and beat < 0: continue
        if not (bar == 6 and beat == 3):                    # drop the kick before the last bar
            both(t, K, .95 if bar else .8)
            i = int(t * SR); n = int(.26 * SR); e = 1 - .62 * np.exp(-np.arange(n) / SR / .075)
            duck[i:i + n] = np.minimum(duck[i:i + n], e[:max(0, N - i)][:n])
        if bar >= 1 and beat in (1, 3): both(t, C, .5)
        both(t + B / 2, OH, .2 if bar >= 2 else .12, pan=.25)   # off-beat open hat
        for s16 in range(4):                                 # sixteenth shaker with a little swing
            sw = .018 if s16 % 2 else 0
            if bar >= 1: both(t + s16 * S + sw, SH, (.16 if s16 % 2 else .1), pan=-.3)
            if bar >= 2 and s16 in (1, 3): both(t + s16 * S + sw, H, .13, pan=.35)
for t in (6.75 * B * 4 / 4 + 0,):  pass
# snare-ish fill into bars 5 and 8 (sixteenth claps, rising)
for bar_end in (4, 7):
    for k in range(6): both((bar_end * 4 - 1.5) * B + k * S, C, .16 + .06 * k)

# ---- bass: E dorian, syncopated sixteenths ----
E1 = 28
riffA = [(0, 0, 1.5), (3, 12, .8), (4, 0, 1), (6, 10, 1), (7, 12, .8), (10, 7, 1), (11, 10, .8), (13, 12, 1), (14, 10, 1.4)]
riffB = [(0, 5, 1.5), (3, 17, .8), (4, 5, 1), (6, 15, 1), (7, 17, .8), (10, 3, 1), (11, 5, .8), (13, 7, 1), (14, 9, 1.4)]
bass = np.zeros(N)
for bar in range(1, 8):
    riff = riffB if bar in (3, 5) else riffA
    for st, semi, ln in riff:
        if bar == 6 and st >= 12: continue
        x = note(hz(E1 + 12 + semi), ln * S, bright=10, dec=.05, kind='saw') * env(int(ln * S * SR), .004, .16)
        sub = np.sin(2 * np.pi * hz(E1 + semi if semi < 12 else E1 + semi - 12) * np.arange(len(x)) / SR) * env(len(x), .004, .2)
        put(bass, bar * 4 * B + st * S, np.tanh(1.6 * (x * .7 + sub * .9)), .5)
bass = filt(bass, 'low', 2600) * duck

# ---- chord stabs: Em9 / A13, off the beat, wide ----
stabL = np.zeros(N); stabR = np.zeros(N)
Em9, A13 = [52, 55, 59, 62, 66], [57, 61, 64, 67, 66 + 12 - 12]
pat = [2, 5, 8, 11, 14]
for bar in range(2, 8):
    ch = A13 if bar in (3, 5) else Em9
    for st in (pat if bar != 6 else [2, 5, 8]):
        for j, m in enumerate(ch):
            x = note(hz(m + 12), .16, bright=16, dec=.035, detune=(j - 2) * .0016) * env(int(.16 * SR), .002, .06)
            put(stabL, bar * 4 * B + st * S, x, .075 * (1 + .25 * (j % 2)))
            put(stabR, bar * 4 * B + st * S + .004, x, .075 * (1 + .25 * ((j + 1) % 2)))
stabL = filt(stabL, 'high', 300) * duck; stabR = filt(stabR, 'high', 300) * duck

# ---- lead: a little square hook in bars 5-8 ----
lead = np.zeros(N)
hook = [(0, 76, 1), (2, 79, 1), (3, 81, 2), (6, 79, 1), (8, 83, 2), (11, 81, 1), (12, 79, 1.5), (14, 76, 2)]
for bar in (4, 5, 7):
    for st, m, ln in hook:
        x = note(hz(m), ln * S, bright=9, dec=.12, kind='sq') * env(int(ln * S * SR), .005, .12)
        put(lead, bar * 4 * B + st * S, x, .085)
lead = lead + .35 * np.concatenate([np.zeros(int(.75 * B * SR)), lead])[:N]        # dotted-eighth echo
lead *= duck

# ---- transitions: risers into every scene change, an impact on each ----
def riser(dur, g):
    n = int(dur * SR); t = np.arange(n) / n
    x = rng.standard_normal(n); out = np.zeros(n); step = 2048
    for i in range(0, n, step):                              # sweep a band-pass upward
        f = 500 * (12 ** t[i]); out[i:i + step] = filt(x[i:i + step + 256], 'band', [f, min(f * 2.2, 18000)])[:len(out[i:i + step])]
    return out * t ** 2.2 * g
def boom():
    n = int(.9 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(38 + 60 * np.exp(-t / .05)) / SR) * np.exp(-t / .3) + filt(rng.standard_normal(n), 'low', 900) * np.exp(-t / .12) * .5
def crash():
    n = int(1.3 * SR); return filt(rng.standard_normal(n), 'high', 5000, 4) * env(n, .002, .35)
for beat in (4, 8, 16, 20, 24, 28):
    r = riser(B * (2 if beat in (8, 16, 28) else 1), .22); both(beat * B - len(r) / SR, r)
    both(beat * B, boom(), .34 if beat in (8, 16, 28) else .2); both(beat * B, crash(), .1 if beat in (8, 16, 28) else .05, pan=.1)
for beat in (17, 18, 19): both(beat * B - .11, riser(.11, .25))   # whip for each colour block
# opening: the first three beats hit with the three complaints, the fourth is the stamp
both(3 * B, boom(), .4); both(3 * B, C, .5)
# ending: last stab + boom on the final beat, ring out
both(31 * B, boom(), .4)
for j, m in enumerate(Em9):
    x = note(hz(m + 12), .9, bright=16, dec=.25, detune=(j - 2) * .0016) * env(int(.9 * SR), .002, .3)
    put(stabL, 31 * B, x, .09); put(stabR, 31 * B + .004, x, .09)

mixL = L + bass + stabL + lead * .9; mixR = R + bass + stabR + lead * 1.1
# bar 1 is the intro: low-passed so the drop into bar 2/3 opens up
n1 = int(4 * B * SR)
for m in (mixL, mixR): m[:n1] = filt(m[:n1], 'low', 2200) * 1.1
mix = np.stack([mixL, mixR], 1)
pre = np.abs(mix).max(); p99 = np.percentile(np.abs(mix), 99.5); print('pre peak', pre.round(2), 'p99.5', p99.round(2))
mix = np.tanh(mix / p99 * 0.95)                              # glue: only the loudest half-percent leans on the soft clip
fade = np.ones(N); k = int(.25 * SR); fade[-k:] = np.linspace(1, 0, k) ** 1.5; fade[:200] = np.linspace(0, 1, 200)
mix *= fade[:, None]; mix /= np.abs(mix).max() / .89
wavfile.write('beat.wav', SR, (mix * 32767).astype(np.int16))
rms = np.sqrt((mix ** 2).mean()); print('len', len(mix) / SR, 'peak', np.abs(mix).max().round(3), 'rms dBFS', round(20 * np.log10(rms), 1))
for b in range(8): seg = mix[int(b * 4 * B * SR):int((b + 1) * 4 * B * SR)]; print('bar', b + 1, round(20 * np.log10(np.sqrt((seg ** 2).mean())), 1))
